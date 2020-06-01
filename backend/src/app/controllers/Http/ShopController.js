const Shop = require('../../models/Shop');

module.exports = {
  async index(req, res) {
    const shop = await Shop.findOne();
    return res.json(shop);
  },
  async store(req, res) {
    const shopData = req.body;

    const count = await Shop.countDocuments();

    if (count !== 0) {
      return res.status(401).json({ message: 'Aready exist a shop' });
    }

    const shop = await Shop.create(shopData);

    return res.json(shop);
  },
  async update(req, res) {
    // const { name, identification, phone, email, address } = req.body;
    const shopData = req.body;
    const { id } = req.query;

    const shop = await Shop.findOneAndUpdate({ _id: id }, shopData, { new: true });

    return res.json(shop);
  },
};
