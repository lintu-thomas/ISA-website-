const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

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

    const payload = {
      admin: {
        id: admin.id
      }
    };

    jwt.sign(
      payload,
      process.env.JWT_SECRET || "fallback_secret_key",
      { expiresIn: "5h" },
      (err, token) => {
        if (err) throw err;
        res.json({ success: true, token, message: "Login successful" });
      }
    );
  } catch (err) {
    res.status(500).json({ success: false, message: "Server Error" });
  }
});

module.exports = router;
