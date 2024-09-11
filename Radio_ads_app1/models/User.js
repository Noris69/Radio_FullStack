const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  username: {
    type: String,
    required: true,
    unique: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['admin', 'annonceur'],
    default: 'annonceur',
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
  phone: {
    type: String,
    required: true,
  },
  profilePic: {
    type: String,
    default: 'https://static.vecteezy.com/system/resources/previews/020/765/399/non_2x/default-profile-account-unknown-icon-black-silhouette-free-vector.jpg',  // Default profile pic URL
  },
});

module.exports = mongoose.model('User', UserSchema);
