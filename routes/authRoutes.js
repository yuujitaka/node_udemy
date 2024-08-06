const express = require('express');
const {
  login,
  register,
  verifyEmail,
  logout,
  forgotPassword,
  resetPassword,
} = require('../controllers/authController');
const { authenticationMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.delete('/logout', authenticationMiddleware, logout);
router.post('/forgot-password', forgotPassword);
router.post('/reset-password', resetPassword);
module.exports = router;
