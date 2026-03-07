const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    issue: { type: String, required: true },
    notes: { type: String },
    studentName: { type: String, required: true },
    studentRegNo: { type: String, required: true },
    studentEmail: { type: String, required: true }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
