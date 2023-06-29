const Errors = require("../constants/Errors");

class BadRequestError extends Error {
  constructor(message, statusCode = 400) {
    super(message);
    this.name = Errors.BAD_REQUEST_ERROR;
    this.statusCode = statusCode;
  }
}

module.exports = BadRequestError;
