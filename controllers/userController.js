const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');
const { HttpError, createTokenUserObj, setCookies } = require('../utils');

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

const showMe = async (req, res) => {
  res.status(StatusCodes.OK).json(req.user);
};

const updateUser = async (req, res) => {
  const { name, email } = req.body;
  const { id } = req.user;

  if (!name || !email)
    throw new HttpError(
      'Please provide name and email',
      StatusCodes.BAD_REQUEST
    );

  const user = User.findOneAndUpdate(
    { _id: id },
    { name, email },
    { new: true, runValidators: true }
  );
  const tokenProps = createTokenUserObj(user);

  setCookies(res, tokenProps);

  res.status(StatusCodes.OK).json(tokenProps);
};

const updateUserPassword = async (req, res) => {
  const { oldPassword, newPassword } = req.body;

  if (!oldPassword || !newPassword)
    throw new HttpError(
      'Please provide old and new passwords',
      StatusCodes.BAD_REQUEST
    );

  const user = await User.findById(req.user.id);

  const isPasswordCorrect = await user.comparePassword(oldPassword);

  if (!isPasswordCorrect)
    throw new HttpError('Invalid old password', StatusCodes.UNAUTHORIZED);

  user.password = newPassword;

  await user.save();

  res.sendStatus(StatusCodes.OK);
};

module.exports = {
  getAllUsers,
  getUser,
  showMe,
  updateUser,
  updateUserPassword,
};
