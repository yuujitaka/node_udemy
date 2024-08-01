const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');
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

  if (!user.isVerified)
    throw new HttpError('Please verify your email', StatusCodes.UNAUTHORIZED);

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

  const verificationToken = crypto.randomBytes(40).toString('hex');
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

const verifyEmail = async (req, res) => {
  const { verificationToken, email } = req.body;
  const user = await User.findOne({ email });

  if (!user)
    throw new HttpError('Verification failed', StatusCodes.UNAUTHORIZED);

  if (verificationToken !== user.verificationToken)
    throw new HttpError(
      'Verification failed: Invalid token',
      StatusCodes.UNAUTHORIZED
    );

  user.isVerified = true;
  user.verified = Date.now();
  user.verificationToken = '';
  await user.save();

  res.status(StatusCodes.OK).json({ msg: 'Email verified' });
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
  verifyEmail,
  logout,
};
