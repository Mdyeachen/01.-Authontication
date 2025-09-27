const mongoose = require("mongoose");

// creaete a user schema
const userSchema = new mongoose.Schema(
  {
    username: { type: String, required: true, unique: true, trim: true },
    email: { type: String, required: true, unique: true, trim: true },
    password: {
      type: String,
      required: true,
      minLength: [6, "Password must be at least 6 characters long"],
      select: false,
    },
    name: { type: String, trim: true, default: "" },
    lastLogin: { type: Date, default: Date.now },
    isVarifed: { type: Boolean, default: false },
    resetPasswordToken: String,
    resetPasswordExpire: Date,
    verificationToken: String,
    verificationTokenExpire: Date,
  },
  { timestamps: true }
);

// create and export the user model
module.exports = mongoose.model("User", userSchema);
