const express = require('express');
const {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  createProductWithImage,
  getProductReviews,
} = require('../controllers/productController');
const { permissionsMiddleware } = require('../middleware/auth');

const router = express.Router();

router
  .route('/')
  .post(permissionsMiddleware('admin'), createProduct)
  .get(getAllProducts);
router.post('/withImage', createProductWithImage);
router.post('/uploadImage', permissionsMiddleware('admin'), uploadImage);
router
  .route('/:id')
  .get(getProduct)
  .patch(permissionsMiddleware('admin'), updateProduct)
  .delete(permissionsMiddleware('admin'), deleteProduct);

router.get('/:id/reviews', getProductReviews);

module.exports = router;
