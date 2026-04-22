const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;

    console.log("Employee Login:", email);

    const employee = await Employee.findOne({ email: email.trim() });

    if (!employee) {
      return res.status(404).json({ message: "Employee not found" });
    }

    if (employee.password !== password.trim()) {
      return res.status(401).json({ message: "Invalid password" });
    }

    // ✅ IMPORTANT FIX (RETURN user not employee)
    res.json({
      message: "Login successful",
      user: employee
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: "Server error" });
  }
});

module.exports = router;