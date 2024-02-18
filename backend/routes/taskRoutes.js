const taskRouter = require("express").Router();
const { authJwt } = require("../middlewares/authJWT.js");

const {
  getTasksByUserId,
  getDailyTasksByUserId,
  addTask,
  editTask,
  deleteTask,
} = require("../controllers/taskController");

taskRouter.get("/:userId", [authJwt.verifyToken], getTasksByUserId);
taskRouter.get("/daily/:userId", [authJwt.verifyToken], getDailyTasksByUserId);
taskRouter.post("", [authJwt.verifyToken], addTask);
taskRouter.patch("/:taskId", [authJwt.verifyToken], editTask);
taskRouter.delete("/:taskId", [authJwt.verifyToken], deleteTask);

module.exports = taskRouter;
