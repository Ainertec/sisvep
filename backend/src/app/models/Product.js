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

ProductSchema.post('findOneAndRemove', (document) => {
  const productId = document._id;
  Provider.find({ products: { $in: [productId] } }).then((providers) => {
    Promise.all(
      providers.map((provider) =>
        Provider.findOneAndUpdate(
          { _id: provider._id },
          { $pull: { products: productId } },
          { new: true }
        )
      )
    );
  });
});

module.exports = mongoose.model('Product', ProductSchema);
