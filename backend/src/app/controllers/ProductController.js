const mongoose = require('mongoose');
const parseISO = require('date-fns/parseISO');
const isValid = require('date-fns/isValid');
const endOfMonth = require('date-fns/endOfMonth');
const startOfMonth = require('date-fns/startOfMonth');
const Product = require('../models/Product');
const Provider = require('../models/Provider');

const informationsProdutsProviders = () => {
  return {
    _id: '$products_all._id',
    name: '$products_all.name',
    price: '$products_all.price',
    cost: '$products_all.cost',
    barcode: '$products_all.barcode',
    validity: '$products_all.validity',
    stock: '$products_all.stock',
    description: '$products_all.description',
    createdAt: '$products_all.createdAt',
    updatedAt: '$products_all.updatedAt',
    provider: {
      _id: '$_id',
      name: '$name',
      identification: '$identification',
      phone: '$phone',
      email: '$email',
    },
  };
};

module.exports = {
  async showByBarcode(req, res) {
    const { barcode } = req.query;

    const product = await Product.findOne({ barcode }).lean();

    const provider = await Provider.findOne({ products: [product._id] }).lean();

    product.provider = {
      _id: provider._id,
      name: provider.name,
      identificarion: provider.identification,
      phone: provider.phone,
      emial: provider.email,
    };

    return res.json(product);
  },
  async show(req, res) {
    const { date } = req.query;

    const initial = startOfMonth(parseISO(date));
    const final = endOfMonth(initial);

    if (!isValid(initial)) {
      return res.status(400).json({ message: 'invalid date' });
    }

    const products = await Provider.aggregate()
      .unwind('products')
      .lookup({
        from: 'products',
        localField: 'products',
        foreignField: '_id',
        as: 'products_all',
      })
      .unwind('products_all')
      .match({
        'products_all.validity': { $gte: initial, $lte: final },
      })
      .project(informationsProdutsProviders());

    return res.json(products);
  },
  async showByCreated(req, res) {
    const { date } = req.query;

    const initial = startOfMonth(parseISO(date));
    const final = endOfMonth(initial);

    if (!isValid(initial)) {
      return res.status(400).json({ message: 'invalid date' });
    }
    const products = await Provider.aggregate()
      .unwind('products')
      .lookup({
        from: 'products',
        localField: 'products',
        foreignField: '_id',
        as: 'products_all',
      })
      .unwind('products_all')
      .match({
        'products_all.createdAt': { $gte: initial, $lte: final },
      })
      .project(informationsProdutsProviders());

    return res.json(products);
  },
  async index(req, res) {
    const { name } = req.query;

    const products = await Provider.aggregate()
      .unwind('products')
      .lookup({
        from: 'products',
        localField: 'products',
        foreignField: '_id',
        as: 'products_all',
      })
      .unwind('products_all')
      .match({
        'products_all.name': { $regex: new RegExp(name), $options: 'i' },
      })
      .project(informationsProdutsProviders());

    return res.json(products);
  },
  async store(req, res) {
    const { name, description, barcode, price, cost, validity, stock } = req.body;
    const { providerId } = req.body;

    const product = await Product.create({
      name,
      description,
      barcode,
      price,
      cost,
      validity,
      stock,
    });
    if (providerId) {
      if (!mongoose.Types.ObjectId.isValid(providerId)) {
        return res.status(400).json({ message: `invalid provider id` });
      }
      await Provider.findOneAndUpdate(
        { _id: providerId },
        { $addToSet: { products: product._id } }
      );
    }

    return res.status(200).json(product);
  },
  async update(req, res) {
    const { name, description, barcode, price, cost, validity, stock } = req.body;
    const { id, providerId } = req.query;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid product id` });
    }

    if (!mongoose.Types.ObjectId.isValid(providerId)) {
      return res.status(400).json({ message: `invalid provider id` });
    }

    const product = await Product.findOneAndUpdate(
      { _id: id },
      {
        name,
        description,
        barcode,
        price,
        cost,
        validity,
        stock,
      }
    );
    if (!product) return res.status(400).json('product does not exist');

    const productUpdated = await Product.findOne({ _id: id });

    await Provider.findOneAndUpdate(
      { _id: providerId },
      { $addToSet: { products: productUpdated._id } }
    );

    return res.json(productUpdated);
  },
  async delete(req, res) {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid product id` });
    }

    await Product.findOneAndRemove({ _id: id });
    return res.json('Product deleted.');
  },
};
