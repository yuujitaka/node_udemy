const { StatusCodes } = require('http-status-codes');
const { HttpError, setCookies, createTokenUserObj } = require('../utils');
const User = require('../model/User');

const login = async (req, res) => {
  const { email, password } = req.body;

  if (!email || !password)
    throw new HttpError(
      'Please provide email and password',
      StatusCodes.BAD_REQUEST
    );

  const user = await User.findOne({ email });

  if (!user)
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);

  const isPasswordCorrect = await user.comparePassword(password);

  if (!isPasswordCorrect)
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);

  const tokenProps = createTokenUserObj(user);

  setCookies(res, tokenProps);

  res.status(StatusCodes.OK).json(tokenProps);
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

  const verificationToken = 'fake token';
  //could be also create(req.body), but that way the role could be manipulated
  await User.create({
    name,
    email,
    password,
    role,
    verificationToken,
  });

  res
    .status(StatusCodes.CREATED)
    .json({ msg: 'Success, Please check your email' });
};

const logout = async (req, res) => {
  res.cookie('token', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.sendStatus(StatusCodes.OK);
};

module.exports = {
  login,
  register,
  logout,
};
