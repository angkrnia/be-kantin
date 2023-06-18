class MenuHandler {
  constructor(service) {
    this._service = service;
  }

  getMenuHandler = async (request, h) => {
    try {
      const menu = await this._service.getMenu();

      return {
        status: 'success',
        data: {
          menu,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };

  postMenuHandler = async (request, h) => {
    try {
      const { name, price, category_id } = request.payload;

      const menuId = await this._service.addMenu({ name, price, category_id });

      const response = h.response({
        status: 'success',
        message: 'Menu baru berhasil ditambahkan',
        data: {
          menuId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };

  putMenuByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;
      const { name, price, category_id } = request.payload;

      await this._service.putMenuById(id, { name, price, category_id });

      return {
        status: 'success',
        message: 'Menu berhasil diperbarui',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };

  deleteMenuByIdHandler = async (request, h) => {
    try {
      const { id } = request.params;

      await this._service.deleteMenuById(id);

      return {
        status: 'success',
        message: 'Menu berhasil dihapus',
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };
}

module.exports = MenuHandler;
