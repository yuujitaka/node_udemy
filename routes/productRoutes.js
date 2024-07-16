const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
} = require('../controllers/productController');
const { permissionsMiddleware } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(permissionsMiddleware('admin'), createProduct)
  .get(getAllProducts);
router.route('/uploadImage').post(permissionsMiddleware('admin'), uploadImage);
router
  .route('/:id')
  .get(getProduct)
  .patch(permissionsMiddleware('admin'), updateProduct)
  .delete(permissionsMiddleware('admin'), deleteProduct);

module.exports = router;
