const express = require("express");
const router = express.Router();
const Service = require("../models/Service");
const auth = require("../middleware/auth");

// Get all services
router.get("/", async (req, res) => {
  try {
    const services = await Service.find().sort({ createdAt: 1 });
    res.json(services);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create service (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, description, link, linkText, buttonBgColor } = req.body;
    const newService = new Service({ title, description, link, linkText, buttonBgColor });
    const savedService = await newService.save();
    res.json(savedService);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update service (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, description, link, linkText, buttonBgColor } = req.body;
    const updatedService = await Service.findByIdAndUpdate(
      req.params.id,
      { title, description, link, linkText, buttonBgColor },
      { new: true }
    );
    if (!updatedService) return res.status(404).json({ message: "Service not found" });
    res.json(updatedService);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete service (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) return res.status(404).json({ message: "Service not found" });
    res.json({ message: "Service deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
