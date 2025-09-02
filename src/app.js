//app.js
const express = require("express")
const authRoute = require("./routes/auth.route");
const cors = require("cors");
const taskRoutes = require("./routes/task.route");

const app = express();

// Middleware
 app.use(cors());
app.use(express.json());

// Routes
app.use("/api/auth", authRoute);
 app.use("/api/tasks", taskRoutes);

module.exports = app;