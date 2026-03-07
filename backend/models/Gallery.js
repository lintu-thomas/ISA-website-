const mongoose = require("mongoose");

const gallerySchema = new mongoose.Schema({
  imageUrl: {
    type: String,
    required: true
  },
  title: {
    type: String,
    required: false
  }
}, { timestamps: true });

module.exports = mongoose.model("Gallery", gallerySchema);
