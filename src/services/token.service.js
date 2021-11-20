const jwt = require("jsonwebtoken");
const { TOKEN_CONFIG } = require("../config");

const generateAccessToken = (userId) => {
  return new Promise((resolve, reject) => {
    jwt.sign(
      {
        uid: userId,
      },
      TOKEN_CONFIG.TOKEN_SECRET,
      {
        expiresIn: TOKEN_CONFIG.EXPIRES_IN,
      },
      (error, accessToken) => {
        if (error) {
          return reject(error);
        }
        return resolve(accessToken);
      }
    );
  });
};

const validateAccessToken = (accessToken) => {
  return new Promise((resolve, reject) => {
    jwt.verify(accessToken, TOKEN_CONFIG.TOKEN_SECRET, (error, tokenData) => {
      if (error) {
        return reject(error);
      }
      return resolve(tokenData);
    });
  });
};

const setAccessTokenToResponse = (res, accessToken) => {
  res.set("Access-Control-Expose-Headers", "authorization");
  res.set("authorization", accessToken);
};

module.exports = {
  generateAccessToken,
  validateAccessToken,
  setAccessTokenToResponse,
};
