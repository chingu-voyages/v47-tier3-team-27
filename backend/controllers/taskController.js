const Task = require("../models/Task");

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

    const savedTask = await newTask.save();
    console.log("savedTask", savedTask);
    res.status(201).send(savedTask);
  } catch (error) {
    console.log(error);
    res.status(500).send({ error: "Internal Server Error" });
  }
}

async function editTask(req, res) {
  try {
    const taskId = req.params.taskId;
    const updateFields = req.body;

    const updatedTask = await Task.findByIdAndUpdate(taskId, updateFields, {
      new: true,
    });

    if (!updatedTask) {
      return res.status(404).send({ error: "Task not found" });
    }

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
};
