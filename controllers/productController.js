const path = require('path');
const { StatusCodes } = require('http-status-codes');
const { HttpError, uploadImage: uploadImageUtils } = require('../utils');
const Product = require('../model/Product');
const Review = require('../model/Review');

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
  const product = await Product.findById(id).populate('reviews');

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

  await Review.deleteMany({ product: id });
  await product.deleteOne();

  res.sendStatus(StatusCodes.OK);
};

const uploadImage = async (req, res) => {
  const { image } = req.files;

  if (!image) throw new HttpError('Upload image', StatusCodes.BAD_REQUEST);

  if (!image.mimetype.startsWith('image'))
    throw new HttpError('Upload image', StatusCodes.BAD_REQUEST);

  const maxSize = 1024 * 1024;

  if (image.size > maxSize)
    throw new HttpError(
      'Upload image smaller than 1MB',
      StatusCodes.BAD_REQUEST
    );

  const imagePath = path.join(
    __dirname,
    '../public/uploads/' + `${image.name}`
  );

  await image.mv(imagePath);

  res.sendStatus(StatusCodes.OK);
};

//trying to merge uploadImage with create
const createProductWithImage = async (req, res) => {
  const { image } = req.files;
  const imagePath = await uploadImageUtils(image);
  const colors = JSON.parse(req.body.colors);
  const product = await Product.create({
    ...req.body,
    colors,
    user: req.user.id,
    image: imagePath,
  });
  res.status(StatusCodes.CREATED).json(product);
};

const getProductReviews = async (req, res) => {
  const { id: productId } = req.params;
  const reviews = await Review.find({ product: productId });

  res.status(StatusCodes.OK).json(reviews);
};

module.exports = {
  createProduct,
  getAllProducts,
  getProduct,
  updateProduct,
  deleteProduct,
  uploadImage,
  createProductWithImage,
  getProductReviews,
};
