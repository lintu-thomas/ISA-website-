const express = require('express');
const router = express.Router();
const AdminUser = require('../models/AdminUser');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

router.post('/login', async (req, res) => {
  console.log("LOGIN ATTEMPT RECIEVED:", req.body);
  const { email, password } = req.body;
  try {
    const admin = await adminusers.findOne({ email });

    if (!admin) {
      return res.status(401).json({ message: "Admin not found" });
    }

    const isMatch = await bcrypt.compare(password, admin.password);

    if (!isMatch) {
      return res.status(401).json({ message: "Invalid password" });
    }

    console.log("Password matched!");

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
