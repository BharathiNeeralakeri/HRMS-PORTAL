const mongoose = require("mongoose");

const attendanceSchema = new mongoose.Schema({
  employeeId: String,
  name: String,
  email: String,
  date: {
    type: Date,
    default: Date.now,
  },
  status: {
    type: String,
    enum: ["Present", "Absent"],
    default: "Present",
  },
});

module.exports = mongoose.model("Attendance", attendanceSchema);