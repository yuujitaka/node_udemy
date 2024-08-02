const jwt = require('jsonwebtoken');

const createJWT = (payload) => {
  const token = jwt.sign(payload, process.env.JWT_SECRET, {
    expiresIn: process.env.JWT_LIFETIME,
  });

  return token;
};

const createTokenUserObj = (user) => {
  return { name: user.name, email: user.email, id: user._id, role: user.role };
};

const verifyJWT = (token) => jwt.verify(token, process.env.JWT_SECRET);

const setCookies = (res, tokenProps) => {
  const token = createJWT({ payload: tokenProps });
  const oneDay = 1000 * 60 * 60 * 24;

  res.cookie('token', token, {
    httpOnly: true,
    expires: new Date(Date.now() + oneDay),
    secure: process.env.NODE_ENV === 'production',
    signed: true,
    sameSite: 'Lax',
  });
};

module.exports = { createJWT, createTokenUserObj, verifyJWT, setCookies };
