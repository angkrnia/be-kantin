class LaporanHandler {
  constructor(service) {
    this._service = service;
  }

  getAllLaporan = async (request, h) => {
    try {
      const { data1, data2 } = await this._service.getAllLaporan();
      return h.response({
        status: 'success',
        data: {
          total_pendapatan: data2,
          laporan: data1,
        },
      }).code(200);
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  };

  getLaporanByRangeDate = async (request, h) => {
    try {
      const { from, to } = request.query;
      const fromDate = new Date(from).toISOString();
      const toDate = new Date(to).toISOString();
      const { data1, data2 } = await this._service.getLaporanByRangeDate(fromDate, toDate);
      return h
        .response({
          status: 'success',
          data: {
            total_pendapatan: data2,
            laporan: data1,
          },
        })
        .code(200);
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

module.exports = LaporanHandler;
