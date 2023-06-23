const routes = (handler) => [
  {
    method: 'GET',
    path: '/laporan',
    handler: (request, h) => handler.getAllLaporan(request, h),
  },
  {
    method: 'GET',
    path: '/laporan/range',
    handler: (request, h) => handler.getLaporanByRangeDate(request, h),
  },
];

module.exports = routes;
