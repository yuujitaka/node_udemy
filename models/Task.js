const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'must provide name'],
    trim: true,
    maxlength: [50, 'name cannot be more than 50 characters'],
  },
  completed: {
    type: Boolean,
    default: false,
  },
  color: String,
});

module.exports = mongoose.model('Task', taskSchema);
