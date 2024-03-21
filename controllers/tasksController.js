const Task = require('../models/Task');

const getAllTasks = async (req, res) => {
  try {
    const tasks = await Task.find({});
    res.status(200).json(tasks);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const createTask = async (req, res) => {
  try {
    const task = await Task.create(req.body);
    res.status(201).json({ task });
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

const getTask = (req, res) => {
  res.send('a task');
};

const updateTask = (req, res) => {
  res.send('update a task');
};

const deleteTask = (req, res) => {
  res.send('delete a task');
};

module.exports = { getAllTasks, createTask, getTask, updateTask, deleteTask };
