const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: 3,
    maxlength: 50,
  },
  lastName: {
    type: String,
    trim: true,
    maxlength: 20,
    default: '',
  },
  location: {
    type: String,
    trim: true,
    maxlength: 20,
    default: '',
  },
  email: {
    type: String,
    required: true,
    match: [
      /[a-z0-9!#$%&'*+/=?^_`{|}~-]+(?:\.[a-z0-9!#$%&'*+/=?^_`{|}~-]+)*@(?:[a-z0-9](?:[a-z0-9-]*[a-z0-9])?\.)+[a-z0-9](?:[a-z0-9-]*[a-z0-9])?/,
      'Please provide a valid email',
    ],
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

//mongoose middleware
//this = document
UserSchema.pre('save', async function () {
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.generateToken = function () {
  return jwt.sign(
    { id: this._id, email: this.email, name: this.name },
    process.env.JWT_SECRET,
    {
      expiresIn: '30d',
    }
  );
};

UserSchema.methods.checkPassword = async function (requestPassword) {
  const isMatch = await bcrypt.compare(requestPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
