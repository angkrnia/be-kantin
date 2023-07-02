const { Pool } = require("pg");
const bcrypt = require('bcrypt');
const InvarianError = require("../../error/InvarianError");

class AuthService {
  constructor() {
    this._pool = new Pool();
  }

  async verifyUserCredential(username, password) {
    const query = {
      text: 'SELECT id, fullname, password FROM cashiers WHERE username = $1',
      values: [username],
    };

    const result = await this._pool.query(query);

    if (!result.rowCount) {
      throw new InvarianError('Kredensial yang Anda berikan salah');
    }

    const { id, password: hashedPassword } = result.rows[0];

    const match = await bcrypt.compare(password, hashedPassword);

    if (!match) {
      throw new InvarianError('Kredensial yang Anda berikan salah');
    }

    return {
      id: result.rows[0].id,
      fullname: result.rows[0].fullname,
      is_admin: result.rows[0].is_admin,
    };
  }
}

module.exports = AuthService;
