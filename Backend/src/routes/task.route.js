//task.route.js
const express = require("express");
const taskModel = require("../models/task.model");
const authMiddleware = require("../middleware/auth.middlerware");
const adminMiddleware = require("../middleware/admin.middlerware");

const router = express.Router();

// Helper: allow if owner or admin
const isOwnerOrAdmin = (task, reqUser) =>
  task.user.toString() === reqUser.id || reqUser.role === "admin";

// Create task (owner = current user)
router.post("/", authMiddleware,adminMiddleware, async (req, res) => {
  try {
    const { title, description } = req.body;
    if (!title) return res.status(400).json({ msg: "title is required" });

    const task = await taskModel.create({
      title,
      description: description || "",
      user: req.user.id
    });

    res.status(201).json(task);
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

// Get my tasks (with simple pagination)
router.get("/", authMiddleware, async (req, res) => {
  try {
    const page = Math.max(parseInt(req.query.page || "1"), 1);
    const limit = Math.min(Math.max(parseInt(req.query.limit || "20"), 1), 100);
    const skip = (page - 1) * limit;

    const [items, total] = await Promise.all([
      taskModel.find({ user: req.user.id })
        .sort({ createdAt: -1 })
        .skip(skip)
        .limit(limit),
      taskModel.countDocuments({ user: req.user.id })
    ]);

    res.json({ page, limit, total, items });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

// Admin: all tasks
router.get("/all", authMiddleware, adminMiddleware, async (_req, res) => {
  try {
    const tasks = await taskModel.find().populate("user", "username email role");
    res.json(tasks);
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

// Update task (owner or admin)
router.put("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "taskModel not found" });

    if (!isOwnerOrAdmin(task, req.user)) return res.status(403).json({ msg: "Not authorized" });

    const allowed = {};
    if (req.body.title !== undefined) allowed.title = req.body.title;
    if (req.body.description !== undefined) allowed.description = req.body.description;
    if (req.body.status !== undefined) allowed.status = req.body.status;

    const updated = await taskModel.findByIdAndUpdate(task._id, allowed, { new: true, runValidators: true });
    res.json(updated);
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

// Toggle status (quick helper)
router.patch("/:id/toggle", authMiddleware, async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "taskModel not found" });

    if (!isOwnerOrAdmin(task, req.user)) return res.status(403).json({ msg: "Not authorized" });

    const newStatus = task.status === "pending" ? "completed" : "pending";
    task.status = newStatus;
    await task.save();
    res.json(task);
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

// Delete task (owner or admin)
router.delete("/:id", authMiddleware, async (req, res) => {
  try {
    const task = await taskModel.findById(req.params.id);
    if (!task) return res.status(404).json({ msg: "taskModel not found" });

    if (!isOwnerOrAdmin(task, req.user)) return res.status(403).json({ msg: "Not authorized" });

    await task.deleteOne();
    res.json({ msg: "taskModel deleted" });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

module.exports = router;