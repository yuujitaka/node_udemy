const express = require('express');
const {
  login,
  register,
  verifyEmail,
  logout,
} = require('../controllers/authController');
const { authenticationMiddleware } = require('../middleware/auth');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.delete('/logout', authenticationMiddleware, logout);

module.exports = router;
