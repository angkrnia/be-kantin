const { Pool } = require('pg');

const routes = (handler) => [
  {
    method: 'GET',
    path: '/users',
    handler: (request, h) => handler.getUsersHandler(request, h),
  },
  {
    method: 'POST',
    path: '/users',
    handler: (request, h) => handler.postUserHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/users/{id}',
    handler: (request, h) => handler.deleteUserByIdHandler(request, h),
  },
];

module.exports = routes;
