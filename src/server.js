require('dotenv').config();

const Hapi = require('@hapi/hapi');

// api
const users = require('./api/users');

// services
const UsersService = require('./service/postgres/UsersService');

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
  ]);

  await server.start();

  console.log(`server start at ${server.info.uri}`);
})();
