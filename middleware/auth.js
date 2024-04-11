const jwt = require('jsonwebtoken');
const { StatusCodes } = require('http-status-codes');
const HttpError = require('../utils/errors');

const authenticationMiddleware = async (req, res, next) => {
  const authHeader = req.headers.authorization;
  if (!authHeader || !authHeader.startsWith('Bearer')) {
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const token = authHeader.split(' ')[1];

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.user = decoded;
    next();
  } catch {
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }
};

module.exports = authenticationMiddleware;
