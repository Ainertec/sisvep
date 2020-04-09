const faker = require('faker');
const { factory } = require('factory-girl');
const Product = require('../src/app/models/Product');

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  barcode: faker.random.number(100),
  validity: faker.date.future(),
  stock: faker.random.number(20),
});

module.exports = factory;
