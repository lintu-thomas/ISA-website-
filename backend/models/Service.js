const mongoose = require("mongoose");

const serviceSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  description: {
    type: String,
    required: true
  },
  link: {
    type: String,
    required: true
  },
  linkText: {
    type: String,
    required: true
  },
  buttonBgColor: {
    type: String,
    default: "#413543"
  }
}, { timestamps: true });

module.exports = mongoose.model("Service", serviceSchema);
