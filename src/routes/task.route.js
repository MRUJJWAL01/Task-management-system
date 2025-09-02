const router = require("express").Router();
const taskModel = require("../models/task.model");
const authMiddleware = require("../middleware/auth.middlerware");
const taskController = require("../controllers/task.controller")

// Create task
// POST /api/tasks
router.post("/", authMiddleware.auth, taskController.createTask  );

// List tasks (optionally filter by status)
// GET /api/tasks?status=pending|completed
router.get("/", authMiddleware.auth, taskController.status );

// Update task (title/description)
// PUT /api/tasks/:id
router.put("/:id", authMiddleware.auth,taskController.updateTask);

// Toggle status (pending <-> completed)
// PATCH /api/tasks/:id/toggle
router.patch("/:id/toggle", authMiddleware.auth, taskController.toggleStatus );

// Delete task
// DELETE /api/tasks/:id
router.delete("/:id", authMiddleware.auth, taskController.deleteTask);


module.exports = router;
