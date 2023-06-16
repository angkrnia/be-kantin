class RoomsHandler {
  constructor(service, validator) {
    this._service = service;
    this._validator = validator;
  }

  getRoomsHandler = async (request, h) => {
    try {
      const rooms = await this._service.getRooms();

      return {
        status: 'success',
        data: {
          rooms: rooms.filter((room) => room.is_deleted !== true).map((room) => {
            const {
              id, number, type, adult_capacity, child_capacity, price,
            } = room;
            return {
              id,
              number,
              type,
              adult_capacity,
              child_capacity,
              price,
            };
          }),
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

  postRoomHandler = async (request, h) => {
    try {
      this._validator.validateRoomPayload(request.payload);

      const roomId = await this._service.addRoom(request.payload);

      const response = h.response({
        status: 'success',
        message: 'Room berhasil ditambahkan',
        data: {
          roomId,
        },
      });
      response.code(201);
      return response;
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });
      response.code(400);
      return response;
    }
  };

  async putRoomByIdHandler(request, h) {
    try {
      this._validator.validateRoomPayload(request.payload);

      const { id } = request.params;

      const number = await this._service.updateRoomById(id, request.payload);

      return {
        status: 'success',
        message: `Room ${number} berhasil diperbarui`,
      };
    } catch (error) {
      const response = h.response({
        status: 'fail',
        message: error.message,
      });

      response.code(500);
      return response;
    }
  }

  async deleteRoomByIdHandler(request, h) {
    try {
      const { id } = request.params;
      await this._service.deleteRoomById(id);

      return {
        status: 'success',
        message: 'Room berhasil dihapus',
      };
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

module.exports = RoomsHandler;
