const routes = require('./routes');
const AuthHandler = require('./handler');

module.exports = {
  name: 'rooms',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const authHandler = new AuthHandler(service, validator);
    server.route(routes(authHandler));
  },
};
