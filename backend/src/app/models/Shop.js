const mongoose = require('mongoose');

const AddresSchema = new mongoose.Schema({
  street: {
    type: String,
    required: true,
  },
  number: {
    type: Number,
    default: null,
  },
  city: {
    type: String,
    required: true,
  },
  district: {
    type: String,
    required: true,
  },
});

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
    address: AddresSchema,
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Shop', ShopSchema);
