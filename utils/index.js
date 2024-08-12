const {
  createJWT,
  createTokenUserObj,
  verifyJWT,
  setCookies,
} = require('./jwt');
const HttpError = require('./errors');
const checkPermissions = require('./checkPermissions');
const {
  sendVerificationEmail,
  sendResetPasswordEmail,
} = require('./sendEmail');

module.exports = {
  createJWT,
  createTokenUserObj,
  verifyJWT,
  setCookies,
  HttpError,
  checkPermissions,
  sendVerificationEmail,
  sendResetPasswordEmail,
};
