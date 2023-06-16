const { Pool } = require("pg");
const { nanoid } = require("nanoid");
const InvarianError = require("../../error/InvarianError");
const NotFoundError = require("../../error/NotFoundError");

class AuthService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: "SELECT id, password FROM users WHERE username = $1",
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvarianError("Kredensial yang Anda berikan salah");
    }

    const { id, password: hashedPassword } = result.rows[0];

    if (hashedPassword !== password) {
      throw new InvarianError("Kredensial yang Anda berikan salah");
    }

    this.generateAccessToken(id);
  }

  generateAccessToken(userId) {
    return nanoid(16);
  }
}

module.exports = AuthService;
