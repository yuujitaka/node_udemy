const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const { HttpError, verifyJWT } = require('../utils');

const authenticationMiddleware = async (req, res, next) => {
  const token = req.signedCookies.token;

  if (!token) throw new HttpError('No token found', StatusCodes.UNAUTHORIZED);

  try {
    const decodedToken = verifyJWT(token);
    req.user = decodedToken.payload;
    next();
  } catch (err) {
    throw new HttpError('Token invalid', StatusCodes.UNAUTHORIZED);
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
