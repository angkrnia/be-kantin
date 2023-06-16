const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvarianError = require("../../error/InvarianError");
const NotFoundError = require("../../error/NotFoundError");

class UsersService {
  constructor() {
    this._pool = new Pool();
  }

  async getUsers() {
    const query = {
      text: "SELECT users.id, users.username, users.fullname FROM users",
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError("User tidak ditemukan");
    }

    return rows;
  }

  async addUser({ username, password, fullname }) {
    const id = `user-${nanoid(16)}`;
    const createdAt = new Date().toISOString();
    const query = {
      text: "INSERT INTO users VALUES($1, $2, $3, $4, $5) RETURNING id",
      values: [id, username, password, fullname, createdAt],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError("User gagal ditambahkan");
    }

    return rows[0].id;
  }
}

module.exports = UsersService;
