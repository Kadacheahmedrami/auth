const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

// Define User schema
const UserSchema = new mongoose.Schema({
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Hash the password before saving the user to the database
UserSchema.pre('save', async function (next) {
  if (this.isModified('password')) {
    this.password = await bcrypt.hash(this.password, 10); // Hash password with a salt of 10 rounds
  }
  next();
});



const User = mongoose.model('User',UserSchema) 

module.exports = User;