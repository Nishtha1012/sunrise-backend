const bcrypt = require("bcrypt");
require("dotenv").config();

const encryptPassword = async (password) => {
  const salt = process.env.PASSWORD_SALT;
  console.log(salt, "=========");
  const encryptedPassword = await bcrypt.hash(password, salt);

  return encryptedPassword;
};

module.exports = {
  encryptPassword,
};
