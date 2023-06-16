class UsersHandler {
  constructor(service) {
    this._service = service;
  }

  getUsersHandler = async (request, h) => {
    try {
      const users = await this._service.getUsers();

      return {
        status: "success",
        data: {
          users,
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

  postUserHandler = async (request, h) => {
    try {
      const { username, password, fullname } = request.payload;

      const userId = await this._service.addUser({
        username,
        password,
        fullname,
      });

      const response = h.response({
        status: "success",
        message: "User berhasil ditambahkan",
        data: {
          userId,
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

module.exports = UsersHandler;
