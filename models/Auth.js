const mongoose = require('mongoose');

const authSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
    unique: true
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true
  },
  passwordHash: {
    type: String,
    required: true
  },
  lastLogin: {
    type: Date,
    default: null
  }
}, {
  timestamps: false
});

// Index for creating unique accounts
authSchema.index({ email: 1 }, { unique: true });
// Index for joins/lookup
authSchema.index({ userId: 1 }, { unique: true });

module.exports = mongoose.model('Auth', authSchema);

