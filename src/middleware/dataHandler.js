const UnAuthorizedError = require("../errors/UnAuthorizedError");
const BadRequestError = require("../errors/UnAuthorizedError");

const dataHandlerValidator = async (req, res, next) => {
  try {
    if (
      req.headers &&
      !(
        req.headers["CL-X-TOKEN"] ||
        req.headers["cl-x-token"] ||
        req.headers["CL-X-TOKEN"] == ""
      )
    ) {
      throw new UnAuthorizedError("Un Authenticate");
    }
    req.secretToken = req.headers["cl-x-token"];

    let contentType;
    if (req.headers?.["content-type"]) {
      contentType = req.headers["content-type"];
    } else if (req.headers?.["Content-Type"]) {
      contentType = req.headers["Content-Type"];
    } else {
      contentType = "";
    }

    if (req.method == "GET" && contentType != "application/json")
      throw new BadRequestError("Invalid data");
    next();
  } catch (error) {
    next(error);
  }
};

module.exports = dataHandlerValidator;
