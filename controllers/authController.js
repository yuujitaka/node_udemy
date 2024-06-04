const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const HttpError = require('../utils/errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });
  res
    .status(StatusCodes.CREATED)
    .json({ user: { ...user._doc, token: user.generateToken() } });
};

const login = async (req, res) => {
  const { email, password } = req.body;
  if (!email || !password) {
    throw new HttpError('Email and password required', StatusCodes.BAD_REQUEST);
  }

  const user = await User.findOne({ email });

  if (!user) {
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  const isPasswordCorrect = await user.checkPassword(password);

  if (!isPasswordCorrect) {
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  }

  res
    .status(StatusCodes.OK)
    .json({ user: { ...user._doc, token: user.generateToken() } });
};

module.exports = {
  register,
  login,
};
