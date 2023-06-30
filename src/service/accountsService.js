const Account = require("../models/Accounts");
const { Op, ValidationError } = require("sequelize");
const {
  generateAccountId,
  generateAppSecretToken,
} = require("../utility/utils");
const { deleteDestination } = require("./destinationService");
const BadRequestError = require("../errors/BadRequestError");

const create = async (data = {}) => {
  const { email_id, account_name, website = null } = data;
  const accountId = await generateAccountId();
  const appSecretToken = await generateAppSecretToken();

  await Account.create({
    email_id,
    account_name,
    website,
    account_id: accountId,
    app_secret_token: appSecretToken,
  });
};

const fetchAccount = async (options = {}) => {
  const { accountName, accountId, secretToken } = options;
  let query = {};
  if (options.accountName) {
    query = {
      where: {
        account_name: {
          [Op.eq]: accountName,
        },
        is_deleted: false,
      },
    };
  } else if (accountId) {
    query = {
      where: {
        account_id: {
          [Op.eq]: accountId,
        },
        is_deleted: false,
      },
    };
  } else if (secretToken) {
    query = {
      where: {
        app_secret_token: {
          [Op.eq]: secretToken,
        },
        is_deleted: false,
      },
    };
  }
  const data = await Account.findOne(query);
  return data;
};

const deleteByAccountId = async (accountId) => {
  const isDeleted = await Account.update(
    { is_deleted: true },
    {
      where: {
        account_id: accountId,
      },
    }
  );
  await deleteDestination(accountId);
  if (!isDeleted[0]) {
    throw new BadRequestError("Account Id not found!");
  }
};

const updateByAccountId = async (accountId, data = {}) => {
  const { email_id, account_name, website } = data;
  if (data.account_id || data.is_deleted || data.app_secret_token) {
    throw new ValidationError(
      "account_id, is_deleted_ and app_secret_token can't be updated"
    );
  }
  const isUpdated = await Account.update(
    {
      email_id,
      account_name,
      website,
    },
    {
      where: {
        account_id: accountId,
        is_deleted: false,
      },
    }
  );
  if (!isUpdated[0]) {
    throw new BadRequestError("Account Id not found!");
  }
};

module.exports = {
  create,
  fetchAccount,
  deleteByAccountId,
  updateByAccountId,
};
