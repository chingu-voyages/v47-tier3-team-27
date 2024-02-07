const taskRouter = require("express").Router();
const {
  getTasks,
  addTask,
  editTask,
  deleteTask,
  getTaskById,
} = require("../controllers/taskController");

taskRouter.get("/", getTasks);
taskRouter.get("/:taskId", getTaskById);
taskRouter.post("/", addTask);
taskRouter.patch("/:taskId", editTask);
taskRouter.delete("/:taskId", deleteTask);

module.exports = taskRouter;
