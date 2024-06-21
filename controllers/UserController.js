const { StatusCodes } = require('http-status-codes');
const HttpError = require('../utils/errors');
const User = require('../model/User');

const login = async (req, res) => {
  res.send('Login');
};

const register = async (req, res) => {
  const { email, name, password } = req.body;

  // there is also the unique property in User model, but it throws mongoose errors and they can be unfriendly
  const emailAlreadyExists = await User.findOne({ email });

  if (emailAlreadyExists)
    throw new HttpError('Email already exists', StatusCodes.CONFLICT);

  //register the first user as admin
  const isFirstAccount = (await User.countDocuments({})) === 0;
  const role = isFirstAccount ? 'admin' : 'user';
  //could be also create(req.body), but that way the role could be manipulated
  const user = await User.create({ name, email, password, role });

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
