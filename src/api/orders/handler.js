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
      const orderDetail = await this._service.getOrderDetailById(id);
      const menu = await this._service.getOrderMenuByOrderId(id);

      return {
        status: 'success',
        data: {
          ...orderDetail,
          menu,
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
      const { menu, total_price, total_payment } = request.payload;
      const created_by = request?.auth?.credentials?.id
        ? request.auth.credentials.id
        : 'Administrator';

      const orderId = await this._service.addOrder({
        menu,
        total_price,
        total_payment,
        created_by,
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

  deleteOrderById = async (request, h) => {
    try {
      const { id } = request.params;
      await this._service.deleteOrderById(id);

      return {
        status: 'success',
        message: 'Order berhasil dihapus',
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
}

module.exports = OrdersHandler;
