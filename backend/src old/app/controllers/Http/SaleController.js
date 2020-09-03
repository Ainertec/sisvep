const sub = require('date-fns/sub');
const Sale = require('../../models/Sale');

module.exports = {
  async show(req, res) {
    const { id } = req.query;

    const sale = await Sale.findOne({ _id: id })
      .populate('itens.product')
      .populate({ path: 'functionary', select: 'name' });

    return res.json(sale);
  },
  async index(req, res) {
    const sales = await Sale.find()
      .populate('itens.product')
      .populate({ path: 'functionary', select: 'name' });

    return res.json(sales);
  },
  async store(req, res) {
    const { itens, payment, total } = req.body;
    const { userId } = req;
    const alerts = [];

    const sale = await Sale.create({
      itens,
      payment,
      total,
      functionary: userId,
    });

    await sale.populate('itens.product').populate('functionary').execPopulate();

    sale.itens.forEach((item) => {
      if (item.product.stock <= 5) {
        alerts.push(item.product.name);
      }
    });

    sale.functionary.password_hash = undefined;
    sale.functionary.response = undefined;
    sale.functionary.question = undefined;

    return res.json({
      sale,
      alerts: alerts.length === 0 ? false : alerts,
    });
  },
  async delete(req, res) {
    const date = sub(new Date(), { years: 7 });

    await Sale.deleteMany({
      createdAt: { $lte: date },
    });

    return res.status(200).send();
  },
};
