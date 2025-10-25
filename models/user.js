const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  userId: { type: String, required: true, unique: true },
  wallet: { type: Number, default: 0 },
  inventory: { type: Array, default: [] },
  lastDaily: { type: Number, default: 0 },
  blacklisted: { type: Boolean, default: false } // <-- NEW
});

module.exports = mongoose.model('User', userSchema);
