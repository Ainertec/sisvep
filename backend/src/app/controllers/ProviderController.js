const mongoose = require('mongoose');
const Provider = require('../models/Provider');
const Product = require('../models/Product');

const verifyId = (products) => {
  let hasInvalidId = false;
  products.map((product) => {
    const isValid = mongoose.Types.ObjectId.isValid(product);
    if (!isValid) {
      hasInvalidId = true;
      return;
    }
  });
  return hasInvalidId;
};

module.exports = {
  async store(req, res) {
    const { name, description, phone, email, identification, products } = req.body;

    if (verifyId(products)) {
      return res.status(400).json({ message: `invalid product id` });
    }
    const provider = await Provider.create({
      name,
      description,
      phone,
      email,
      identification,
      products,
    });
    await provider.populate('products').execPopulate();
    return res.json(provider);
  },
};
