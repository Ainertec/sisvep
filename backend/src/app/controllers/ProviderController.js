const Provider = require('../models/Provider');
const Product = require('../models/Product');

module.exports = {
  async store(req, res) {
    const { name, description, phone, email, identification, products } = req.body;
    // const product = await Product.find({ _id: { $in: [products] } });
    // console.log(product);
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
