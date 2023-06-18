const Jwt = require("@hapi/jwt");

const TokenManager = {
  generateAccessToken: async (payload) => Jwt.token.generate(payload, process.env.ACCESS_TOKEN_KEY),
};

module.exports = TokenManager;
