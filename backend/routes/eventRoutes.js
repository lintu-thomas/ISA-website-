const express = require("express");
const router = express.Router();
const Event = require("../models/Event");
const auth = require("../middleware/auth");

// Get all events
router.get("/", async (req, res) => {
  try {
    const events = await Event.find().sort({ date: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create event (admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    
    // Create new event
    const newEvent = new Event({
      title,
      description,
      date,
      location,
    });

    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error("Event creation error:", err);
    res.status(500).json({ message: err.message || "Server Error" });
  }
});

// Update event (admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, date, location } = req.body;
    
    // Find and update the event
    const eventFields = { title, description, date, location };
    
    const event = await Event.findByIdAndUpdate(
      req.params.id,
      { $set: eventFields },
      { new: true }
    );

    if (!event) return res.status(404).json({ message: "Event not found" });

    res.json(event);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete event (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await Event.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

    await Event.findByIdAndDelete(req.params.id);

    res.json({ message: "Event removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
