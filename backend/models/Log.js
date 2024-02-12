const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Log = new Schema(
  {
    user: { type: Schema.Types.ObjectId, ref: "User", required: true },
    taskid: { type: Schema.Types.ObjectId, ref: "Task", required: true },
    date: { type: Date, default: Date.now },
    logDescription: { type: String, required: true },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model("Log", Log);
