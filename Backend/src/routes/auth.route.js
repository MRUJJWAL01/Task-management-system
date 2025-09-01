//auth.route.js
const express = require("express");
const authController = require("../controllers/auth.controller");
const authMiddleware = require("../middleware/auth.middlerware");
const adminMiddleware = require("../middleware/admin.middlerware");
const User = require("../models/user.model");

const router = express.Router();

// Register
router.post("/user/register", authController.registerUser);

// Login
router.post("/user/login", authController.loginUser);

// Get current logged-in user
router.get("/me", authMiddleware, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password");
    if (!user) return res.status(404).json({ msg: "User not found" });
    res.json(user);
  } catch (err) {
    res.status(500).json({ msg: "Server error", error: err.message });
  }
});

// Promote or change role (Admin only)
router.patch("/promote/:userId", authMiddleware, adminMiddleware, async (req, res) => {
  try {
    const { role } = req.body; // "admin" or "user"
    const updated = await User.findByIdAndUpdate(
      req.params.userId,
      { role: role || "admin" },
      { new: true, runValidators: true }
    ).select("-password");

    if (!updated) return res.status(404).json({ msg: "User not found" });

    res.json({ msg: `User role updated to ${updated.role}`, user: updated });
  } catch (e) {
    res.status(500).json({ msg: "Server error", error: e.message });
  }
});

module.exports = router;
