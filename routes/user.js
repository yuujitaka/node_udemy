const express = require('express');
const authenticationMiddleware = require('../middleware/auth');
const testUserMiddleware = require('../middleware/testUser');
const router = express.Router();
const {
  login,
  register,
  updateUser,
} = require('../controllers/userController');

router.post('/register', register);
router.post('/login', login);
router.patch(
  '/updateUser',
  authenticationMiddleware,
  testUserMiddleware,
  updateUser
);

module.exports = router;
