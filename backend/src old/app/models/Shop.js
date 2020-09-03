const mongoose = require('mongoose');

const ShopSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    identification: {
      type: String,
      required: true,
    },
    phone: {
      type: String,
      required: true,
    },
    email: {
      type: String,
      lowercase: true,
      trim: true,
      required: true,
    },
    address: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Shop', ShopSchema);
