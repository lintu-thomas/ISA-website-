const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const Testimonial = require("../models/Testimonial");

// Multer Storage Setup
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    const uploadDir = path.join(__dirname, "../public/uploads");
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
    cb(null, uploadDir);
  },
  filename: function (req, file, cb) {
    cb(null, "testimonial-" + Date.now() + path.extname(file.originalname));
  },
});

const upload = multer({ storage: storage });

// GET all testimonials
router.get("/", async (req, res) => {
  try {
    const testimonials = await Testimonial.find().sort({ createdAt: -1 });
    res.json(testimonials);
  } catch (err) {
    res.status(500).json({ error: "Failed to fetch testimonials" });
  }
});

// POST new testimonial (with video)
router.post("/", upload.single("video"), async (req, res) => {
  try {
    const { name, role, message } = req.body;
    let videoUrl = "";
    
    if (req.file) {
      videoUrl = `/uploads/${req.file.filename}`;
    }
    
    const testimonial = new Testimonial({
      name,
      role,
      message,
      videoUrl
    });
    
    await testimonial.save();
    res.status(201).json(testimonial);
  } catch (err) {
    console.error("Testimonial upload error:", err);
    res.status(500).json({ error: "Failed to save testimonial" });
  }
});

// PUT update testimonial (with optional new video)
router.put("/:id", upload.single("video"), async (req, res) => {
  try {
    const { name, role, message } = req.body;
    let updateData = { name, role, message };
    
    if (req.file) {
      updateData.videoUrl = `/uploads/${req.file.filename}`;
    }
    
    const testimonial = await Testimonial.findByIdAndUpdate(req.params.id, updateData, { new: true });
    
    if (!testimonial) {
      return res.status(404).json({ message: "Testimonial not found" });
    }
    
    res.json(testimonial);
  } catch (err) {
    console.error("Testimonial update error:", err);
    res.status(500).json({ error: "Failed to update testimonial" });
  }
});

// DELETE a testimonial
router.delete("/:id", async (req, res) => {
  try {
    await Testimonial.findByIdAndDelete(req.params.id);
    res.json({ message: "Testimonial deleted" });
  } catch (err) {
    res.status(500).json({ error: "Failed to delete testimonial" });
  }
});

module.exports = router;
