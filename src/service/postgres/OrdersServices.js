const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class OrdersServices {
  constructor() {
    this._pool = new Pool();
  }

  async getOrders() {
    const query = {
      text: 'SELECT * FROM orders ORDER BY id ASC',
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Order tidak ditemukan');
    }

    return rows;
  }

  async getOrderDetailById(id) {
    const query = {
      text: 'SELECT orders.id, orders.total_price, orders.total_payment, orders.created_by AS cashier FROM orders WHERE id = $1',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Order tidak ditemukan');
    }

    return rows[0];
  }

  async getOrderMenuByOrderId(id) {
    const query = {
      text: 'SELECT om.menu_id, m.name, m.price, CAST(SUM(om.quantity) AS INTEGER) as total_quantity, CAST(SUM(om.quantity * m.price) AS INTEGER) as total_price, c.name as category FROM order_menu AS om INNER JOIN menus AS m ON om.menu_id = m.id INNER JOIN orders AS o ON om.order_id = o.id INNER JOIN categories AS c ON c.id = m.category_id WHERE o.id = $1 GROUP BY om.id, om.menu_id, m.name, m.price, c.name;',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Order tidak ditemukan');
    }

    return rows;
  }

  async addOrder({
    menu, total_price, total_payment, created_by,
  }) {
    const orderId = `order-${Date.now()}`;
    const query = {
      text: 'INSERT INTO orders (total_price, total_payment, created_by, id) VALUES ($1, $2, $3, $4) RETURNING id',
      values: [total_price, total_payment, created_by, orderId],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Order gagal ditambahkan');
    }

    const { id } = rows[0];

    menu.forEach(async (element) => {
      const insert = {
        text: 'INSERT INTO order_menu (order_id, menu_id, quantity) VALUES ($1, $2, $3)',
        values: [id, element.menu_id, element.quantity],
      };

      const response = await this._pool.query(insert);

      if (!response.rowCount) {
        throw new InvarianError('Order gagal ditambahkan');
      }
    });

    return id;
  }

  async deleteOrderById(id) {
    const query = {
      text: 'DELETE FROM orders WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Order gagal dihapus. Id tidak ditemukan');
    }

    return rows[0].id;
  }
}

module.exports = OrdersServices;
