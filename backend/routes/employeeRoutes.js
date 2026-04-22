const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// GET all employees
router.get("/", async (req, res) => {
  const employees = await Employee.find();
  res.json(employees);
});

// DELETE employee
router.delete("/delete/:id", async (req, res) => {
  await Employee.findByIdAndDelete(req.params.id);
  res.json({ message: "Deleted" });
});

module.exports = router;