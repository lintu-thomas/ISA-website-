const mongoose = require("mongoose");
const User = require("./models/User");

const boardData = [
    {
        "name": "Matthew Behanan Cherian",
        "role": "President",
        "email": "matthew.cherian@gmail.com",
        "password": "Matthew@123"
    },
    {
        "name": "Mabel Emilie Viegas",
        "role": "Vice President",
        "email": "mabel.viegas@gmail.com",
        "password": "Mabel@123"
    },
    {
        "name": "Hanan Salim",
        "role": "General Secretary",
        "email": "hanan.salim@gmail.com",
        "password": "Hanan@123"
    },
    {
        "name": "Chaitali Agrawal",
        "role": "Joint Secretary",
        "email": "chaitali.agrawal@gmail.com",
        "password": "Chaitali@123"
    },
    {
        "name": "Tenzin Cheonyi",
        "role": "Cultural Secretary",
        "email": "tenzin.cheonyi@gmail.com",
        "password": "Tenzin@123"
    },
    {
        "name": "Lintu Thomas",
        "role": "Treasurer",
        "email": "lintu.thomas@gmail.com",
        "password": "Lintu@123"
    },
    {
        "name": "Thangneichan Haokip",
        "role": "PR Head",
        "email": "thangneichan.haokip@gmail.com",
        "password": "Thang@123"
    },
    {
        "name": "Joshua Maimbo Muleya",
        "role": "Event Head",
        "email": "joshua.muleya@gmail.com",
        "password": "Joshua@123"
    },
    {
        "name": "Sumaya Muhammed",
        "role": "Event Head",
        "email": "sumaya.muhammed@gmail.com",
        "password": "Sumaya@123"
    },
    {
        "name": "Javiriya Qureshi",
        "role": "Head of Media",
        "email": "javiriya.qureshi@gmail.com",
        "password": "Javiriya@123"
    },
    {
        "name": "Justin Caye D. Cambas",
        "role": "Documentation Head",
        "email": "justin.cambas@gmail.com",
        "password": "Justin@123"
    },
    {
        "name": "Meinar Efel Nahak",
        "role": "Newsletter Head",
        "email": "meinar.nahak@gmail.com",
        "password": "Meinar@123"
    },
    {
        "name": "Ashlyn Ruth Cutinha",
        "role": "Social Media Head",
        "email": "ashlyn.cutinha@gmail.com",
        "password": "Ashlyn@123"
    },
    {
        "name": "Shravan Kumar",
        "role": "External Advisor",
        "email": "shravan.kumar@gmail.com",
        "password": "Shravan@123"
    },
    {
        "name": "Anan Zahra K S",
        "role": "External Financial Advisor",
        "email": "anan.zahra@gmail.com",
        "password": "Anan@123"
    }
];

const imageMap = {
    "Matthew Behanan Cherian": "/faculty/matthew.jpeg",
    "Mabel Emilie Viegas": "/faculty/mabel.jpeg",
    "Hanan Salim": "/faculty/hanan.jpeg",
    "Chaitali Agrawal": "/faculty/chaitali.jpeg",
    "Tenzin Cheonyi": "/faculty/tenzin.jpeg",
    "Lintu Thomas": "/faculty/lintu.jpeg",
    "Thangneichan Haokip": "/faculty/thang.jpeg",
    "Joshua Maimbo Muleya": "/faculty/joshua.jpeg",
    "Sumaya Muhammed": "/faculty/sumaya.jpeg",
    "Javiriya Qureshi": "/faculty/javiriya.jpeg",
    "Justin Caye D. Cambas": "/faculty/justin.jpeg",
    "Meinar Efel Nahak": "/faculty/meinar.jpeg",
    "Ashlyn Ruth Cutinha": "/faculty/ashlyn.jpeg",
    "Shravan Kumar": "/faculty/shravan.jpeg",
    "Anan Zahra K S": "/faculty/anan.jpeg"
};

const generateData = () => {
    return boardData.map((user, index) => {
        // start with 232bcaa01
        const regNum = (index + 1).toString().padStart(2, "0");
        const regNo = `232bcaa${regNum}`;

        // profile pic
        const picPath = imageMap[user.name] || "/faculty/matthew.jpeg"; // Fallback to a known image if somehow missing
        const profilePic = `https://isa-backend-production.up.railway.app/uploads${picPath}`;

        return {
            name: user.name,
            regNo,
            email: user.email,
            profilePic,
            password: user.password
        };
    });
};

mongoose
    .connect("mongodb://127.0.0.1:27017/isa_db")
    .then(async () => {
        console.log("MongoDB Connected for seeding");

        try {
            await User.deleteMany({}); // Optional: clear existing to avoid duplicates
            console.log("Cleared existing users");

            const usersToInsert = generateData();
            await User.insertMany(usersToInsert);

            console.log("Successfully seeded users:");
            console.table(usersToInsert);

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