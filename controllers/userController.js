const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const HttpError = require('../utils/errors');

const register = async (req, res) => {
  const user = await User.create({ ...req.body });

  res.status(StatusCodes.CREATED).json({
    user: { ...user.toJSON(), token: user.generateToken() },
  });
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

  res.status(StatusCodes.OK).json({
    user: { ...user.toJSON(), token: user.generateToken() },
  });
};

const updateUser = async (req, res) => {
  const userId = req.user.id;
  const { name, email } = req.body;

  if (!name || !email) {
    throw new HttpError('Name and email required', StatusCodes.BAD_REQUEST);
  }

  const user = await User.findByIdAndUpdate(userId, req.body, {
    new: true,
    runValidators: true,
  });

  if (!user) {
    throw new HttpError('No user found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json({
    user: { ...user.toJSON(), token: user.generateToken() },
  });
};

module.exports = {
  register,
  login,
  updateUser,
};
