const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const bcrypt = require('bcrypt');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async getUsers() {
    const query = {
      text: 'SELECT cashiers.id, cashiers.username, cashiers.fullname FROM cashiers',
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('User tidak ditemukan');
    }

    return rows;
  }

  async addUser({ username, password, fullname }) {
    await this.verifyNewUser(username);

    const hashedPassword = await bcrypt.hash(password, 10);
    const query = {
      text: 'INSERT INTO cashiers (username, password, fullname) VALUES($1, $2, $3) RETURNING id',
      values: [username, hashedPassword, fullname],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('User gagal ditambahkan');
    }

    return rows[0].id;
  }

  async deleteUserById(id) {
    const query = {
      text: 'DELETE FROM cashiers WHERE id = $1 RETURNING id',
      values: [id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('User gagal dihapus. Id tidak ditemukan');
    }

    return rows[0].id;
  }

  async verifyNewUser(username) {
    const query = {
      text: 'SELECT username FROM cashiers WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (result.rowCount > 0) {
      throw new InvarianError(
        'Gagal menambahkan User baru, Username sudah ada',
      );
    }
  }
}

module.exports = UsersService;
