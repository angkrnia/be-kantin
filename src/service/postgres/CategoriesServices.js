const { Pool } = require('pg');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class CategoriesServices {
  constructor() {
    this._pool = new Pool();
  }

  async getCategories() {
    const query = {
      text: 'SELECT * FROM categories',
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async addCategory({ name }) {
    const query = {
      text: 'INSERT INTO categories (name) VALUES($1) RETURNING id',
      values: [name],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Category gagal ditambahkan');
    }

    return rows[0].id;
  }

  async deleteCategoryById(id) {
    const query = {
      text: 'DELETE FROM categories WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Category gagal dihapus. Id tidak ditemukan');
    }

    return rows[0].id;
  }
}

module.exports = CategoriesServices;
