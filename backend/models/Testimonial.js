const mongoose = require("mongoose");

const testimonialSchema = new mongoose.Schema(
  {
    name: { type: String, required: true },
    role: { type: String, required: true },
    message: { type: String },
    videoUrl: { type: String }
  },
  { timestamps: true }
);

module.exports = mongoose.model("Testimonial", testimonialSchema);
