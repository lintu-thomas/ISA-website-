const mongoose = require("mongoose");

const userSchema = new mongoose.Schema({
  name: { type: String, required: true },
  regNo: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  profilePic: { type: String },
  password: {
    type: String,
    required: true,
    validate: {
      validator: function (v) {
        // At least one uppercase, one number, one special character, min 8 chars
        return /^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(v);
      },
      message: props => "Password must contain at least one capital letter, one number, and one special character."
    }
  }
});

module.exports = mongoose.model("User", userSchema);