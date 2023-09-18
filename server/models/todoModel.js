const mongoose = require("mongoose");

const todoSchema = new mongoose.Schema({
  username: {
    type: String,
    required: [true, "required username"],
    unique: [true, "please try a unique username"],
  },
  tasks: [
    {
      title: { type: String, required: true },
      completed: {
        type: Boolean,
        default: false,
      },
    },
  ],
});

const Todo = mongoose.model("Todo", todoSchema);

module.exports = Todo;
