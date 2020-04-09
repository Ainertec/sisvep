const Product = require('../models/Product');

module.exports = {
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
    return res.status(400).send();
  },
};
