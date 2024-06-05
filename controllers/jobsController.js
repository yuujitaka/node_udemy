const { StatusCodes } = require('http-status-codes');
const HttpError = require('../utils/errors');
const Job = require('../model/Job');

const getAllJobs = async (req, res) => {
  const jobs = await Job.find({ createdBy: req.user.id }).sort('createdAt');
  res.status(StatusCodes.OK).json(jobs);
};

const getJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;

  const job = await Job.findOne({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new HttpError('No job found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(job);
};

const createJob = async (req, res) => {
  req.body.createdBy = req.user.id;
  await Job.create(req.body);
  res.sendStatus(StatusCodes.CREATED);
};

const updateJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;
  const { company, position, jobLocation } = req.body;

  if (!company || !position || !jobLocation) {
    throw new HttpError(
      'Company, position and location required',
      StatusCodes.BAD_REQUEST
    );
  }

  const job = await Job.findOneAndUpdate(
    {
      _id: jobId,
      createdBy: userId,
    },
    req.body,
    { new: true, runValidators: true }
  );

  if (!job) {
    throw new HttpError('No job found', StatusCodes.NOT_FOUND);
  }

  res.status(StatusCodes.OK).json(job);
};

const deleteJob = async (req, res) => {
  const jobId = req.params.id;
  const userId = req.user.id;

  const job = await Job.findOneAndDelete({
    _id: jobId,
    createdBy: userId,
  });

  if (!job) {
    throw new HttpError('No job found', StatusCodes.NOT_FOUND);
  }

  res.sendStatus(StatusCodes.OK);
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
};
