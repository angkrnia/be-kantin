require('dotenv').config();

const Hapi = require('@hapi/hapi');

// api
const users = require('./api/users');
const categories = require('./api/categories');
const menu = require('./api/menu');
const orders = require('./api/orders');

// services
const UsersService = require('./service/postgres/UsersService');
const CategoriesServices = require('./service/postgres/CategoriesServices');
const MenuServices = require('./service/postgres/MenuServices');
const OrdersServices = require('./service/postgres/OrdersServices');

// validator
const authValidator = require('./validator/auth');

(async () => {
  const server = Hapi.server({
    port: 5000,
    host: 'localhost',
    routes: {
      cors: {
        origin: ['*'],
      },
    },
  });

  await server.register([
    {
      plugin: users,
      options: {
        service: new UsersService(),
      },
    },
    {
      plugin: categories,
      options: {
        service: new CategoriesServices(),
      },
    },
    {
      plugin: menu,
      options: {
        service: new MenuServices(),
      },
    },
    {
      plugin: orders,
      options: {
        service: new OrdersServices(),
      },
    },
  ]);

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
