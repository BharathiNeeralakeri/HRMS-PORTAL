const express = require("express");
const router = express.Router();
const Attendance = require("../models/Attendance");
const Employee = require("../models/Employee");

// ✅ Get all employees with today's attendance
router.get("/all", async (req, res) => {
  try {
    const employees = await Employee.find();

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    const data = await Promise.all(
      employees.map(async (emp) => {
        const record = await Attendance.findOne({
          email: emp.email,
          date: { $gte: today },
        });

        return {
          ...emp._doc,
          status: record ? record.status : "Not Marked",
        };
      })
    );

    res.json(data);
  } catch (err) {
    res.status(500).json(err);
  }
});

// ✅ Mark attendance
router.post("/mark", async (req, res) => {
  try {
    const { employeeId, name, email, status } = req.body;

    const today = new Date();
    today.setHours(0, 0, 0, 0);

    let record = await Attendance.findOne({
      email,
      date: { $gte: today },
    });

    if (record) {
      record.status = status;
      await record.save();
      return res.json({ message: "Updated" });
    }

    record = new Attendance({
      employeeId,
      name,
      email,
      status,
    });

    await record.save();

    res.json({ message: "Marked" });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;