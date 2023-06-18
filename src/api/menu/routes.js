const routes = (handler) => [
  {
    method: 'GET',
    path: '/menu',
    handler: (request, h) => handler.getMenuHandler(request, h),
  },
  {
    method: 'POST',
    path: '/menu',
    handler: (request, h) => handler.postMenuHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/menu/{id}',
    handler: (request, h) => handler.putMenuByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/menu/{id}',
    handler: (request, h) => handler.deleteMenuByIdHandler(request, h),
  },
];

module.exports = routes;
