const { StatusCodes } = require('http-status-codes');
const Product = require('../model/Product');

const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.id });
  res.status(StatusCodes.CREATED).json(product);
};

const getAllProducts = async (req, res) => {
  res.send('getAllProducts');
};

const getProduct = async (req, res) => {
  res.send('getProduct');
};

const updateProduct = async (req, res) => {
  res.send('updateProduct');
};

const deleteProduct = async (req, res) => {
  res.send('deleteProduct');
};

const uploadImage = async (req, res) => {
  res.send('uploadImage');
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
};
