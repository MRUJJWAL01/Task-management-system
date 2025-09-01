//user.model.js
const mongoose = require("mongoose");

const userSchema = new mongoose.Schema(
  {
   
    email: { type: String, required: true, unique: true,lowercase: true, trim: true  },
    username: { type: String, required: true, unique: true,trim:true },
    password: { type: String, required: true },
    role: { type: String, enum: ["user", "admin"], default: "user" },
  },
  { timestamps: true }
);


const userModel = mongoose.model("user",userSchema)

module.exports = userModel;