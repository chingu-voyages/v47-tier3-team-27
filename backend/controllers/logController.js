const Log = require("../models/Log");
const User = require("../models/User");
const Task = require("../models/Task");

const addLog = async (req, res) => {
  try {
    const { user, logDescription } = req.body;
    const taskid = req.params.taskid;
    console.log("userId, logDescription", user, logDescription);
    console.log("taskid", req.params.taskid);
    const newLog = new Log({
      user,
      taskid,
      logDescription,
    });
    const response = await newLog.save();
    const task = await Task.findById(taskid);
    task.history.push(newLog);
    await task.save();

    res
      .status(200)
      .send({ message: "New Log has been created and pushed to task." });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getLogsByTask = async (req, res) => {
  try {
    const taskid = req.params.taskid;
    const task = await Task.findById(taskid).populate("history").exec();
    res.json(task.history);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
const editLog = async (req, res) => {
  try {
    const updatedLog = await Log.findByIdAndUpdate(req.params.logid, {
      logDescription: req.body.logDescription,
    });

    if (!updatedLog) {
      return res.status(404).send({ error: "Log not found" });
    }

    res.status(200).send({ message: "Log updated successfully!" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const deleteLog = async (req, res) => {
  try {
    const { logid } = req.params;
    const log = await Log.findByIdAndDelete(logid);
    res.status(200).send({ message: "Log has been successfully deleted." });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { getLogsByTask, addLog, editLog, deleteLog };
