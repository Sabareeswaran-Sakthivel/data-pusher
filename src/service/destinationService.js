const Destination = require("../models/Destinations");
const { Op } = require("sequelize");
const BadRequestError = require("../errors/BadRequestError");
const Account = require("../models/Accounts");

const create = async (data = {}) => {
  const { url, http_method, headers, account_id } = data;

  let accountDetail = (await _getAccountDetail(account_id))?.dataValues;
  if (!accountDetail) {
    throw new BadRequestError("Account Id not found!");
  }
  await Destination.create({
    url,
    http_method,
    headers,
    account_id,
  });
};

const getAllDestinations = async (accountId) => {
  const data = await Destination.findAll({
    where: {
      account_id: {
        [Op.eq]: accountId,
      },
      is_deleted: false,
    },
  });
  return data;
};

const getDestinationUrls = async (accountId) => {
  const data = await Destination.findAll({
    attributes: ["url"],
    where: {
      account_id: {
        [Op.eq]: accountId,
      },
      is_deleted: false,
    },
  });
  return data;
};

const deleteDestination = async (accountId = "", id = "") => {
  let query = {};

  if (id != "") {
    query = {
      where: {
        id: id,
      },
    };
  }
  if (accountId != "") {
    query = {
      where: {
        account_id: accountId,
      },
    };
  }
  await Destination.update({ is_deleted: true }, query);
};

const updateDestinationById = async (id, data = {}) => {
  const { url, http_method, headers, is_deleted } = data;
  const isUpdated = await Destination.update(
    {
      url,
      http_method,
      headers,
      is_deleted,
    },
    {
      where: {
        id: id,
      },
    }
  );
  if(!isUpdated[0]) {
    throw new BadRequestError("Invalid id");
  }
};

const _getAccountDetail = async(accountId) => {
  const data = await Account.findOne({
    where: {
      account_id: accountId,
      is_deleted: false
    }
  })
  return data;
}

module.exports = {
  create,
  getAllDestinations,
  deleteDestination,
  getDestinationUrls,
  updateDestinationById,
};
