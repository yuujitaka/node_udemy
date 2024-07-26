const express = require('express');
const {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
  updateOrder,
} = require('../controllers/orderController');
const { permissionsMiddleware } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(createOrder)
  .get(permissionsMiddleware('admin'), getAllOrders);
router.get('/myOrders', getUserOrders);
router.route('/:id').get(getOrder).patch(updateOrder);

module.exports = router;
