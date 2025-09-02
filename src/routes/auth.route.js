const router = require("express").Router();
const userModel = require("../models/user.model");
const authController = require("../controllers/auth.controller");


// POST /api/auth/signup
router.post("/register", authController.registerUser );

// POST /api/auth/login
router.post("/login", authController.loginUser);

// POST /api/auth/logout
router.post("/logout",authController.logOut);

module.exports = router;
