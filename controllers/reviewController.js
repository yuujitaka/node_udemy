const { StatusCodes } = require('http-status-codes');
const { HttpError, checkPermissions } = require('../utils');
const Review = require('../model/Review');
const Product = require('../model/Product');

const createReview = async (req, res) => {
  const { productId } = req.body;
  const user = req.user.id;

  const product = await Product.findById(productId);

  if (!product)
    throw new HttpError(
      `No product with id ${productId} found`,
      StatusCodes.NOT_FOUND
    );

  const alreadyExists = await Review.findOne({
    product: productId,
    user,
  });

  if (alreadyExists)
    throw new HttpError(
      `Product can't be reviewed by the same user`,
      StatusCodes.CONFLICT
    );

  const review = await Review.create({
    ...req.body,
    product: req.body.productId,
    user,
  });

  res.status(StatusCodes.CREATED).json(review);
};

const getAllReviews = async (req, res) => {
  //Population is the process of replacing the specified path in the document of one collection with the actual document from the other collection.
  const reviews = await Review.find({})
    .populate({
      path: 'product',
      select: 'name price',
    })
    .populate({
      path: 'user',
      select: 'name',
    });

  res.status(StatusCodes.OK).json(reviews);
};

const getReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review)
    throw new HttpError(
      `No review with id ${reviewId} found`,
      StatusCodes.NOT_FOUND
    );

  res.status(StatusCodes.OK).json(review);
};

const updateReview = async (req, res) => {
  const { id: reviewId } = req.params;

  const review = await Review.findById(reviewId);

  if (!review)
    throw new HttpError(
      `No review with id ${reviewId} found`,
      StatusCodes.NOT_FOUND
    );

  //check if the user updating it is the one who created it
  checkPermissions(req.user, review.user);

  const newReview = await Review.findByIdAndUpdate(reviewId, req.body, {
    new: true,
    runValidators: true,
  });

  res.status(StatusCodes.OK).json(newReview);
};

const deleteReview = async (req, res) => {
  const { id: reviewId } = req.params;
  const review = await Review.findById(reviewId);

  if (!review)
    throw new HttpError(
      `No review with id ${reviewId} found`,
      StatusCodes.NOT_FOUND
    );

  //check if the user deleting it is the one who created it
  checkPermissions(req.user, review.user);

  await review.deleteOne();

  res.sendStatus(StatusCodes.OK);
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
