const mongoose = require("mongoose");
const bcrypt = require("bcryptjs");
const Admin = require("./models/Admin");

mongoose
    .connect("mongodb://127.0.0.1:27017/isa_db")
    .then(async () => {
        console.log("MongoDB Connected for admin seeding");

        try {
            const email = "admin@isa.edu";
            let admin = await Admin.findOne({ email });

            if (admin) {
                console.log("Admin user already exists");
                process.exit();
            }

            const salt = await bcrypt.genSalt(10);
            const hashedPassword = await bcrypt.hash("Admin@123", salt);

            admin = new Admin({
                email,
                password: hashedPassword
            });

            await admin.save();
            console.log("Admin user created successfully! (email: admin@isa.edu, pw: Admin@123)");
            process.exit();
        } catch (err) {
            console.error("Seeding error:", err);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });