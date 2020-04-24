const mongoose = require('mongoose');
const Product = require('../models/Product');
const Provider = require('../models/Provider');

module.exports = {
  async showByBarcode(req, res) {
    const { barcode } = req.query;
    const product = await Product.findOne({ barcode });
    return res.json(product);
  },

  async show(req, res) {
    const { date } = req.query;
    const dateArray = date.split('-');
    const dateLength = String(dateArray[0]);

    if (!dateArray[1]) return res.status(400).json('month does not informated!');

    if (dateArray[1] <= 0 || dateArray[1] >= 13)
      return res.status(400).json('month does not exist!');

    if (dateArray[2]) return res.status(400).json('asas');

    if (dateLength.length !== 4) return res.status(400).json('Date formate incorret');

    const products = await Product.find({
      validity: { $gte: `${date} 1`, $lte: `${date} 31` },
    });
    return res.json(products);
  },

  async index(req, res) {
    const { name } = req.query;

    if (!name) {
      const products = await Product.find({});
      return res.json(products);
    }
    const products = await Product.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    return res.json(products);
  },
  async store(req, res) {
    const { name, description, barcode, price, cost, validity, stock } = req.body;
    const { providerId } = req.body;

    const product = await Product.create({
      name,
      description,
      barcode,
      price,
      cost,
      validity,
      stock,
    });
    if (providerId) {
      if (!mongoose.Types.ObjectId.isValid(providerId)) {
        return res.status(400).json({ message: `invalid provider id` });
      }
      await Provider.findOneAndUpdate(
        { _id: providerId },
        { $addToSet: { products: product._id } }
      );
    }

    return res.status(200).json(product);
  },
  async update(req, res) {
    const { name, description, barcode, price, cost, validity, stock } = req.body;
    const { id, providerId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid product id` });
    }

    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      return res.status(400).json({ message: `invalid provider id` });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        barcode,
        price,
        cost,
        validity,
        stock,
      }
    );
    if (!product) return res.status(400).json('product does not exist');

    const productUpdated = await Product.findOne({ _id: id });

    await Provider.findOneAndUpdate(
      { _id: providerId },
      { $addToSet: { products: productUpdated._id } }
    );

    // const provider = await Provider.findOne({ _id: providerId });
    // await provider.populate('products').execPopulate();
    // console.log(provider);

    return res.json(productUpdated);
  },
  async delete(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid product id` });
    }

    await Product.findOneAndRemove({ _id: id });
    return res.json('Product deleted.');
  },
};
