const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class InfoServices {
  constructor() {
    this._pool = new Pool();
  }

  async getInfoSaldoToday() {
    const query = {
      text: "SELECT SUM(total_price) as saldo_today FROM orders WHERE DATE_TRUNC('day', order_date) = CURRENT_DATE",
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getInfoSaldoMonth() {
    const query = {
      text: "SELECT SUM(total_price) as saldo_month FROM orders WHERE DATE_TRUNC('month', order_date) = DATE_TRUNC('month', CURRENT_DATE);",
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }

  async getInfoSaldoRange(from, to) {
    const query = {
      text: "SELECT SUM(total_price) as saldo_range FROM orders WHERE order_date BETWEEN $1 AND $2;",
      values: [from, to],
    };

    const result = await this._pool.query(query);

    return result.rows[0];
  }
}

module.exports = InfoServices;
