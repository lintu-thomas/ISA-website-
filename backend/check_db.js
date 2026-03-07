const mongoose = require('mongoose');
const AdminUser = require('./models/AdminUser');

mongoose.connect('mongodb://127.0.0.1:27017/isa_db').then(async () => {
  const users = await AdminUser.find({});
  console.log("Admin Users in DB:");
  console.log(users);
  process.exit(0);
}).catch(err => {
  console.error("Error connecting to DB:", err);
  process.exit(1);
});
