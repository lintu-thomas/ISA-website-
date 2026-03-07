const express = require("express");
const router = express.Router();
const multer = require("multer");
const path = require("path");
const fs = require("fs");
const WebsiteEvent = require("../models/WebsiteEvent");
const auth = require("../middleware/auth");

// Ensure upload directory exists
const uploadDir = path.join(__dirname, "../public/uploads");
if (!fs.existsSync(uploadDir)) {
  fs.mkdirSync(uploadDir, { recursive: true });
}

// Multer storage configuration
const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, "public/uploads/");
  },
  filename: (req, file, cb) => {
    cb(null, `website-event-${Date.now()}-${file.originalname}`);
  }
});

const upload = multer({
  storage,
  limits: { fileSize: 5 * 1024 * 1024 }, // 5MB limit
  fileFilter: (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|webp|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (mimetype && extname) {
      return cb(null, true);
    } else {
      cb(new Error("Images only!"));
    }
  }
});

// Get all website events (public or admin)
router.get("/", async (req, res) => {
  try {
    const events = await WebsiteEvent.find().sort({ createdAt: -1 });
    res.json(events);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create website event (admin only)
router.post("/", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    let imageUrl = "";
    
    if (req.file) {
      imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const newEvent = new WebsiteEvent({ title, description, imageUrl });
    const event = await newEvent.save();
    res.json(event);
  } catch (err) {
    console.error("Website event creation error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Update website event (admin only)
router.put("/:id", auth, upload.single("image"), async (req, res) => {
  try {
    const { title, description } = req.body;
    let updateData = { title, description };
    
    if (req.file) {
      updateData.imageUrl = `/uploads/${req.file.filename}`;
    }
    
    const event = await WebsiteEvent.findByIdAndUpdate(req.params.id, updateData, { new: true });
    if (!event) return res.status(404).json({ message: "Event not found" });
    res.json(event);
  } catch (err) {
    console.error("Website event update error:", err);
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete website event (admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const event = await WebsiteEvent.findById(req.params.id);
    if (!event) return res.status(404).json({ message: "Event not found" });

// Remove file from disk if it exists
    if (event.imageUrl) {
      const filePath = path.join(__dirname, "../public", event.imageUrl);
      if (fs.existsSync(filePath)) {
        fs.unlinkSync(filePath);
      }
    }

    await WebsiteEvent.findByIdAndDelete(req.params.id);
    res.json({ message: "Event removed" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
