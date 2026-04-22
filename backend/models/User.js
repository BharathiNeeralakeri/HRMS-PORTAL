const mongoose = require("mongoose");

const UserSchema = new mongoose.Schema({
  email: String,
  password: String,
  role: String,
});

// "users" MUST match MongoDB collection name
module.exports = mongoose.model("User", UserSchema, "users");