const { StatusCodes } = require('http-status-codes');
const { HttpError, checkPermissions } = require('../utils');
const Order = require('../model/Order');

const createOrder = async (req, res) => {
  res.send('createOrder');
};

const getAllOrders = async (req, res) => {
  res.send('getAllOrders');
};

const getUserOrders = async (req, res) => {
  res.send('getOrder');
};

const getOrder = async (req, res) => {
  res.send('getOrder');
};

const updateOrder = async (req, res) => {
  res.send('updateOrder');
};

module.exports = {
  createOrder,
  getAllOrders,
  getUserOrders,
  getOrder,
  updateOrder,
};
