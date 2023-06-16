const { Pool } = require('pg');
const { nanoid } = require('nanoid');
const InvarianError = require('../../error/InvarianError');
const NotFoundError = require('../../error/NotFoundError');

class RoomsService {
  constructor() {
    this._pool = new Pool();
  }

  async getRooms() {
    const query = {
      text: 'SELECT * FROM rooms',
    };

    const { rows } = await this._pool.query(query);

    return rows;
  }

  async addRoom({
    number, type, adult_capacity, child_capacity, price,
  }) {
    const id = `room-${nanoid(16)}`;
    const createdAt = new Date().toISOString();

    const query = {
      text: 'INSERT INTO rooms VALUES($1, $2, $3, $4, $5, $6, $7) RETURNING id',
      values: [
        id,
        number,
        type,
        adult_capacity,
        child_capacity,
        price,
        createdAt,
      ],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Room gagal ditambahkan');
    }

    return rows[0].id;
  }

  async updateRoomById(
    id,
    {
      number, type, adult_capacity, child_capacity, price,
    },
  ) {
    this.verifyAvailableRoom(id);

    const query = {
      text: 'UPDATE rooms SET number = $1, type = $2, adult_capacity = $3, child_capacity = $4, price = $5 WHERE id = $6 RETURNING number',
      values: [number, type, adult_capacity, child_capacity, price, id],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new InvarianError('Room gagal diperbarui');
    }

    return rows[0].number;
  }

  async verifyAvailableRoom(roomId) {
    const query = {
      text: 'SELECT * FROM rooms WHERE id = $1',
      values: [roomId],
    };

    const { rows, rowCount } = await this._pool.query(query);

    if (!rowCount) {
      throw new NotFoundError('Room tidak ditemukan');
    }

    return rows[0];
  }
}

module.exports = RoomsService;
