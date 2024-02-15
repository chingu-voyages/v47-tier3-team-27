const moment = require("moment");

const Task = require("../models/Task");
const Log = require("../models/Log");
const User = require("../models/User");

async function getDailyTasksByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const todayStart = moment().startOf("day");
    const todayEnd = moment().endOf("day");

    const tasks = await Task.find({
      users: userId,
      createdAt: {
        $gte: todayStart.toDate(),
        $lte: todayEnd.toDate(),
      },
    });

    console.log(tasks);

    res.status(200).send(tasks);
  } catch (error) {
    res.status(500).send({ message: error });
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function getTasksByUserId(req, res) {
  try {
    const userId = req.params.userId;
    const tasks = await Task.find({ users: userId });

    res.status(200).send(tasks);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function addTask(req, res) {
  try {
    const {
      name,
      taskDescription,
      isCompleted,
      deadline,
      days,
      users,
      history,
      subcategory,
      priority,
    } = req.body;

    const newTask = new Task({
      name,
      taskDescription,
      isCompleted,
      deadline,
      days,
      users,
      history,
      subcategory,
      priority,
    });

    const userId = await User.findById(users[0]);

    const savedTask = await newTask.save();

    const addLog = new Log({
      user: users[0],
      taskid: savedTask._id,
      logDescription: `${userId.username} created task.`,
    });
    await addLog.save();

    savedTask.history.push(addLog);
    savedTask.save();

    //console.log("savedTask", savedTask);
    res.status(201).send(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error", message: error });
  }
}

async function editTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const updateFields = req.body; // { updateFields, userId }

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).send({ error: "Task not found" });
    }

    // To be uncommented (and checked if working) once userId is in req.body

    // const user = await User.findById(userId)

    // const addLog = new Log({
    //   user: userId,
    //   taskid: taskId,
    //   logDescription: `${user.username} updated task`,
    // });
    // await addLog.save();

    // const thisTask = await Task.findById(taskId)
    // thisTask.history.push(addLog)

    res.status(200).send(updatedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function deleteTask(req, res) {
  try {
    const taskId = req.params.taskId;

    const deletedTask = await Task.findByIdAndDelete(taskId);

    if (!deletedTask) {
      return res.status(404).send({ error: "Task not found" });
    }

    res.status(200).send({ message: "Task deleted successfully" });
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

module.exports = {
  addTask,
  editTask,
  deleteTask,
  getTasksByUserId,
  getDailyTasksByUserId,
};
