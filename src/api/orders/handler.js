class OrdersHandler {
  constructor(service) {
    this._service = service;
  }

  getOrders = async (request, h) => {
    try {
      const orders = await this._service.getOrders();

      return {
        status: 'success',
        data: {
          orders,
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

  getOrderById = async (request, h) => {
    try {
      const { id } = request.params;
      const order = await this._service.getOrderById(id);

      return {
        status: 'success',
        data: {
          order,
        },
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(404);
      return response;
    }
  };

  postOrders = async (request, h) => {
    try {
      const { menu } = request.payload;

      const orderId = await this._service.addOrder({
        menu,
      });

      const response = h.response({
        status: 'success',
        message: 'Order baru berhasil ditambahkan',
        data: {
          orderId,
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
}

module.exports = OrdersHandler;
