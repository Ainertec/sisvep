const mongoose = require('mongoose');
const Product = require('../models/Product');

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

    const product = await Product.create({
      name,
      description,
      barcode,
      price,
      cost,
      validity,
      stock,
    });
    return res.status(200).json(product);
    // return res.status(400).send();
  },

  async update(req, res) {
    const { name, description, barcode, price, cost, validity, stock } = req.body;
    const { id } = req.query;
    let _id;

    try {
      _id = mongoose.Types.ObjectId(id);
    } catch (error) {
      return res.status(400).json('Invalid ID.');
    }

    const product = await Product.findByIdAndUpdate(
      { _id },
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
    if (!product) return res.status(400).json('Id does not exist');
    const productUpdated = await Product.findById(_id);
    return res.json(productUpdated);
  },
  async delete(req, res) {
    const { id } = req.query;
    let _id;

    try {
      _id = mongoose.Types.ObjectId(id);
    } catch (error) {
      return res.status(400).json('Invalid ID.');
    }

    await Product.findByIdAndDelete({ _id });
    return res.json('Product deleted.');
  },
};
