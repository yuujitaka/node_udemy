const { StatusCodes } = require('http-status-codes');
const User = require('../model/User');

const register = async (req, res) => {
  res.sendStatus(StatusCodes.CREATED);
};

const login = async (req, res) => {
  res.send('login');
};

module.exports = {
  register,
  login,
};
