const express = require("express");
const router = express.Router();
const News = require("../models/News");
const auth = require("../middleware/auth");

// Get all news
router.get("/", async (req, res) => {
  try {
    const news = await News.find().sort({ createdAt: -1 });
    res.json(news);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Create news (Admin only)
router.post("/", auth, async (req, res) => {
  try {
    const { title, date } = req.body;
    const newNews = new News({ title, date });
    const savedNews = await newNews.save();
    res.json(savedNews);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Update news (Admin only)
router.put("/:id", auth, async (req, res) => {
  try {
    const { title, date } = req.body;
    const updatedNews = await News.findByIdAndUpdate(
      req.params.id,
      { title, date },
      { new: true }
    );
    if (!updatedNews) return res.status(404).json({ message: "News not found" });
    res.json(updatedNews);
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

// Delete news (Admin only)
router.delete("/:id", auth, async (req, res) => {
  try {
    const news = await News.findByIdAndDelete(req.params.id);
    if (!news) return res.status(404).json({ message: "News not found" });
    res.json({ message: "News deleted" });
  } catch (err) {
    res.status(500).json({ message: "Server Error" });
  }
});

module.exports = router;
