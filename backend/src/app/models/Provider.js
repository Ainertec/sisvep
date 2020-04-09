const mongoose = require('mongoose');

const ProviderSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  phone: [
    {
      type: Number,
      required: true,
      trim: true,
    },
  ],
  email: [
    {
      type: String,
      required: true,
      trim: true,
      lowcase: true,
    },
  ],
  identification: {
    type: String,
    required: true,
  },
  products: [
    {
      type: Schema.Types.ObjectId,
      ref: 'Product',
      required: true,
    },
  ],
});

module.exports = mongoose.model('Provider', ProviderSchema);
