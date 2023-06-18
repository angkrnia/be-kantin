const routes = require('./routes');
const OHandler = require('./handler');

module.exports = {
  name: 'orders',
  version: '1.0.0',
  register: async (server, { service }) => {
    const oHandler = new OHandler(service);
    server.route(routes(oHandler));
  },
};
