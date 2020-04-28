const Sale = require('../models/Sale');
const isBefore = require('date-fns/isBefore');
const isValid = require('date-fns/isValid');
const parseISO = require('date-fns/parseISO');

module.exports = {
  async show(req, res) {
    const { initialDate, finalDate } = req.query;
    let amount = 0;

    const initial = parseISO(initialDate);
    const final = parseISO(finalDate);

    if (!isValid(initial) || !isValid(final))
      return res.status(400).json({ message: 'invalid date' });

    if (!isBefore(initial, final)) return res.status(400).json({ message: 'Invalid interval' });

    const sales = await Sale.find({ createdAt: { $gte: initial, $lte: final } });

    sales.map((sale) => {
      amount += sale.total;
    });

    return res.json({
      amount,
      sales,
    });
  },
  async index(req, res) {
    const sales = await Sale.aggregate()
      .unwind('itens')
      .lookup({
        from: 'products',
        localField: 'itens.product',
        foreignField: '_id',
        as: 'products',
      })
      .unwind('products')
      .group({
        _id: {
          id: '$products._id',
          name: '$products.name',
          description: '$products.description',
          stock: '$products.stock',
          validity: '$products.validity',
        },
        soldout: { $sum: '$itens.quantity' },
      })
      .sort({ soldout: -1 });

    return res.json(sales);
  },
};
