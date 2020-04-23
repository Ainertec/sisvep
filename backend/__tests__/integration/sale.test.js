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

  it('should create a sale', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');
    const product2 = await factory.create('Product');

    const itens = [
      {
        product: product._id,
        quantity: 4,
      },
      {
        product: product2._id,
        quantity: 2,
      },
    ];

    const response = await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        itens: itens,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        payment: 'Dinheiro',
      })
    );
    expect(response.status).toBe(200);
  });
  it('should decrement a products stock', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'ovomaltine',
      stock: 15,
    });
    const product2 = await factory.create('Product', {
      name: 'nescal',
      stock: 16,
    });

    const itens = [
      {
        product: product._id,
        quantity: 4,
      },
      {
        product: product2._id,
        quantity: 2,
      },
    ];

    const response = await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        itens: itens,
        payment: 'Dinheiro',
        total: 200,
      });

    console.log(response.body.itens);
    expect(response.body.itens).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          product: expect.objectContaining({
            name: 'ovomaltine',
            stock: 11,
          }),
        }),
        expect.objectContaining({
          product: expect.objectContaining({ name: 'nescal', stock: 14 }),
        }),
      ])
    );
    expect(response.status).toBe(200);
  });
});
