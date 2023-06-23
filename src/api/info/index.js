const routes = require('./routes');
const IHandler = require('./handler');

module.exports = {
  name: 'info',
  version: '1.0.0',
  register: async (server, { service }) => {
    const iHandler = new IHandler(service);
    server.route(routes(iHandler));
  },
};
