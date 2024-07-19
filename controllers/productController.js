const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../utils');
const Product = require('../model/Product');

const createProduct = async (req, res) => {
  const product = await Product.create({ ...req.body, user: req.user.id });
  res.status(StatusCodes.CREATED).json(product);
};

const getAllProducts = async (req, res) => {
  const products = await Product.find({});
  res.status(StatusCodes.OK).json(products);
};

const getProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findById(id);

  if (!product) throw new HttpError('No product found', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,
    runValidators: true,
  });

  if (!product) throw new HttpError('No product found', StatusCodes.NOT_FOUND);

  res.status(StatusCodes.OK).json(product);
};

const deleteProduct = async (req, res) => {
  const { id } = req.params;
  //alternative to remove -> await Product.findByIdAndDelete(id);
  const product = await Product.findById(id);
  if (!product) throw new HttpError('No product found', StatusCodes.NOT_FOUND);

  await product.deleteOne();

  res.sendStatus(StatusCodes.OK);
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
