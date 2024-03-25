const Task = require('../models/Task');
const asyncWrapper = require('../middleware/async');

const getAllTasks = asyncWrapper(async (req, res) => {
  const tasks = await Task.find({});
  res.status(200).json(tasks);
});

const createTask = asyncWrapper(async (req, res) => {
  const task = await Task.create(req.body);
  res.status(201).json({ task });
});

const getTask = asyncWrapper(async (req, res, next) => {
  const taskId = req.params.id;
  const task = await Task.findOne({ _id: taskId });
  if (!task) {
    const error = new Error(`No task with id ${taskId} was found`);
    error.status = 404;
    return next(error);
  }
  res.status(200).json(task);
});

const updateTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  const newTask = req.body;

  //overwrite: true if working with PUT
  const task = await Task.findOneAndUpdate({ _id: taskId }, newTask, {
    new: true,
    runValidators: true,
  });

  if (!task) {
    return res
      .status(404)
      .json({ message: `No task with id ${taskId} was found` });
  }

  res.status(200).json(task);
});

const deleteTask = asyncWrapper(async (req, res) => {
  const taskId = req.params.id;
  const task = await Task.findOneAndDelete({ _id: taskId });
  if (!task) {
    return res
      .status(404)
      .json({ message: `No task with id ${taskId} was found` });
  }
  res.sendStatus(204);
});

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
