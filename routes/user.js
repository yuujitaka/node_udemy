const express = require('express');
const rateLimiter = require('express-rate-limit');
const authenticationMiddleware = require('../middleware/auth');
const testUserMiddleware = require('../middleware/testUser');
const router = express.Router();
const {
  login,
  register,
  updateUser,
} = require('../controllers/userController');

const apiLimiter = rateLimiter({
  windowMs: 15 * 60 * 1000, //15 minutes
  max: 10,
  message: {
    msg: 'Too many requests from this IP',
  },
});

router.post('/register', apiLimiter, register);
router.post('/login', apiLimiter, login);
router.patch(
  '/updateUser',
  authenticationMiddleware,
  testUserMiddleware,
  updateUser
);

module.exports = router;
