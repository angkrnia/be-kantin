const routes = require('./routes');
const AuthHandler = require('./handler');

module.exports = {
  name: 'authentications',
  version: '1.0.0',
  register: async (server, { service, validator }) => {
    const authHandler = new AuthHandler(service, validator);
    server.route(routes(authHandler));
  },
};
