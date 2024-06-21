const mongoose = require('mongoose');

const connectDB = async () => {
  return mongoose.connect(process.env.DATABASE_URI);
};

module.exports = connectDB;
