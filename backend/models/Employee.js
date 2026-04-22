const mongoose = require("mongoose");

const employeeSchema = new mongoose.Schema({
  name: String,
  email: String,
  password: String,
  role: {
    type: String,
    default: "employee"
  },

  salary: {
    type: Number,
    default: 0
  },


  // ✅ NEW FIELD
  paymentStatus: {
    type: String,
    default: "Unpaid",
  },
});

module.exports = mongoose.model("Employee", employeeSchema);