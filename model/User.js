const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcrypt');

//alternatives -> required: true / validate: {validator: validator.isEmail, message: "Please..."}

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Please provide a name'],
  },
  email: {
    type: String,
    unique: true,
    required: [true, 'Please provide an email'],
    validate: [validator.isEmail, 'Please provide a valid email'],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password'],
    minlength: 6,
  },
  role: {
    type: String,
    enum: ['admin', 'user'],
    default: 'user',
  },
});

UserSchema.pre('save', async function () {
  //do this only when modifying password
  //use this.modifiedPaths()
  if (this.isModified('password')) {
    const salt = await bcrypt.genSalt(10);
    this.password = await bcrypt.hash(this.password, salt);
  }
});

UserSchema.methods.comparePassword = async function (checkPassword) {
  const isMatch = await bcrypt.compare(checkPassword, this.password);
  return isMatch;
};

module.exports = mongoose.model('User', UserSchema);
