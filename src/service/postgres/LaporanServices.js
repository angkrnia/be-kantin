const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class LaporanServices {
  constructor() {
    this._pool = new Pool();
  }

  async getAllLaporan() {
    const query1 = {
      text: "SELECT om.order_id, json_agg(json_build_object('name', m.name, 'quantity', om.quantity, 'total_price', om.quantity * m.price)) AS menu_names, CAST(SUM(om.quantity * m.price) AS INTEGER) AS total_price, o.order_date, o.created_by as cashier FROM order_menu om JOIN menus m ON om.menu_id = m.id JOIN orders o ON om.order_id = o.id GROUP BY om.order_id, o.order_date, o.created_by",
    };

    const query2 = {
      text: 'SELECT CAST(SUM(total_price) AS INTEGER) FROM orders',
    };

    const [result1, result2] = await Promise.all([
      this._pool.query(query1),
      this._pool.query(query2),
    ]);

    const data1 = result1.rows;
    const data2 = result2.rows[0].sum;

    if (!data1.length) {
      throw new NotFoundError('Laporan tidak ditemukan');
    }

    return { data1, data2 };
  }

  async getLaporanByRangeDate(from, to) {
    const query1 = {
      text: 'SELECT om.order_id, array_agg(m.name) AS menu_names, CAST(SUM(m.price) AS INTEGER) AS total_price, o.order_date, o.created_by as cashier FROM order_menu om JOIN menus m ON om.menu_id = m.id JOIN orders o ON om.order_id = o.id WHERE o.order_date BETWEEN $1 AND $2 GROUP BY om.order_id, o.order_date, o.created_by',
      values: [from, to],
    };

    const query2 = {
      text: 'SELECT CAST(SUM(total_price) AS INTEGER) FROM orders WHERE order_date BETWEEN $1 AND $2',
      values: [from, to],
    };

    const [result1, result2] = await Promise.all([
      this._pool.query(query1),
      this._pool.query(query2),
    ]);

    const data1 = result1.rows;
    const data2 = result2.rows[0].sum;

    if (!data1.length) {
      throw new NotFoundError('Laporan tidak ditemukan');
    }

    return { data1, data2 };
  }
}

module.exports = LaporanServices;
