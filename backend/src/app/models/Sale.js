/* eslint-disable no-restricted-syntax */
/* eslint-disable no-await-in-loop */
const mongoose = require('mongoose');
const Product = require('./Product');

const ItemSchema = new mongoose.Schema({
  product: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Product',
    required: true,
  },
  quantity: {
    type: Number,
    required: true,
  },
});

const SaleSchema = new mongoose.Schema(
  {
    itens: [ItemSchema],
    total: {
      type: Number,
      required: true,
    },
    payment: {
      type: String,
      default: null,
      required: true,
    },
    functionary: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'User',
    },
  },
  {
    timestamps: true,
  }
);

SaleSchema.post('save', async (document) => {
  for (const iterator of document.itens) {
    const product = await Product.findOne({ _id: iterator.product._id });

    product.stock -= iterator.quantity;

    await product.save();
  }
});

module.exports = mongoose.model('Sale', SaleSchema);
