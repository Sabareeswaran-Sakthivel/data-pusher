const { Sequelize } = require("sequelize");

const sequelize = new Sequelize({
  dialect: "sqlite",
  storage: "./myDataBase.db",
});

sequelize
  .authenticate()
  .then(() => console.log("Connected to SQLite"))
  .catch((err) => console.error(err.message));

module.exports = sequelize;
