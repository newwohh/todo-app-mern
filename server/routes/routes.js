const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");

router.post("/createtodo", todoController.registerUser);
router.post("/newTask", todoController.addTask);
router.get("/tasks", todoController.getTasks);
router.put("/deleteTask", todoController.deleteTask);
router.delete("/deleteUser", todoController.deleteUserAlongWithTasks);

module.exports = router;
