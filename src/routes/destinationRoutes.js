const { Router } = require("express");
const {
  createDestination,
  getAll,
  deleteDestinationByIdOrAccountId,
  getDestinationUrlsByAccountId,
  updateDestination,
} = require("../controller/destinationController");

const destinationRoutes = new Router();

destinationRoutes.post("/", createDestination);
destinationRoutes.get("/:accountId", getAll);
destinationRoutes.get("/urls/:accountId", getDestinationUrlsByAccountId);
destinationRoutes.put("/:id", updateDestination);
destinationRoutes.delete("/", deleteDestinationByIdOrAccountId);

module.exports = destinationRoutes;
