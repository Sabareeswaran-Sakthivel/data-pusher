const Destination = require("../models/Destinations");
const { Op } = require("sequelize");

const create = async (data = {}) => {
  const { url, http_method, headers, account_id } = data;

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
  await Destination.update(
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
};

module.exports = {
  create,
  getAllDestinations,
  deleteDestination,
  getDestinationUrls,
  updateDestinationById,
};
