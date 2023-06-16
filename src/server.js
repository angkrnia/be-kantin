require('dotenv').config();

const Hapi = require('@hapi/hapi');

// api
const rooms = require('./api/rooms');
const users = require('./api/users');

// services
const RoomsService = require('./service/postgres/RoomsServices');
const UsersService = require('./service/postgres/UsersService');

// validator
const RoomsValidator = require('./validator/rooms');

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
    // {
    //   plugin: rooms,
    //   options: {
    //     service: new RoomsService(),
    //     validator: RoomsValidator,
    //   },
    // },
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
