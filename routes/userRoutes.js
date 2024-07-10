const express = require('express');
const {
  getAllUsers,
  getUser,
  showUser,
  updateUser,
  updateUserPassword,
} = require('../controllers/userController');
const { permissionsMiddleware } = require('../middleware/auth');

const router = express.Router();

router.route('/').get(permissionsMiddleware('admin'), getAllUsers);
router.route('/showMe').get(showUser);
router.route('/updateUser').patch(updateUser);
router.route('/updateUserPassword').patch(updateUserPassword);
router.route('/:id').get(getUser);

module.exports = router;
