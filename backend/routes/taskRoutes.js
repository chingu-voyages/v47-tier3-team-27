const taskRouter = require("express").Router();
const {
  getTasksByUserId,
  getDailyTasksByUserId,
  addTask,
  editTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");

taskRouter.get("/:userId", getTasksByUserId);
taskRouter.get("/daily/:userId", getDailyTasksByUserId);
taskRouter.post("/", addTask);
taskRouter.patch("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);
taskRouter.get("/task/:taskId", getTaskById);

module.exports = taskRouter;
