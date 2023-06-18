const routes = require('./routes');
const MHandler = require('./handler');

module.exports = {
  name: 'menu',
  version: '1.0.0',
  register: async (server, { service }) => {
    const mHandler = new MHandler(service);
    server.route(routes(mHandler));
  },
};
