const mongoose = require("mongoose");

const meetingSchema = new mongoose.Schema({
  title: String,
  date: String,
  time: String,
  participants: [String], // emails of employees
});

module.exports = mongoose.model("Meeting", meetingSchema);