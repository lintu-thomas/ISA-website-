require("dotenv").config();
const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const bcrypt = require("bcryptjs");
const AdminUser = require("./models/AdminUser");

const appointmentRoutes = require("./routes/appointmentRoutes");
const authRoutes = require("./routes/authRoutes");
const adminRoutes = require("./routes/adminRoutes");
const eventRoutes = require("./routes/eventRoutes");
const galleryRoutes = require("./routes/galleryRoutes");
const testimonialRoutes = require("./routes/testimonialRoutes");
const websiteEventRoutes = require("./routes/websiteEventRoutes");
const newsRoutes = require("./routes/newsRoutes");
const serviceRoutes = require("./routes/serviceRoutes");

const app = express();
app.use(cors());
app.use(express.json());

// Serve static files from the public directory
const path = require("path");
app.use("/uploads", express.static(path.join(__dirname, "public/uploads")));

mongoose.connect(process.env.MONGO_URI || "mongodb+srv://admin:adminPass@cluster0.kj6zefw.mongodb.net/isa_db")
  .then(async () => {
    console.log("MongoDB connected");

    // Auto-seed default admin if not exists
    const adminExists = await AdminUser.findOne({ email: 'admin@sju.com' });
    if (!adminExists) {
      console.log("Seeding default admin...");
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('sjuAdmin123', salt);
      await AdminUser.create({
        email: 'admin@sju.com',
        password: hashedPassword
      });
      console.log("Default admin created: admin@sju.com");
    }
  })
  .catch((err) => console.error(err));

app.use("/api/appointments", appointmentRoutes);
app.use("/api/auth", authRoutes);
app.use("/api/admin", adminRoutes);
app.use("/api/events", eventRoutes);
app.use("/api/gallery", galleryRoutes);
app.use("/api/testimonials", testimonialRoutes);
app.use("/api/website-events", websiteEventRoutes);
app.use("/api/news", newsRoutes);
app.use("/api/services", serviceRoutes);

app.get("/", (req, res) => {
  res.send("Backend running");
});

app.listen(5000, () => {
  console.log("Server running on port 5000");
});