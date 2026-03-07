const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const AdminUser = require("./models/AdminUser");

mongoose
  .connect("mongodb://127.0.0.1:27017/isa_db")
  .then(async () => {
    console.log("MongoDB Connected");
    
    const admin = await AdminUser.findOne({ email: 'admin@sju.com' });
    if (admin) {
      const salt = await bcrypt.genSalt(10);
      const hashedPassword = await bcrypt.hash('SjuAdmin@2024!', salt);
      admin.password = hashedPassword;
      await admin.save();
      console.log("Updated admin password successfully to SjuAdmin@2024!");
    } else {
      console.log("Admin user not found.");
    }
    process.exit(0);
  })
  .catch((err) => {
    console.error(err);
    process.exit(1);
  });
