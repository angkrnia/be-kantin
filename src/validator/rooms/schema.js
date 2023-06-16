const Joi = require('joi');

const RoomPayloadSchema = Joi.object({
  number: Joi.string().required(),
  type: Joi.string().required(),
  adult_capacity: Joi.number().required(),
  child_capacity: Joi.number().required(),
  price: Joi.number().required(),
});

module.exports = { RoomPayloadSchema };
