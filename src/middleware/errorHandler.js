const { ValidationError } = require("sequelize");

const errorHandler = (err, req, res, next) => {
  const message = {
    success: false,
    message: err.message,
  };

  if (err && err instanceof ValidationError) {
    const errorMessage = err.errors.map((err) => err.message);

    message.message = errorMessage;
    return res.status(err.statusCode || 400).send(message);
  }

  return res.status(err.statusCode || 400).send(message);
};

module.exports = errorHandler;
