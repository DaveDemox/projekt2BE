const mongoose = require('mongoose');

const userShopListSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true
  },
  shopListId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'ShopList',
    required: true
  },
  role: {
    type: String,
    required: true,
    enum: ['member', 'owner'],
    default: 'member'
  },
  addedAt: {
    type: Date,
    default: Date.now
  }
}, {
  timestamps: false
});

// Unique index to prevent duplicate membership
userShopListSchema.index({ userId: 1, shopListId: 1 }, { unique: true });
// Index to quickly find users of a list
userShopListSchema.index({ shopListId: 1 });

module.exports = mongoose.model('UserShopList', userShopListSchema);

