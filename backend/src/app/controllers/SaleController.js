const Sale = require('../models/Sale');
const mongoose = require('mongoose');

module.exports = {
  async show(req, res) {
    const { id } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid provider id` });
    }

    const sale = await Sale.findOne({ _id: id });

    return res.json(sale);
  },
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