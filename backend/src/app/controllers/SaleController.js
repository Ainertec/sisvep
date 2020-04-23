const Sale = require('../models/Sale');

module.exports = {
  async store(req, res) {
    const { itens, payment, total } = req.body;
    const userId = req.userId;

    const sale = await Sale.create({
      itens,
      payment,
      total,
      functionary: userId,
    });

    await sale.populate('itens.product').populate('functionary').execPopulate();

    return res.json(sale);
  },
};
