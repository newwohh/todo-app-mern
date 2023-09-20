const jwt = require("jsonwebtoken");
const Todo = require("../models/todoModel");

exports.registerUser = async (req, res) => {
  try {
    const { username } = req.body;

    const user = await Todo.findOne({ username }).select("_id tasks");
    if (user) {
      let id = user.id;
      // console.log(user.id);
      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "1d",
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        status: "success",
        token,
        data: {
          user,
        },
      });
    } else if (!user) {
      const user = await Todo.create({ username });
      let id = user.id;

      const token = jwt.sign({ id }, process.env.JWT_SECRET, {
        expiresIn: "100d",
      });
      res.cookie("jwt", token, {
        httpOnly: true,
        secure: true,
        sameSite: "none",
      });

      res.status(200).json({
        success: true,
        data: user,
      });
    }
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.addTask = async (req, res) => {
  try {
    const { id, task } = req.body;
    const todoData = await Todo.findByIdAndUpdate(
      { _id: id },
      { $push: { tasks: task } },
      { new: true }
    );

    console.log(todoData);

    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error,
    });
  }
};

exports.deleteTask = async (req, res) => {
  try {
    const { userId, taskTitle } = req.body;
    const deleteTask = await Todo.findByIdAndUpdate(
      { _id: userId },
      { $pull: { tasks: { title: taskTitle } } },
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
    const id = req.params.id;
    const todoData = await Todo.findById({ _id: id }).select("tasks");

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
    const { id } = req.body;
    const todoData = await Todo.findByIdAndDelete({ _id: id });
    console.log(id);
    res.status(200).json({
      success: true,
      data: todoData,
    });
  } catch (error) {
    console.log(error.message);
    res.status(500).json({
      success: false,
      error,
    });
  }
};
