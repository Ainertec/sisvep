const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const Product = require('../../src/app/models/Product');
const User = require('../../src/app/models/User');
const Provider = require('../../src/app/models/Provider');
const connectionManager = require('../utils/connectionManager');

describe('Provider', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await Product.deleteMany({});
    await Provider.deleteMany({});
    await User.deleteMany({});
  });

  it('should create a provider', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');
    const product2 = await factory.create('Product');

    const response = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'José Aldo',
        description: 'Campeão dos pesados',
        phone: '(22)992726852',
        email: 'cleitnbaloneker@gmail.com',
        identification: '176.963.917-98',
        products: [product._id, product2._id],
      });
    // console.log(response.body);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'José Aldo',
      })
    );
    expect(response.status).toBe(200);
  });
  it('should not create a provider with invalid products', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');

    const response = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'José Aldo',
        description: 'Campeão dos pesados',
        phone: '(22)992726852',
        email: 'cleitnbaloneker@gmail.com',
        identification: '176.963.917-98',
        products: ['qwertsd1234', product._id],
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });
});
