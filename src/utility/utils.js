const crypto = require("crypto");

const generateAccountId = async () => {
  const randomString = crypto.randomBytes(8).toString("hex");
  const accountId = `ACC-${randomString}`;
  return accountId;
};

const generateAppSecretToken = async () => {
  const token = crypto.randomBytes(32).toString("hex");
  return token;
};

module.exports = {
  generateAccountId,
  generateAppSecretToken,
};
