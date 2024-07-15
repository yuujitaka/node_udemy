const { StatusCodes } = require('http-status-codes');
const HttpError = require('./errors');

const checkPermissions = (requestUser, resouceUserId) => {
  if (
    requestUser.role === 'admin' ||
    requestUser.id === resouceUserId.toString()
  )
    return;

  throw new HttpError('Not allowed', StatusCodes.UNAUTHORIZED);
};

module.exports = checkPermissions;
