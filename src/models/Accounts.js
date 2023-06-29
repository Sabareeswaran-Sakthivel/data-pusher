const { DataTypes } = require("sequelize");
const sequelize = require("../connection/sqlite");

const Account = sequelize.define(
  "account",
  {
    email_id: {
      type: DataTypes.STRING,
      unique: true,
      allowNull: false,
    },
    account_id: {
      type: DataTypes.STRING,
      unique: true,
      primaryKey: true,
    },
    account_name: {
      type: DataTypes.STRING,
      allowNull: false,
    },
    website: {
      type: DataTypes.TEXT,
    },
    app_secret_token: {
      type: DataTypes.TEXT,
      allowNull: false,
    },
    is_deleted: {
      type: DataTypes.BOOLEAN,
      defaultValue: false,
    },
  },
  {
    sequelize,
    modelName: "account",
  }
);

//create a table for the first time
(async () => {
  await sequelize.sync();
})();

module.exports = Account;
