const Sale = require('../models/Sale');
const isBefore = require('date-fns/isBefore');
const isValid = require('date-fns/isValid');
const parseISO = require('date-fns/parseISO');

module.exports = {
  async show(req, res) {
    const { initialDate, finalDate } = req.query;

    const initial = parseISO(initialDate);
    const final = parseISO(finalDate);

    if (!isValid(initial) || !isValid(final))
      return res.status(400).json({ message: 'invalid date' });

    if (!isBefore(initial, final)) return res.status(400).json({ message: 'Invalid interval' });

    const sales = await Sale.aggregate()
      .match({
        createdAt: { $gte: initial, $lte: final },
      })
      .group({
        _id: { month: { $month: '$createdAt' } },
        amount: { $sum: '$total' },
      })
      .sort({ amount: -1 });

    return res.json(sales);
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
  async byMonth(req, res) {
    const { initialDate, finalDate } = req.query;

    const initial = parseISO(initialDate);
    const final = parseISO(finalDate);

    if (!isValid(initial) || !isValid(final))
      return res.status(400).json({ message: 'invalid date' });

    if (!isBefore(initial, final)) return res.status(400).json({ message: 'Invalid interval' });

    const sales = await Sale.aggregate()
      .match({
        createdAt: { $gte: initial, $lte: final },
      })
      .group({
        _id: { month: { $month: '$createdAt' } },
        total: { $sum: 1 },
      })
      .sort({ total: -1 });

    console.log(sales);

    return res.json(sales);
  },
  async soldsProductsPercent(req, res) {
    const soldsTotal = await Sale.count();
    const products = await Sale.aggregate()
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
        percent: { $sum: 1 },
      })
      .sort({ soldout: -1 });

    products.map((product) => {
      return (product.percent = (product.percent * 100) / soldsTotal).toFixed(2);
    });
    console.log(products);

    return res.status(200).send();
  },
};
