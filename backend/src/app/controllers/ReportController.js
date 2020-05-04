const isBefore = require('date-fns/isBefore');
const isValid = require('date-fns/isValid');
const parseISO = require('date-fns/parseISO');
const Provider = require('../models/Provider');
const Sale = require('../models/Sale');

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
          price: '$products.price',
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

    return res.json(sales);
  },
  async soldsProductsPercent(req, res) {
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
          price: '$products.price',
          stock: '$products.stock',
          validity: '$products.validity',
        },
        soldout: { $sum: '$itens.quantity' },
      })
      .sort({ soldout: -1 });

    const totalProducts = products.reduce((sum, product) => {
      return sum + product.soldout;
    }, 0);

    const productsPecent = products.map((product) => {
      const newProduct = product;
      newProduct.soldout = ((product.soldout / totalProducts) * 100).toFixed(2);
      return newProduct;
    });

    return res.json(productsPecent);
  },
  async amountProductsPercent(req, res) {
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
          price: '$products.price',
          description: '$products.description',
          stock: '$products.stock',
          validity: '$products.validity',
        },
        soldout: { $sum: { $multiply: ['$itens.quantity', '$products.price'] } },
      })
      .sort({ soldout: -1 });

    const totalProducts = products.reduce((sum, product) => {
      return sum + product.soldout;
    }, 0);

    const productsPercent = products.map((product) => {
      const newProduct = product;
      newProduct.soldout = ((product.soldout / totalProducts) * 100).toFixed(2);
      return newProduct;
    });

    return res.json(productsPercent);
  },
  async providersProducts(req, res) {
    const providers = await Provider.aggregate()
      .addFields({
        totalProducts: { $size: '$products' },
      })
      .sort({ total: -1 });

    return res.json(providers);
  },
  async salesAmount(req, res) {
    const sales = await Sale.find();

    const totalSales = sales.reduce((sum, sale) => {
      return sum + sale.total;
    }, 0);

    return res.json({ total: totalSales.toFixed(2) });
  },
};
