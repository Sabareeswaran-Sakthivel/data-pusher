const { sendDataToDestination } = require("../service/dataHandlerService");

const sendData = async (req, res, next) => {
  try {
    const data = req.body;
    const secretToken = req.secretToken;

    await sendDataToDestination(secretToken, data);

    res
      .status(200)
      .send({ success: true, message: "Data sent to the destination" });
  } catch (error) {
    next(error);
  }
};

module.exports = { sendData };
