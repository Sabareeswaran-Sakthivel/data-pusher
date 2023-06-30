const { fetchAccount: getAccountDetail } = require("./accountsService");
const { getAllDestinations } = require("./destinationService");
const axios = require("axios");
const BadRequestError = require("../errors/BadRequestError");

const sendDataToDestination = async (secretToken, incomingData = {}) => {
  //identify the account based on secret token
  let accountDetail = (await getAccountDetail({ secretToken }))?.dataValues;
  const accountId = accountDetail?.account_id;

  //account detail is not available for the secret token
  if (!accountId) {
    throw new BadRequestError("Invalid secret token!");
  }
  //fetch destination details based on accountId
  const destinationDetails = await getAllDestinations(accountId);

  if (destinationDetails.length < 1) {
    throw new BadRequestError("No destination urls found!");
  }

  destinationDetails.forEach(async (destination) => {
    const httpMethod = destination.getDataValue("http_method");

    if (httpMethod.toLowerCase() == "get") 
    {
      const queryParams = Object.entries(incomingData)
        .map(([key, value]) => `${key}=${encodeURIComponent(value)}`)
        .join("&");
      await axios.get(`${destination.getDataValue("url")}?${queryParams}`, {
        headers: destination.getDataValue("headers"),
      });
    } 
    else if (httpMethod.toLowerCase() == "post") 
    {
      await axios.post(destination.getDataValue("url"), incomingData, {
        headers: destination.getDataValue("headers"),
      });
    } 
    else if (httpMethod.toLowerCase() == "put") 
    {
      await axios.put(destination.getDataValue("url"), incomingData, {
        headers: destination.getDataValue("headers"),
      });
    }

  });
};

module.exports = { sendDataToDestination };
