const { StatusCodes } = require('http-status-codes');
const moment = require('moment');
const mongoose = require('mongoose');
const HttpError = require('../utils/errors');
const Job = require('../model/Job');

const getAllJobs = async (req, res) => {
  const { search, status, jobType, sort, page, limit: limitReq } = req.query;
  const limit = Number(limitReq) || 10;
  const skip = ((Number(page) || 1) - 1) * limit;
  //alternative is to use ifs as store api
  const queryObject = {
    createdBy: req.user.id,
    ...(search ? { position: { $regex: search, $options: 'i' } } : {}),
    ...(status && status !== 'all' ? { status } : {}),
    ...(jobType && jobType !== 'all' ? { jobType } : {}),
  };
  const mapSorting = {
    latest: '-createdAt',
    oldest: 'createdAt',
    'a-z': 'position',
    'z-a': '-position',
  };

  let query = Job.find(queryObject);

  if (sort) {
    query = query.sort(mapSorting[sort]);
  }

  query = query.skip(skip).limit(limit);

  const jobs = await query;

  const totalJobs = await Job.countDocuments(queryObject);
  const numOfPages = Math.ceil(totalJobs / limit);

  res.status(StatusCodes.OK).json({ jobs, totalJobs, numOfPages });
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

const showStats = async (req, res) => {
  let stats = await Job.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.id),
      },
    },
    { $group: { _id: '$status', count: { $sum: 1 } } },
  ]);

  stats = stats.reduce((acc, curr) => {
    const { _id: title, count } = curr;
    acc[title] = count;
    return acc;
  }, {});

  const defaultStats = {
    pending: stats.pending || 0,
    interview: stats.interview || 0,
    declined: stats.declined || 0,
  };

  let monthlyApplications = await Job.aggregate([
    {
      $match: {
        createdBy: mongoose.Types.ObjectId.createFromHexString(req.user.id),
      },
    },
    {
      $group: {
        _id: { year: { $year: '$createdAt' }, month: { $month: '$createdAt' } },
        count: { $sum: 1 },
      },
    },
    { $sort: { '_id.year': -1, '_id.month': -1 } },
    { $limit: 8 },
  ]);

  monthlyApplications = monthlyApplications
    .map((item) => {
      const {
        _id: { year, month },
        count,
      } = item;
      const date = moment()
        .month(month - 1)
        .year(year)
        .format('MMM Y');
      return { date, count };
    })
    .reverse();

  res.status(StatusCodes.OK).json({ defaultStats, monthlyApplications });
};

module.exports = {
  getAllJobs,
  getJob,
  createJob,
  updateJob,
  deleteJob,
  showStats,
};
