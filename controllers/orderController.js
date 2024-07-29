const { StatusCodes } = require('http-status-codes');
const { HttpError, checkPermissions } = require('../utils');
const Order = require('../model/Order');
const Product = require('../model/Product');

const createOrder = async (req, res) => {
  const { cartItems, tax, shippingFee } = req.body;

  if (!cartItems || !cartItems.length) {
    throw new HttpError('Order without products', StatusCodes.BAD_REQUEST);
  }

  if (!tax || !shippingFee) {
    throw new HttpError(
      'Please provide tax and shippingFee',
      StatusCodes.BAD_REQUEST
    );
  }

  let orderItems = [];
  let subtotal = 0;

  for (const item of cartItems) {
    const product = await Product.findById(item.product);
    if (!product) {
      throw new HttpError(
        `Product with id ${item.product} not found`,
        StatusCodes.NOT_FOUND
      );
    }

    const singleOrderItem = {
      amount: item.amount,
      product: item.product,
    };

    orderItems.push(singleOrderItem);
    subtotal += product.price * item.amount;
  }

  const total = subtotal + tax + shippingFee;
  //check stripe project, this is just a fake one
  const paymentIntent = {
    client_secret: 'randomclientsecret',
    amount: total,
  };

  const order = await Order.create({
    orderItems,
    total,
    subtotal,
    tax,
    shippingFee,
    clientSecret: paymentIntent.client_secret,
    user: req.user.id,
  });

  res.status(StatusCodes.CREATED).json(order);
};

const getAllOrders = async (req, res) => {
  res.send('getAllOrders');
};

const getUserOrders = async (req, res) => {
  res.send('getUserOrders');
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
