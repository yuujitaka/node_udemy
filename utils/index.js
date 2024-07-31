const {
  createJWT,
  createTokenUserObj,
  verifyJWT,
  setCookies,
} = require('./jwt');
const HttpError = require('./errors');
const checkPermissions = require('./checkPermissions');

module.exports = {
  createJWT,
  createTokenUserObj,
  verifyJWT,
  setCookies,
  HttpError,
  checkPermissions,
};
