/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('cashiers', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
      notNull: true,
    },
    username: {
      type: 'varchar(50)',
      notNull: true,
    },
    fullname: {
      type: 'varchar(255)',
      notNull: true,
    },
    password: {
      type: 'varchar(255)',
      notNull: true,
    },
    is_admin: {
      type: 'boolean',
      notNull: true,
      default: false,
    },
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
  pgm.dropTable('users');
};
