/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('orders', {
    id: {
      type: 'varchar(50)',
      primaryKey: true,
      notNull: true,
      unique: true,
    },
    total_price: { type: 'integer', notNull: true },
    total_payment: { type: 'integer', notNull: true },
    order_date: {
      type: 'timestamp',
      notNull: true,
      default: pgm.func('current_timestamp'),
    },
    created_by: {
      type: 'varchar(50)',
      notNull: true,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
