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
    customer_id: {
      type: 'integer',
      notNull: true,
      references: '"customers"',
      onDelete: 'cascade',
    },
    total: { type: 'integer', notNull: true },
    quantity: { type: 'integer', notNull: true },
    menu_id: {
      type: 'integer',
      notNull: true,
      references: '"menus"',
      onDelete: 'cascade',
    },
    order_at: {
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

  pgm.addConstraint(
    'orders',
    'fk_orders.customer_id_customers.id',
    'FOREIGN KEY(customer_id) REFERENCES customers(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'orders',
    'fk_orders.menu_id_menus.id',
    'FOREIGN KEY(menu_id) REFERENCES menus(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {
  pgm.dropTable('orders');
};
