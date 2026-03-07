const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect('mongodb://127.0.0.1:27017/isa_db').then(async () => {
  try {
    const users = await User.find({ profilePic: { $regex: '^/faculty/' } });
    for (let user of users) {
      user.profilePic = user.profilePic.replace('/faculty/', '/');
      await user.save();
    }
    console.log(`Fixed ${users.length} profiles successfully!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(console.error);
