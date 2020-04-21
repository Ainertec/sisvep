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
    const providers = await Provider.find();

    return res.json(providers);
  },

  async show(req, res) {
    const { name } = req.query;

    const providers = await Provider.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

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

    await Provider.findOneAndDelete({ _id: id });

    return res.status(200).send();
  },
};
