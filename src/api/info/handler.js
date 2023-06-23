class InfoHandler {
  constructor(service) {
    this._service = service;
  }

  getInfoSaldoTodayHandler = async (request, h) => {
    try {
      const { saldo_today } = await this._service.getInfoSaldoToday();

      return {
        status: 'success',
        data: {
          saldo_today: parseInt(saldo_today, 10),
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

  getInfoSaldoMonthHandler = async (request, h) => {
    try {
      const { saldo_month } = await this._service.getInfoSaldoMonth();

      return {
        status: 'success',
        data: {
          saldo_month: parseInt(saldo_month, 10),
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

  getInfoSaldoRangeHandler = async (request, h) => {
    try {
      const { from, to } = request.query;
      const fromDate = new Date(from).toISOString().split('T')[0];
      const toDate = new Date(to).toISOString().split('T')[0];
      const { saldo_range } = await this._service.getInfoSaldoRange(fromDate, toDate);

      return {
        status: 'success',
        data: {
          saldo_range: parseInt(saldo_range, 10),
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
}

module.exports = InfoHandler;
