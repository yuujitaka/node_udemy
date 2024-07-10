const express = require('express');
const {
  getAllUsers,
  getUser,
  showMe,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const { permissionsMiddleware } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(permissionsMiddleware('admin'), getAllUsers);
router.route('/showMe').get(showMe);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/:id').get(getUser);

module.exports = router;
