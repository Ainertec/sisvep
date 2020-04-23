const faker = require('faker');
const { factory } = require('factory-girl');
const Product = require('../src/app/models/Product');
const Provider = require('../src/app/models/Provider');
const User = require('../src/app/models/User');
const Sale = require('../src/app/models/Sale');

const getId = async () => {
  const product = await factory.create('Product', {
    stock: 12,
  });
  return product._id;
};

factory.define('Product', Product, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  price: faker.commerce.price(),
  cost: faker.commerce.price(),
  barcode: faker.random.number(100),
  validity: faker.date.future(),
  stock: faker.random.number(20),
});

factory.define('Provider', Provider, {
  name: faker.commerce.productName(),
  description: faker.commerce.productAdjective(),
  phone: faker.phone.phoneNumber(),
  email: faker.internet.email(),
  identification: faker.name.title(),
  products: getId(),
});

factory.define('User', User, {
  name: faker.name.findName(),
  password: faker.internet.password(),
  question: 'Qual o modelo do seu primeiro carro?',
  response: faker.lorem.words(3),
  admin: true,
});

factory.define('Sale', Sale, {
  itens: { product: getId(), quantity: faker.random.number(10) },
  total: faker.commerce.price(),
  payment: 'dinheiro',
});

module.exports = factory;
