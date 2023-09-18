const express = require("express");
const router = express.Router();
const todoController = require("../controller/todoController");
const middleware = require("../middlewares/protect");

router.post("/createtodo", todoController.registerUser);

// router.use(middleware.isLoggedIn);

router.put("/newTask", todoController.addTask);
router.get("/tasks/:id", todoController.getTasks);
router.put("/deleteTask", todoController.deleteTask);
router.delete("/deleteUser", todoController.deleteUserAlongWithTasks);

module.exports = router;
