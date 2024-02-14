const logRouter = require("express").Router();
const {
  getLogsByTask,
  addLog,
  editLog,
  deleteLog,
} = require("../controllers/logController");

logRouter.route("/:taskid/add").post(addLog);
logRouter.route("/:logid/edit").patch(editLog);
logRouter.route("/:logid/delete").delete(deleteLog);
logRouter.route("/:taskid/all").get(getLogsByTask);

module.exports = logRouter;
