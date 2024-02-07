const taskRouter = require("express").Router();
const {
  getTasksByUserId,
  addTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

taskRouter.get("/:userId", getTasksByUserId);
taskRouter.post("/", addTask);
taskRouter.patch("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
