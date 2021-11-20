const { tokenService } = require("../../services");
const { authenticationException } = require("../../responses/exceptions");
const { INVALID_TOKEN } = require("../../responses/messages");

const getAuthToken = (authorization) => {
  let accessToken = authorization ?? "";
  accessToken = accessToken.replace("Bearer", "").trim();
  return accessToken;
};

const validateAccessToken = async (req, res, next) => {
  const accessToken = getAuthToken(req.headers.authorization);
  if (!accessToken) {
    return next(authenticationException(INVALID_TOKEN));
  }
  try {
    const authenticatedUser = await tokenService.validateAccessToken(accessToken);
    req.user = authenticatedUser;
    const newAccessToken = await tokenService.generateAccessToken(authenticatedUser.uid);
    tokenService.setAccessTokenToResponse(res, newAccessToken);
    next();
  } catch (error) {
    return next(authenticationException(INVALID_TOKEN));
  }
};

module.exports = validateAccessToken;
