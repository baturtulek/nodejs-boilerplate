const httpStatus = require("http-status");
const { DB } = require("../db");
const { USER_ALREADY_EXISTS } = require("../responses/messages");
const { unprocessableEntityException } = require("../responses/exceptions");
const { hashPassword } = require("../services/bcrypt.service");

const getUserByUsername = async (username) => {
  try {
    return await DB.User.findOne({
      where: {
        username,
      },
    });
  } catch (error) {
    throw error;
  }
};

const registerUser = async (req, res, next) => {
  try {
    const { username, firstName, lastName, password, email } = req.body;
    const user = await getUserByUsername(username);
    if (user) {
      throw unprocessableEntityException(USER_ALREADY_EXISTS);
    }
    const hashedPassword = await hashPassword(password);
    const newUser = await DB.User.create({
      username,
      firstName,
      lastName,
      password: hashedPassword,
      email,
    });
    res.status(httpStatus.CREATED).json(successResponse(newUser));
  } catch (error) {
    next(error);
  }
};

module.exports = {
  getUserByUsername,
  registerUser,
};
