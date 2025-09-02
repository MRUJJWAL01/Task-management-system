//task.model.js

const mongoose =  require("mongoose");


const taskSchema = new mongoose.Schema(
  {
    title: { type: String, required: true, trim: true },
    description: { type: String, default: "" },
    status: { type: String, enum: ["pending", "completed"], default: "pending" },
    user: { type: mongoose.Schema.Types.ObjectId, ref: "user", required: true }
  },
  { timestamps: true }
); 

const taskModel = mongoose.model("task", taskSchema);
module.exports = taskModel;
