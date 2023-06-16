/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('customers', {
    id: {
      type: 'integer',
      primaryKey: true,
      notNull: true,
      unique: true,
      autoIncrement: true,
    },
    name: { type: 'varchar(50)', notNull: true },
    phone_number: { type: 'varchar(20)' },
    created_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    updated_at: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('customers');
};
