const routes = require('./routes');
const RoomsHandler = require('./handler');

module.exports = {
  name: 'rooms',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const roomsHandler = new RoomsHandler(service, validator);
    server.route(routes(roomsHandler));
  },
};
