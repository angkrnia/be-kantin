class AuthHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAuthHandler(request, h) {
    try {
      const { username, password } = request.payload;
      const user = await this._service.verifyUserCredential(
        username,
        password,
      );

      const response = h.response({
        status: 'success',
        message: 'Authentication berhasil.',
        data: {
          ...user,
          is_login: true,
        },
      });

      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(500);
      return response;
    }
  }
}

module.exports = AuthHandler;
