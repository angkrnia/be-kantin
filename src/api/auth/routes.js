const routes = (handler) => [
  {
    method: "POST",
    path: "/login",
    handler: (request, h) => handler.postAuthHandler(request, h),
  },
];

module.exports = routes;
