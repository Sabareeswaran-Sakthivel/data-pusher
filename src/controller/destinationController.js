const {
  create,
  updateDestinationById,
  getAllDestinations,
  deleteDestination,
  getDestinationUrls,
} = require("../service/destinationService");

const createDestination = async (req, res, next) => {
  try {
    const data = req.body;

    await create(data);
    res.status(201).send({
      success: true,
      message: "Destination has been successfully created",
    });
  } catch (error) {
    next(error);
  }
};

const getAll = async (req, res, next) => {
  try {
    const {accountId} = req.params;
    const response = await getAllDestinations(accountId);
    res.status(200).send({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

const deleteDestinationByIdOrAccountId = async (req, res, next) => {
  try {
    const { id, accountId } = req.query;
    await deleteDestination(accountId, id);

    res.status(200).send({
      success: true,
      message: `Destination ${id} has been deleted`,
    });
  } catch (error) {
    next(error);
  }
};

const getDestinationUrlsByAccountId = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    const response = await getDestinationUrls(accountId);

    res.status(200).send({ success: true, data: response });
  } catch (error) {
    next(error);
  }
};

const updateDestination = async (req, res, next) => {
  try {
    const { id } = req.params;
    await updateDestinationById(id, req.body);

    res.status(200).send({
      success: true,
      message: `Destination for  id - ${id} has been updated`,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  createDestination,
  getAll,
  deleteDestinationByIdOrAccountId,
  getDestinationUrlsByAccountId,
  updateDestination,
};
