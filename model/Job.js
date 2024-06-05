const mongoose = require('mongoose');

const JobScheme = new mongoose.Schema(
  {
    company: {
      type: String,
      required: true,
      maxlenght: 50,
    },
    position: {
      type: String,
      required: true,
    },
    status: {
      type: String,
      enum: ['interview', 'declined', 'pending'],
      default: 'pending',
    },
    jobType: {
      type: String,
      enum: ['full-time', 'part-time', 'remote', 'internship'],
    },
    jobLocation: {
      type: String,
      required: true,
    },
    createdBy: {
      type: mongoose.Types.ObjectId,
      ref: 'User',
      required: true,
    },
  },
  { timestamps: true }
);

module.exports = mongoose.model('Job', JobScheme);
