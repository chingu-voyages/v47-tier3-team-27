const taskRouter = require("express").Router();
const {
  getTasksByUserId,
  getDailyTasksByUserId,
  addTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

taskRouter.get("/:userId", getTasksByUserId);
taskRouter.get("/daily/:userId", getDailyTasksByUserId);
taskRouter.post("/", addTask);
taskRouter.patch("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
