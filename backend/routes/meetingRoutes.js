const express = require("express");
const router = express.Router();
const Meeting = require("../models/Meeting");

// ➕ Add Meeting
router.post("/add", async (req, res) => {
  try {
    const meeting = new Meeting(req.body);
    await meeting.save();
    res.json({ message: "Meeting Scheduled" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

// 📥 Get meetings for employee
router.get("/:email", async (req, res) => {
  try {
    const meetings = await Meeting.find({
      participants: req.params.email,
    });
    res.json(meetings);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;