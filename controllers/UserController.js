const { StatusCodes } = require('http-status-codes');
const HttpError = require('../utils/errors');
const User = require('../model/User');

const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  const { email } = req.body;

  // there is also the unique property in User model, but it throws mongoose errors and they can be unfriendly
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new HttpError('Email already exists', StatusCodes.CONFLICT);

  const user = await User.create(req.body);

  res.status(StatusCodes.CREATED).json(user);
};

const logout = async (req, res) => {
  res.send('logged out');
};

module.exports = {
  login,
  register,
  logout,
};
