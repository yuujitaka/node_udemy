const { StatusCodes } = require('http-status-codes');
const { HttpError, verifyJWT, setCookies } = require('../utils');
const Token = require('../model/Token');

const authenticationMiddleware = async (req, res, next) => {
  const { refreshToken, accessToken } = req.signedCookies;

  try {
    if (accessToken) {
      const decodedAccessToken = verifyJWT(accessToken);
      req.user = decodedAccessToken.payload;
      return next();
    }

    if (refreshToken) {
      const decodedRefreshToken = verifyJWT(refreshToken);

      const existingToken = await Token.findOne({
        user: decodedRefreshToken.payload.id,
        refreshToken: decodedRefreshToken.refreshToken,
      });

      if (!existingToken || !existingToken?.isValid) {
        throw new HttpError('Token invalid', StatusCodes.UNAUTHORIZED);
      }

      setCookies(res, decodedRefreshToken.payload, existingToken.refreshToken);
      req.user = decodedRefreshToken.payload;
      return next();
    } else {
      throw new HttpError('Token invalid inside try', StatusCodes.UNAUTHORIZED);
    }
  } catch (err) {
    console.error(err);
    throw new HttpError('Token invalid inside catch', StatusCodes.UNAUTHORIZED);
  }
};

const permissionsMiddleware = (...allowedRoles) => {
  return (req, res, next) => {
    if (!allowedRoles.includes(req.user.role))
      throw new HttpError('Not allowed', StatusCodes.UNAUTHORIZED);

    next();
  };
};

module.exports = { authenticationMiddleware, permissionsMiddleware };
