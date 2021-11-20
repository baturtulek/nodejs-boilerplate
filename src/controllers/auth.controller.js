const httpStatus = require("http-status");
const { tokenService, bcryptService } = require("../services");
const { authenticationException } = require("../responses/exceptions");
const { INVALID_CREDENTIALS } = require("../responses/messages");
const { getUserByUsername } = require("./users.controller");

const loginUser = async (req, res, next) => {
  try {
    const { username, password } = req.body;
    const dbUser = await getUserByUsername(username);
    if (dbUser) {
      const isPasswordCorrect = await bcryptService.comparePasswords(password, dbUser.password);
      if (isPasswordCorrect) {
        const accessToken = await tokenService.generateAccessToken(dbUser.id);
        return res.status(httpStatus.OK).json(successResponse({ accessToken }));
      }
    }
    throw authenticationException(INVALID_CREDENTIALS);
  } catch (error) {
    next(error);
  }
};

module.exports = {
  loginUser,
};
