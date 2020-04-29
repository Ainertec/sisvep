const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const Product = require('../../src/app/models/Product');
const User = require('../../src/app/models/User');
const Sale = require('../../src/app/models/Sale');
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
    await Sale.deleteMany({});
    await User.deleteMany({});
  });

  it('should list lucre by informated date', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    await factory.createMany('Sale', 3, {
      createdAt: new Date(2020, 0, 1),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 1, 18),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 2, 18),
    });

    const response = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-01-01',
        finalDate: '2020-02-28',
      });
    console.log(response.body);
    expect(response.status).toBe(200);

    // expect(response.body).toHaveProperty('amount');
  });
  it('should not list lucre with invalid dates', async () => {
    const user = await factory.create('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-1-12',
        finalDate: '2020-13',
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });
  it('should not list lucre with invalid dates interval', async () => {
    const user = await factory.create('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/transactions')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-03-12',
        finalDate: '2020-01-24',
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });
  it('should list all the solds products', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const product = await factory.create('Product', {
      name: 'Chocolate',
    });
    const product1 = await factory.create('Product', {
      name: 'Pão',
    });
    const product2 = await factory.create('Product', {
      name: 'biscoito',
    });
    const product3 = await factory.create('Product', {
      name: 'Tomate',
    });

    await factory.create('Sale', {
      itens: [
        {
          product: product._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 3,
        },
      ],
    });
    await factory.create('Sale', {
      itens: [
        {
          product: product1._id,
          quantity: 5,
        },
      ],
    });
    await factory.create('Sale', {
      itens: [
        {
          product: product2._id,
          quantity: 3,
        },
      ],
    });
    await factory.create('Sale', {
      itens: [
        {
          product: product2._id,
          quantity: 2,
        },
      ],
    });
    await factory.create('Sale', {
      itens: [
        {
          product: product3._id,
          quantity: 1,
        },
      ],
    });

    const response = await request(app)
      .get('/transactions_soldouts')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          _id: expect.objectContaining({
            name: 'Pão',
          }),
          soldout: 8,
        }),
      ])
    );
  });
  it('should list solds total by month ', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    await factory.createMany('Sale', 3, {
      createdAt: new Date(2020, 0, 1),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 1, 18),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 2, 18),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 3, 18),
    });

    const response = await request(app)
      .get('/transactions_solds_by_month')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-01-01',
        finalDate: '2020-03-28',
      });
    console.log(response.body);
    expect(response.status).toBe(200);
  });
  it('should not list solds total with invalid dates', async () => {
    const user = await factory.create('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/transactions_solds_by_month')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-1-12',
        finalDate: '2020-13',
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });
  it('should not list solds total with invalid dates interval', async () => {
    const user = await factory.create('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/transactions_solds_by_month')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-03-12',
        finalDate: '2020-01-24',
      });
    console.log(response.body);
    expect(response.status).toBe(400);
  });
  it('should list products percent about solds total', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const product = await factory.create('Product', {
      name: 'Chocolate',
    });
    const product1 = await factory.create('Product', {
      name: 'Pão',
    });
    await factory.createMany('Sale', 3, {
      createdAt: new Date(2020, 0, 1),
      itens: [
        {
          product: product._id,
          quantity: 3,
        },
      ],
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 1, 18),
      itens: [
        {
          product: product._id,
          quantity: 3,
        },
        {
          product: product1._id,
          quantity: 3,
        },
      ],
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 2, 18),
    });
    await factory.createMany('Sale', 2, {
      createdAt: new Date(2020, 3, 18),
    });

    const response = await request(app)
      .get('/transactions_products_total_percent')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    console.log(response.body);
    expect(response.status).toBe(200);
  });
});
