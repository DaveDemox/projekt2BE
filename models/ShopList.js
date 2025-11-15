const mongoose = require('mongoose');

const itemSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  completed: {
    type: Boolean,
    default: false
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  _id: false
});

const shopListSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true
  },
  archived: {
    type: Boolean,
    default: false
  },
  createdAt: {
    type: Date,
    default: Date.now
  },
  items: {
    type: [itemSchema],
    default: []
  }
}, {
  timestamps: false
});

// Index for filtering archived/non-archived lists
shopListSchema.index({ archived: 1 });
// Index for name of the list
shopListSchema.index({ name: 1 });

module.exports = mongoose.model('ShopList', shopListSchema);

