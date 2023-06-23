const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class LaporanServices {
  constructor() {
    this._pool = new Pool();
  }

  async getAllLaporan() {
    const query = {
      text: "SELECT om.order_id, json_agg(json_build_object('name', m.name, 'quantity', om.quantity, 'total_price', om.quantity * m.price)) AS menu_names, SUM(om.quantity * m.price) AS total_price, o.order_date FROM order_menu om JOIN menus m ON om.menu_id = m.id JOIN orders o ON om.order_id = o.id GROUP BY om.order_id, o.order_date",
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Laporan tidak ditemukan');
    }

    return rows;
  }

  async getLaporanByRangeDate(from, to) {
    const query = {
      text: "SELECT om.order_id, array_agg(m.name) AS menu_names, SUM(m.price) AS total_price, o.order_date FROM order_menu om JOIN menus m ON om.menu_id = m.id JOIN orders o ON om.order_id = o.id WHERE o.order_date BETWEEN $1 AND $2 GROUP BY om.order_id, o.order_date",
      values: [from, to],
    };

    const { rows } = await this._pool.query(query);

    if (!rows.length) {
      throw new NotFoundError('Laporan tidak ditemukan');
    }

    return rows;
  }
}

module.exports = LaporanServices;
