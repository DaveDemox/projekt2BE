const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Index for unique user search and adding people to lists
userSchema.index({ name: 1 });

module.exports = mongoose.model('User', userSchema);

