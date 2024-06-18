const express = require('express');
const router = express.Router();
const {
  getAllProducts,
  createProduct,
} = require('../controllers/productController');
const uploadImage = require('../controllers/uploadController');

router.route('/').post(createProduct).get(getAllProducts);
router.route('/upload').post(uploadImage);

module.exports = router;
