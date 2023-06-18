const routes = require('./routes');
const CHandler = require('./handler');

module.exports = {
  name: 'categories',
  version: '1.0.0',
  register: async (server, { service }) => {
    const cHandler = new CHandler(service);
    server.route(routes(cHandler));
  },
};
