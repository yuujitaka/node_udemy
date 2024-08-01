const express = require('express');
const {
  login,
  register,
  verifyEmail,
  logout,
} = require('../controllers/authController');

const router = express.Router();

router.post('/login', login);
router.post('/register', register);
router.post('/verify-email', verifyEmail);
router.get('/logout', logout);

module.exports = router;
