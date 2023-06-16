const { Pool } = require('pg');
const { nanoid } = require('nanoid');
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
    const id = `category-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO categories VALUES($1, $2, $3) RETURNING id',
      values: [id, name, createdAt],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Room gagal ditambahkan');
    }

    return rows[0].id;
  }
}

module.exports = CategoriesServices;
