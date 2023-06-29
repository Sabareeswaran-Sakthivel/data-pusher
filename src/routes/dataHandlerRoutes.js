const { Router } = require("express");
const { sendData } = require("../controller/dataHandlerController");

const dataHandlerRoutes = new Router();

dataHandlerRoutes.post("/incoming_data", sendData);

module.exports = dataHandlerRoutes;
