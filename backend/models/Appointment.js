const mongoose = require("mongoose");

const appointmentSchema = new mongoose.Schema(
  {
    date: { type: String, required: true },
    issue: { type: String, required: true },
    notes: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Appointment", appointmentSchema);
