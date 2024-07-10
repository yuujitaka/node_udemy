const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const { HttpError } = require('../utils');

const getAllUsers = async (req, res) => {
  //other options: query.select(name email role) / Schema: password:{select: false}
  const users = await User.find({ role: 'user' }).select('-password');
  if (!users.length)
    throw new HttpError('Users not found', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json(users);
};

const getUser = async (req, res) => {
  const { id } = req.params;

  const user = await User.findById(id).select('-password');

  if (!user) throw new HttpError('User not found', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json(user);
};

const showUser = async (req, res) => {
  res.send('show user');
};

const updateUser = async (req, res) => {
  res.send('update user');
};

const updateUserPassword = async (req, res) => {
  res.send('update user password');
};

module.exports = {
  getAllUsers,
  getUser,
  showUser,
  updateUser,
  updateUserPassword,
};
