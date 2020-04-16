const faker = require('faker');
const { factory } = require('factory-girl');
const Product = require('../src/app/models/Product');
const User = require('../src/app/models/User');

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  barcode: faker.random.number(100),
  validity: faker.date.future(),
  stock: faker.random.number(20),
});
factory.define('User', User, {
  name: faker.name.findName(),
  password: faker.internet.password(),
  question: faker.lorem.word(),
  response: faker.lorem.words(3),
  admin: true,
});

module.exports = factory;
