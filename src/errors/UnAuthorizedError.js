const Errors = require("../constants/Errors");

class UnAuthorizedError extends Error {
  constructor(message = "Not Authorized to Access", statusCode = 401) {
    super(message);
    this.name = Errors.UNAUTHORIZED_ERROR;
    this.statusCode = statusCode;
  }
}

module.exports = UnAuthorizedError;
