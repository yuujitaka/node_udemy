const { StatusCodes } = require('http-status-codes');
const { HttpError } = require('../utils');
const Review = require('../model/Review');

const createReview = async (req, res) => {
  res.send('createReview');
};

const getAllReviews = async (req, res) => {
  res.send('getAllReviews');
};

const getReview = async (req, res) => {
  res.send('getReview');
};

const updateReview = async (req, res) => {
  res.send('updateReview');
};

const deleteReview = async (req, res) => {
  res.send('deleteReview');
};

module.exports = {
  createReview,
  getAllReviews,
  getReview,
  updateReview,
  deleteReview,
};
