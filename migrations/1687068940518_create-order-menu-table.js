/* eslint-disable camelcase */

exports.shorthands = undefined;

exports.up = (pgm) => {
  pgm.createTable('order_menu', {
    id: {
      type: 'integer',
      primaryKey: true,
      notNull: true,
      unique: true,
      autoIncrement: true,
    },
    order_id: {
      type: 'varchar(50)',
      notNull: true,
      references: '"orders"',
      onDelete: 'cascade',
    },
    menu_id: {
      type: 'integer',
      notNull: true,
      references: '"menus"',
      onDelete: 'cascade',
    },
    quantity: { type: 'integer', notNull: true },
  });

  pgm.addConstraint(
    'order_menu',
    'fk_order_menu.order_id_orders.id',
    'FOREIGN KEY(order_id) REFERENCES orders(id) ON DELETE CASCADE',
  );
  pgm.addConstraint(
    'order_menu',
    'fk_order_menu.menu_id_menus.id',
    'FOREIGN KEY(menu_id) REFERENCES menus(id) ON DELETE CASCADE',
  );
};

exports.down = (pgm) => {};
