const Errors = require("../constants/Errors");

class UnAuthorizedError extends Error {
  constructor(message, statusCode = 404) {
    super(message);
    this.name = Errors.NOT_FOUND_ERROR;
    this.statusCode = statusCode;
  }
}

module.exports = UnAuthorizedError;
