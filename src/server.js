require('dotenv').config();

const Hapi = require('@hapi/hapi');

// api
const users = require('./api/users');
const categories = require('./api/categories');
const menu = require('./api/menu');
const orders = require('./api/orders');
const info = require('./api/info');

// services
const UsersService = require('./service/postgres/UsersService');
const CategoriesServices = require('./service/postgres/CategoriesServices');
const MenuServices = require('./service/postgres/MenuServices');
const OrdersServices = require('./service/postgres/OrdersServices');
const InfoServices = require('./service/postgres/InfoServices');

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
    {
      plugin: info,
      options: {
        service: new InfoServices(),
      },
    },
  ]);

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
