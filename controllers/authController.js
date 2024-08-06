const { StatusCodes } = require('http-status-codes');
const crypto = require('crypto');
const {
  HttpError,
  setCookies,
  createTokenUserObj,
  sendVerificationEmail,
} = require('../utils');
const User = require('../model/User');
const Token = require('../model/Token');

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
  let refreshToken = '';

  const existingToken = await Token.findOne({ user: user._id });

  if (existingToken) {
    const { isValid } = existingToken;
    if (!isValid) {
      throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
    }
    refreshToken = existingToken.refreshToken;
  } else {
    refreshToken = crypto.randomBytes(40).toString('hex');
    const userAgent = req.headers['user-agent'];
    const ip = req.ip;

    await Token.create({ refreshToken, ip, userAgent, user: user._id });
  }

  setCookies(res, tokenProps, refreshToken);
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

  await sendVerificationEmail({
    name,
    email,
    verificationToken,
    origin: 'http://localhost:3000',
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
  await Token.findOneAndDelete({ user: req.user.id });

  res.cookie('accessToken', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.cookie('refreshToken', '', {
    httpOnly: true,
    expires: new Date(Date.now()),
  });

  res.sendStatus(StatusCodes.OK);
};

const forgotPassword = async (req, res) => {
  const { email } = req.body;

  if (!email)
    throw new HttpError('Please provide your email', StatusCodes.BAD_REQUEST);

  const user = await User.findOne({ email });

  //don't inform that the user doesn't exist, this makes it easier for attackers
  /* if (!user) {
    throw new HttpError('Invalid credentials', StatusCodes.UNAUTHORIZED);
  } */

  if (user) {
    const passwordTokenExpiration = new Date(Date.now() + 1000 * 60 * 60);
    const passwordToken = crypto.randomBytes(70).toString('hex');

    user.passwordTokenExpiration = passwordTokenExpiration;
    user.passwordToken = passwordToken;
    await user.save();
    //send email
  }

  res.status(StatusCodes.OK).json({ msg: 'Check your email' });
};

const resetPassword = async (req, res) => {
  res.send('resetPassword');
};

module.exports = {
  login,
  register,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
};
