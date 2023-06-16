class CategoriesHandler {
  constructor(service) {
    this._service = service;
  }

  getCategoriesHandler = async (request, h) => {
    try {
      const categories = await this._service.getCategories();

      return {
        status: "success",
        data: {
          categories,
        },
      };
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };

  postCategoryHandler = async (request, h) => {
    try {
      const { name } = request.payload;

      const categoryId = await this._service.addCategory({ name });

      const response = h.response({
        status: "success",
        message: "Category berhasil ditambahkan",
        data: {
          categoryId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };
}

module.exports = CategoriesHandler;
