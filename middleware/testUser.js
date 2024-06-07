const { StatusCodes } = require('http-status-codes');
const HttpError = require('../utils/errors');

const testUser = (req, res, next) => {
  if (req.user.testUser) {
    throw new HttpError('Test user is read only', StatusCodes.BAD_REQUEST);
  }
  next();
};

module.exports = testUser;
