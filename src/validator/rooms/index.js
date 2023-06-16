const { RoomPayloadSchema } = require('./schema');
const InvariantError = require('../../error/InvarianError');

const RoomsValidator = {
  validateRoomPayload: (payload) => {
    const validationResult = RoomPayloadSchema.validate(payload);
    if (validationResult.error) {
      throw new InvariantError(validationResult.error.message);
    }
  },
};

module.exports = RoomsValidator;
