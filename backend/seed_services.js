require("dotenv").config();
const mongoose = require("mongoose");
const Service = require("./models/Service");

const services = [
  {
    title: "Magis Exchange Program",
    description: "The Magis Exchange Program provides international students with opportunities to study abroad and engage in cultural exchange. Students can experience different academic environments and develop valuable cross-cultural skills.",
    link: "https://www.sju.edu.in/magis-exchange-program",
    linkText: "Learn More",
    buttonBgColor: "#5C7AEA"
  },
  {
    title: "Scholarships & Financial Aid",
    description: "Various scholarships and financial assistance programs are available to support international students during their academic journey. These programs aim to reduce financial barriers, reward academic excellence, and promote access to quality education.",
    link: "/scholarships",
    linkText: "View Scholarship Details",
    buttonBgColor: "#413543"
  },
  {
    title: "Student Support Appointments",
    description: "Book a one-on-one appointment with the International Students Office for assistance related to visas, accommodation, academics, or personal concerns. Our staff provides personalized guidance and helps students navigate challenges during their time at the university.",
    link: "/login",
    linkText: "Book an Appointment",
    buttonBgColor: "#413543"
  }
];

async function seed() {
  try {
    await mongoose.connect(process.env.MONGO_URI || "mongodb://127.0.0.1:27017/isa_db");
    console.log("Connected to MongoDB for seeding services");

    // Clear existing services
    await Service.deleteMany({});
    
    // Insert initial services
    await Service.insertMany(services);
    
    console.log("Services seeded successfully!");
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}

seed();
