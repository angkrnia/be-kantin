class AuthHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  async postAuthHandler(request, h) {
    try {
      this._validator.validatePostAuthPayload(request.payload);

      const { username, password } = request.payload;
      const accessToken = await this._service.verifyUserCredential(username, password);

      const response = h.response({
        status: "success",
        message: "Authentication berhasil.",
        data: {
          accessToken,
        },
      });

      response.code(200);
      return response;
    } catch (error) {
      const response = h.response({
        status: "fail",
        message: error.message,
      });
      response.code(500);
      return response;
    }
  }

  async deleteAuthHandler(request, h) {
    //
  }
}

module.exports = AuthHandler;
