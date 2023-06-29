const { DataTypes } = require("sequelize");
const sequelize = require("../connection/sqlite");
const Account = require("./Accounts");

const Destination = sequelize.define(
  "destination",
  {
    url: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    http_method: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    headers: {
      type: DataTypes.JSON,
      allowNull: false,
    },
    id: {
      type: DataTypes.UUID,
      defaultValue: DataTypes.UUIDV4,
      unique: true,
      primaryKey: true,
    },
    account_id: {
      type: DataTypes.STRING,
      allowNull: false,
      references: {
        model: Account,
        key: "account_id",
      },
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "destination",
  }
);

//create a table for the first time
(async () => {
  await sequelize.sync();
})();

module.exports = Destination;
