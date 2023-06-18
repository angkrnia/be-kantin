const routes = (handler) => [
  {
    method: 'GET',
    path: '/orders',
    handler: (request, h) => handler.getOrders(request, h),
  },
  {
    method: 'GET',
    path: '/orders/{id}',
    handler: (request, h) => handler.getOrderById(request, h),
  },
  {
    method: 'POST',
    path: '/orders',
    handler: (request, h) => handler.postOrders(request, h),
  },
  {
    method: 'DELETE',
    path: '/orders/{id}',
    handler: (request, h) => handler.deleteOrderById(request, h),
  },
];

module.exports = routes;
