const express = require("express");
const router = express.Router();
const Appointment = require("../models/Appointment");

router.post("/", async (req, res) => {
  try {
    const appointment = new Appointment(req.body);
    await appointment.save();
    res.status(201).json({ message: "Appointment saved" });
  } catch (err) {
    res.status(500).json({ error: "Failed to save appointment" });
  }
});

module.exports = router;
