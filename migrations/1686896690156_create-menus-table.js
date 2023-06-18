/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('menus', {
    id: {
      type: 'serial',
      primaryKey: true,
    },
    name: { type: 'varchar(50)', notNull: true },
    price: { type: 'integer', notNull: true },
    category_id: {
      type: 'integer',
      notNull: true,
      references: '"categories"',
      onDelete: 'cascade',
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
  pgm.dropTable('menus');
};
