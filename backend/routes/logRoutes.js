const logRouter = require("express").Router();
const { authJwt } = require("../middlewares/authJWT.js");

const {
  getLogsByTask,
  addLog,
  editLog,
  deleteLog,
} = require("../controllers/logController");

logRouter.post("/:taskid/add", [authJwt.verifyToken], addLog);
logRouter.patch("/:logid/edit", [authJwt.verifyToken], editLog);
logRouter.delete("/:logid/delete", [authJwt.verifyToken], deleteLog);
logRouter.get("/:taskid/all", [authJwt.verifyToken], getLogsByTask);

module.exports = logRouter;
