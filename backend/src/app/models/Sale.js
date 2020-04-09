const mongoose = require('mongoose');

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

mongoose.model('Item', ItemSchema);
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
    },
    // functionary: {
    //   type: {
    //     type: Schema.Types.ObjectId,
    //     ref: 'Functionary',
    //     required: true,
    //   },
    // },
  },
  {
    timestamps: true,
  }
);

module.exports = mongoose.model('Sale', SaleSchema);
