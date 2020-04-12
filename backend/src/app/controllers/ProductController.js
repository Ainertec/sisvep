const Product = require('../models/Product');

module.exports = {
  async show(req, res) {
    return res.status(200).send();
  },

  async index(req, res) {
    const { name } = req.query;

    if (!name) {
      const products = await Product.find({});
      return res.json(products);
    } else {
      const products = await Product.find({
        name: { $regex: new RegExp(name), $options: 'i' },
      });

      return res.json(products);
    }
  },
  async store(req, res) {
    const {
      name,
      description,
      barcode,
      price,
      cost,
      validity,
      stock,
    } = req.body;

    const product = await Product.create({
      name,
      description,
      barcode,
      price,
      cost,
      validity,
      stock,
    });
    if (product) return res.status(200).json(product);
    // return res.status(400).send();
  },
};
