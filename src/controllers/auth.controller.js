//auth.controller.js
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const userModel = require("../models/user.model");

const registerUser = async (req, res) => {
  try {
    const {
      username,
      email,
      password,
      role,
    } = req.body;
    if (!username || !email || !password)
      return res
        .status(400)
        .json({ msg: "username, email, password required" });

    const isUserAlreadyExist = await userModel.findOne({
      $or: [{ username }, { email }],
    });
    if (isUserAlreadyExist) {
      return res.status(422).json({
        message:
          isUserAlreadyExist.username == username
            ? "username already exist"
            : "email already exists",
      });
    }

    const hash = await bcrypt.hash(password, 10);

    const user = await userModel.create({
      username,
      email,
      password: hash,
      role: role === "admin" ? "admin" : "user", // prevent creating admin here
    });
    const token = jwt.sign({ id: user._id, role: user.role  }, process.env.SECRETKEY, { expiresIn: "1h" });

    res.cookie("token", token);
    res.status(201).json({
      message: "user registered successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token: token,
        role: user.role,
      },
    });
    console.log("user registered successfully");
    
  } catch (error) {
    res.status(401).json({
      message: error.message,
      error
    });
    console.log(error);
  }
};

const loginUser = async (req, res) => {
  try {
    const { emailORusername, password,role } = req.body;

    if (!emailORusername || !password){
      return res
        .status(410)
        .json({ msg: "emailORusername and password required" });}

    const user = await userModel.findOne({
      $or: [{ email: emailORusername.toLowerCase() }, { username:emailORusername }],
    });
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }
    const isPasswordValid = await bcrypt.compare(password, user.password);
    if (!isPasswordValid) {
      return res.status(400).json({
        message: "Invalid credentials",
      });
    }

    const token = jwt.sign({ id: user._id, role: user.role  }, process.env.SECRETKEY,{ expiresIn: "1h" });
    res.cookie("token", token);
    res.status(200).json({
      message: "User logged in successfully",
      user: {
        id: user._id,
        username: user.username,
        email: user.email,
        token:token,
        role:user.role
      },
    });
  } catch (error) {
    console.log(error.message);
  }
};

module.exports = {
  registerUser,
  loginUser,
};
