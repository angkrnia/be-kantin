const routes = (handler) => [
  {
    method: 'GET',
    path: '/info/saldo-today',
    handler: (request, h) => handler.getInfoSaldoTodayHandler(request, h),
  },
  {
    method: 'GET',
    path: '/info/saldo-month',
    handler: (request, h) => handler.getInfoSaldoMonthHandler(request, h),
  },
  {
    method: 'GET',
    path: '/info/saldo-range',
    handler: (request, h) => handler.getInfoSaldoRangeHandler(request, h),
  },
];

module.exports = routes;
