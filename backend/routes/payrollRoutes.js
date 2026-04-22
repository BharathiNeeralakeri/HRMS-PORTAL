const express = require("express");
const router = express.Router();
const Employee = require("../models/Employee");

// ✅ PAY API
router.put("/pay/:id", async (req, res) => {
  try {
    console.log("PAY HIT:", req.params.id);

    const emp = await Employee.findByIdAndUpdate(
      req.params.id,
      { paymentStatus: "Paid" },
      { new: true }
    );

    res.json(emp);
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;