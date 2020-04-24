const mongoose = require('mongoose');
const Provider = require('../models/Provider');

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
  async index(req, res) {
    const providers = await Provider.find().populate({ path: 'products' });

    return res.json(providers);
  },
  async show(req, res) {
    const { name } = req.query;

    const providers = await Provider.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    }).populate({ path: 'products' });

    return res.json(providers);
  },
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
  async update(req, res) {
    const { name, description, phone, email, identification, products } = req.body;

    const { id } = req.query;

    if (verifyId(products)) {
      return res.status(400).json({ message: `invalid product id` });
    }

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid provider id` });
    }

    const provider = await Provider.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        phone,
        email,
        identification,
        products,
      },
      { new: true }
    );

    await provider.populate('products').execPopulate();

    return res.json(provider);
  },
  async delete(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid provider id` });
    }

    const provider = await Provider.findOne({ _id: id });

    if (!provider) {
      return res.status(404).json({ message: 'Provider does not exist' });
    }

    await provider.populate('products').execPopulate();

    let hasProductInStock = false;

    for (const iterator of provider.products) {
      if (iterator.stock != 0) {
        hasProductInStock = true;
        break;
      }
    }
    if (hasProductInStock) {
      return res.status(401).json({ message: `You have producs in stock for ${provider.name} ` });
    }
    await Provider.deleteOne({ _id: provider._id });

    return res.status(200).send();
  },
};
