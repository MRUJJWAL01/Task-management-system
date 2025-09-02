const taskModel = require("../models/task.model");

const createTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskModel.create({
      title,
      description,
      owner: req.user._id,
    });
    res.status(201).json({ message: "taskModel created", task });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};
const status = async (req, res) => {
  try {
    const query = { owner: req.user._id };
    if (["pending", "completed"].includes(req.query.status)) {
      query.status = req.query.status;
    }
    const tasks = await taskModel.find(query).sort({ createdAt: -1 });
    res.json({ tasks });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};
const updateTask = async (req, res) => {
  try {
    const { title, description } = req.body;
    const task = await taskModel.findOneAndUpdate(
      { _id: req.params.id, owner: req.user._id },
      { $set: { title, description } },
      { new: true }
    );
    if (!task) return res.status(404).json({ message: "taskModel not found" });
    res.json({ message: "taskModel updated", task });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};
const toggleStatus = async (req, res) => {
  try {
    const task = await taskModel.findOne({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "taskModel not found" });
    task.status = task.status === "pending" ? "completed" : "pending";
    await task.save();
    res.json({ message: "Status updated", task });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};
const deleteTask = async (req, res) => {
  try {
    const task = await taskModel.findOneAndDelete({
      _id: req.params.id,
      owner: req.user._id,
    });
    if (!task) return res.status(404).json({ message: "taskModel not found" });
    res.json({ message: "taskModel deleted" });
  } catch (e) {
    res.status(500).json({ message: "Error", error: e.message });
  }
};

module.exports = {
  createTask,
  status,
  updateTask,
  toggleStatus,
  deleteTask
};
