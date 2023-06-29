const { Router } = require("express");
const {
  createAccount,
  getAccount,
  deleteAccount,
  updateAccount,
} = require("../controller/accountsController");

const accountRoutes = new Router();

accountRoutes.post("/", createAccount);
accountRoutes.get("/", getAccount);
accountRoutes.delete("/:accountId", deleteAccount);
accountRoutes.put("/:accountId", updateAccount);

module.exports = accountRoutes;
