/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('rooms', {
    id: {
      type: 'VARCHAR(50)',
      primaryKey: true,
    },
    number: {
      type: 'VARCHAR(50)',
      notNull: true,
      unique: true,
    },
    type: {
      type: 'VARCHAR(50)',
      notNull: true,
    },
    adult_capacity: {
      type: 'INTEGER',
      notNull: true,
    },
    child_capacity: {
      type: 'INTEGER',
      notNull: true,
    },
    price: {
      type: 'INTEGER',
      notNull: true,
    },
    created_at: {
      type: 'TEXT',
      notNull: true,
    },
    is_deleted: {
      type: 'BOOLEAN',
      default: false,
    },
  });
};

exports.down = (pgm) => {
  pgm.dropTable('rooms');
};
