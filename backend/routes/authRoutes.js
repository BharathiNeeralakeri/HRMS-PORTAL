const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

router.post("/login", async (req, res) => {
  const { email, password } = req.body;

  try {
    console.log("LOGIN DATA:", email, password);

    // ✅ HR LOGIN
    if (email === "hr@gmail.com" && password === "123456") {
      return res.json({
        role: "hr",
        email,
        name: "HR Admin"
      });
    }

    // ✅ EMPLOYEE LOGIN
    const employee = await Employee.findOne({ email });

    if (!employee) {
      return res.status(401).json({ message: "Email not found" });
    }

    // 🔴 IMPORTANT: exact match
    if (employee.password !== password) {
      return res.status(401).json({ message: "Wrong password" });
    }

    return res.json({
      role: "employee",
      email: employee.email,
      name: employee.name
    });

  } catch (err) {
    console.log(err);
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;