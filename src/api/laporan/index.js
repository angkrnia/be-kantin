const routes = require('./routes');
const LHandler = require('./handler');

module.exports = {
  name: 'laporan',
  version: '1.0.0',
  register: async (server, { service }) => {
    const lHandler = new LHandler(service);
    server.route(routes(lHandler));
  },
};
