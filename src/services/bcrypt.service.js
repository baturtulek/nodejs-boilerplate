const bcrypt = require("bcryptjs");
const { APP_CONFIG } = require("../config");

const hashPassword = async (password) => {
  return await bcrypt.hash(password, APP_CONFIG.PASSWORD_HASH_ROUNDS);
};

const comparePasswords = async (userPassword, dbUserPassword) => {
  return await bcrypt.compare(userPassword, dbUserPassword);
};

module.exports = {
  hashPassword,
  comparePasswords,
};
