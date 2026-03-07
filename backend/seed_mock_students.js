const mongoose = require("mongoose");
const User = require("./models/User");

const firstNames = ["Aarav", "Vivaan", "Aditya", "Vihaan", "Arjun", "Sai", "Riya", "Aanya", "Ishita", "Ananya", "Diya", "Sara", "Kavya", "Priya", "Neha", "Rahul", "Karan", "Rohan", "Vikram", "Siddharth", "Amit", "Manish", "Ravi", "Suresh", "Ramesh", "Sneha", "Pooja", "Aarti", "Kriti", "Shruti", "Swati", "Nidhi", "Priyanka", "Deepa", "Divya", "Sanjay", "Rajesh", "Sunil", "Anil", "Rakesh", "Meena", "Geeta", "Seema", "Rekha", "Sushma", "Vivek", "Tarun", "Varun", "Mohit", "Rohit"];
const lastNames = ["Sharma", "Verma", "Gupta", "Malhotra", "Singh", "Kumar", "Patel", "Desai", "Joshi", "Chawla", "Mehta", "Bhatia", "Kapoor", "Agarwal", "Reddy", "Rao", "Nair", "Iyer", "Pillai", "Menon", "Das", "Bose", "Ghosh", "Datta", "Sen", "Yadav", "Rajput", "Chauhan", "Thakur", "Solanki", "Garg", "Bansal", "Goyal", "Mittal", "Jindal", "Tiwari", "Pandey", "Mishra", "Shukla", "Dubey", "Dixit", "Agnihotri", "Chaturvedi", "Trivedi", "Dwivedi", "Srivastava", "Saxena", "Mathur", "Bhatnagar", "Khanna"];

const generateData = () => {
    const dataset = [];
    // Board members were 1 to 15, so start from 16
    for (let i = 0; i < 50; i++) {
        const firstName = firstNames[Math.floor(Math.random() * firstNames.length)];
        const lastName = lastNames[Math.floor(Math.random() * lastNames.length)];
        const name = `${firstName} ${lastName}`;

        // Reg No starting from 232bcaa16 onwards
        const regNum = (i + 16).toString().padStart(2, "0");
        const regNo = `232bcaa${regNum}`;

        const cleanName = name.toLowerCase().replace(/[^a-z]/g, "");
        const username = cleanName.substring(0, 8) + regNum;

        // Changing email constraint to @gmail.com
        const email = `${username}@gmail.com`;

        // unique password
        const password = `${firstName}@2025${regNum}`;

        dataset.push({
            name,
            regNo,
            email,
            profilePic: "/faculty/matthew.jpeg", // Default mock profile picture
            password
        });
    }
    return dataset;
};

mongoose
    .connect("mongodb://127.0.0.1:27017/isa_db")
    .then(async () => {
        console.log("MongoDB Connected for seeding mock dataset...");

        try {
            const usersToInsert = generateData();
            await User.insertMany(usersToInsert);

            console.log(`Successfully seeded ${usersToInsert.length} additional mock students!`);
            console.table(usersToInsert.slice(0, 5)); // Show first 5 as sample
            console.log("... and 45 more.");

            process.exit();
        } catch (err) {
            // If validation fails because of unique constraints (e.g., already run), it will catch here
            console.error("Seeding error:", err.message);
            process.exit(1);
        }
    })
    .catch((err) => {
        console.error(err);
        process.exit(1);
    });