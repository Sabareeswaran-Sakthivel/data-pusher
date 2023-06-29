const {
  create,
  get,
  deleteByAccountId,
  updateByAccountId,
} = require("../service/accountsService");

const createAccount = async (req, res, next) => {
  try {
    const { body } = req;
    await create(body);

    res
      .status(201)
      .send({
        success: true,
        message: "Account has been successfully created",
      });
  } catch (error) {
    next(error);
  }
};

const getAccount = async (req, res, next) => {
  try {
    const response = await get(req.query);

    res.status(200).send({ success: true, data: response ? [response] : [] });
  } catch (error) {
    next(error);
  }
};

const deleteAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    await deleteByAccountId(accountId);

    res
      .status(200)
      .send({
        success: true,
        message: `AccountId ${accountId} has been deleted`,
      });
  } catch (error) {
    next(error);
  }
};

const updateAccount = async (req, res, next) => {
  try {
    const { accountId } = req.params;
    await updateByAccountId(accountId, req.body);

    res
      .status(200)
      .send({
        success: true,
        message: `AccountId ${accountId} has been successfully updated`,
      });
  } catch (error) {
    next(error);
  }
};
module.exports = { createAccount, getAccount, deleteAccount, updateAccount };
