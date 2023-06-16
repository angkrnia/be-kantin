const routes = (handler) => [
  {
    method: 'GET',
    path: '/rooms',
    handler: (request, h) => handler.getRoomsHandler(request, h),
  },
  {
    method: 'POST',
    path: '/rooms',
    handler: (request, h) => handler.postRoomHandler(request, h),
  },
  {
    method: 'PUT',
    path: '/rooms/{id}',
    handler: (request, h) => handler.putRoomByIdHandler(request, h),
  },
  {
    method: 'DELETE',
    path: '/rooms/{id}',
    handler: (request, h) => handler.deleteRoomByIdHandler(request, h),
  },
];

module.exports = routes;
