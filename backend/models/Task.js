const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Task = new Schema(
  {
    name: { type: String },
    taskDescription: { type: String },
    isCompleted: { type: Boolean },
    deadline: { type: Date },
    days: [],
    users: [{ type: Schema.Types.ObjectId, ref: "User" }],
    history: [{ type: Schema.Types.ObjectId, ref: "Log" }],
    subcategory: { type: Schema.Types.ObjectId, ref: "Subcategory" },
    priority: { type: Number },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Task", Task);
