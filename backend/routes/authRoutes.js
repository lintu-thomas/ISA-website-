const express = require("express");
const User = require("../models/User");

const router = express.Router();

router.post("/login", async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      return res.status(400).json({ error: "Email and password are required" });
    }
    const user = await User.findOne({ email, password });
    if (!user) return res.status(404).json({ error: "Invalid email or password" });

    // Return safe data without password
    res.json({
      _id: user._id,
      name: user.name,
      regNo: user.regNo,
      email: user.email,
      profilePic: user.profilePic
    });
  } catch (err) {
    res.status(500).json({ error: "Server error" });
  }
});

module.exports = router;