const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');

router.post('/login', async (req, res) => {
  console.log("LOGIN ATTEMPT RECEIVED:", req.body);
  const { email, password } = req.body;
  const trimmedEmail = email ? email.trim() : "";

  try {
    console.log(`Checking for admin: "${trimmedEmail}"`);
    const admin = await AdminUser.findOne({ email: trimmedEmail });

    if (!admin) {
      console.log("Admin email NOT found in database.");
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      console.log("Admin email found, but password does NOT match.");
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("Credentials match! Generating token...");

    // Dispensing static authentication token instead of JWT
    res.json({ success: true, token: "isa-admin-auth-token", message: "Login successful" });
  } catch (err) {
    console.error("Login Error:", err);
    res.status(500).json({ success: false, message: "Server Error", error: err.message });
  }
});

module.exports = router;
