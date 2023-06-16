const routes = (handler) => [
  {
    method: "GET",
    path: "/categories",
    handler: (request, h) => handler.getCategoriesHandler(request, h),
  },
  {
    method: "POST",
    path: "/categories",
    handler: (request, h) => handler.postCategoryHandler(request, h),
  },
//   {
//     method: "DELETE",
//     path: "/categories/{id}",
//     handler: (request, h) => handler.deleteCategoryByIdHandler(request, h),
//   },
];

module.exports = routes;
