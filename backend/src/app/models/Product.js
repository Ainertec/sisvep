const mongoose = require('mongoose');
const Provider = require('./Provider');

const ProductSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    description: {
      type: String,
    },
    price: {
      type: Number,
      required: true,
    },
    cost: {
      type: Number,
      required: true,
    },
    barcode: {
      type: Number,
      required: true,
    },
    validity: {
      type: Date,
      required: true,
    },
    stock: {
      type: Number,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

ProductSchema.pre('findOneAndRemove', function (next) {
  console.log('Fala meu Bruxo!!!!');

  Provider.update(
    { products: this._id },
    { $pull: { products: this._id } },
    { multi: true }
  ).exec();
  next();
});

module.exports = mongoose.model('Product', ProductSchema);
