require('dotenv').config();

const Hapi = require('@hapi/hapi');

// api
const auth = require('./api/auth');
const users = require('./api/users');
const categories = require('./api/categories');
const menu = require('./api/menu');
const orders = require('./api/orders');
const info = require('./api/info');
const laporan = require('./api/laporan');

// services
const AuthServices = require('./service/postgres/AuthServices');
const UsersService = require('./service/postgres/UsersService');
const CategoriesServices = require('./service/postgres/CategoriesServices');
const MenuServices = require('./service/postgres/MenuServices');
const OrdersServices = require('./service/postgres/OrdersServices');
const InfoServices = require('./service/postgres/InfoServices');
const LaporanServices = require('./service/postgres/LaporanServices');

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

  server.route({
    method: 'GET',
    path: '/',
    handler: () => ({
      status: 'success',
      meta: {
        message: 'Hello, this is API for Cashier App',
        author: 'Angga Kurnia',
        github: 'https://github.com/angkrnia',
        instagram: 'https://instagram.com/angkrnia',
      },
    }),
  });

  await server.register([
    {
      plugin: auth,
      options: {
        service: new AuthServices(),
      },
    },
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
    {
      plugin: laporan,
      options: {
        service: new LaporanServices(),
      },
    },
  ]);

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
