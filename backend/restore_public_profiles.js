const mongoose = require('mongoose');
const User = require('./models/User');

mongoose.connect(process.env.MONGO_URI).then(async () => {
  try {
    const users = await User.find({});
    for (let user of users) {
      if (user.profilePic && !user.profilePic.startsWith('/faculty/')) {
        // Assume names map to "/faculty/firstname.jpeg" based on the schema and existing data
        const firstName = user.name.split(' ')[0].toLowerCase();
        user.profilePic = `/faculty/${firstName}.jpeg`;
        await user.save();
      }
    }
    console.log(`Restored ${users.length} profiles to the /faculty/ prefix dynamically!`);
    process.exit(0);
  } catch (err) {
    console.error(err);
    process.exit(1);
  }
}).catch(console.error);
