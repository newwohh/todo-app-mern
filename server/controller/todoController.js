const Todo = require("../models/todoModel");

exports.registerUser = async (req, res) => {
  try {
    const { username } = req.body;
    const todoData = await Todo.create({ username });

    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { username, task } = req.body;
    const todoData = await Todo.findOneAndUpdate(
      { username },
      { $push: { tasks: task } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { username, id } = req.body;
    const deleteTask = await Todo.findOneAndUpdate(
      { username },
      { $pull: { tasks: { _id: id } } },
      { new: true }
    );

    res.status(200).json({
      success: true,
      data: deleteTask,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.getTasks = async (req, res) => {
  try {
    const { username } = req.body;
    const todoData = await Todo.findOne({ username }).select("tasks");

    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteUserAlongWithTasks = async (req, res) => {
  try {
    const { username } = req.body;
    const todoData = await Todo.deleteOne({ username });

    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error,
    });
  }
};
