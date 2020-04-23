const Sale = require('../models/Sale');

module.exports = {
  async index(req, res) {
    const sales = await Sale.find();

    return res.json(sales);
  },
  async store(req, res) {
    const { itens, payment, total } = req.body;
    const userId = req.userId;
    const alerts = [];

    const sale = await Sale.create({
      itens,
      payment,
      total,
      functionary: userId,
    });

    await sale.populate('itens.product').populate('functionary').execPopulate();

    sale.itens.map((item) => {
      if (item.product.stock <= 5) {
        alerts.push(item.product.name);
      }
    });

    return res.json({
      sale,
      alerts: alerts.length === 0 ? false : alerts,
    });
  },
};
