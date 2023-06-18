const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class CategoriesServices {
  constructor() {
    this._pool = new Pool();
  }

  async getMenu() {
    const query = {
      text: 'SELECT menus.id, menus.name, menus.price, categories.name as category, menus.created_at FROM menus LEFT JOIN categories ON menus.category_id = categories.id',
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Menu tidak ditemukan');
    }

    return rows;
  }

  async addMenu({ name, price, category_id }) {
    const query = {
      text: 'INSERT INTO menus (name, price, category_id) VALUES($1, $2, $3) RETURNING id',
      values: [name, price, category_id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Menu gagal ditambahkan');
    }

    return rows[0].id;
  }

  async putMenuById(id, { name, price, category_id }) {
    const query = {
      text: 'UPDATE menus SET name = $1, price = $2, category_id = $3 WHERE id = $4 RETURNING id',
      values: [name, price, category_id, id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Menu gagal diperbarui. Id tidak ditemukan');
    }

    return rows[0].id;
  }

  async deleteMenuById(id) {
    const query = {
      text: 'DELETE FROM menus WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Menu gagal dihapus. Id tidak ditemukan');
    }

    return rows[0].id;
  }
}

module.exports = CategoriesServices;
