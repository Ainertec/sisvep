const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const Product = require('../../src/app/models/Product');
const connectionManager = require('../utils/connectionManager');

describe('teste Product', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await Product.deleteMany({});
  });

  it('shuld create a Product', async () => {
    const product = await factory.build('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });

    const response = await request(app).post('/products').send({
      name: 'Muzarela',
      description: product.description,
      price: product.price,
      cost: product.cost,
      barcode: product.barcode,
      validity: product.validity,
      stock: product.stock,
    });

    expect(response.status).toBe(200);
  });

  it('shuld not create a Product with invalid params', async () => {
    const product = await factory.build('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });

    const response = await request(app).post('/products').send({
      name: 'pão',
      description: product.description,
      price: product.price,
      cost: product.cost,
      barcode: product.barcode,
      validity: product.validity,
      stock: product.stock,
    });

    expect(response.status).toBe(200);
  });
});
