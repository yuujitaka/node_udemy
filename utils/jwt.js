const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET);

  return token;
};

const createTokenUserObj = (user) => {
  return { name: user.name, email: user.email, id: user._id, role: user.role };
};

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

const setCookies = (res, tokenProps, refreshToken) => {
  const accessTokenJWT = createJWT({ payload: tokenProps });
  const refreshTokenJWT = createJWT({ payload: tokenProps, refreshToken });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('accessToken', accessTokenJWT, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'Lax',
    expires: new Date(Date.now() + oneDay),
  });

  res.cookie('refreshToken', refreshTokenJWT, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay * 30),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'Lax',
  });
};

module.exports = { createJWT, createTokenUserObj, verifyJWT, setCookies };
