const request = require('supertest');
const sub = require('date-fns/sub');

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
        itens,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body.sale).toEqual(
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
        itens,
        payment: 'Dinheiro',
        total: 200,
      });
    expect(response.body.sale.itens).toEqual(
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
  it('should allert when products stock are below to 5', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'ovomaltine',
      stock: 6,
    });
    const product2 = await factory.create('Product', {
      name: 'nescal',
      stock: 4,
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
        itens,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body.alerts).toEqual(expect.arrayContaining(['ovomaltine', 'nescal']));
    expect(response.status).toBe(200);
  });
  it('should list all sales', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');
    const product1 = await factory.create('Product');
    const product2 = await factory.create('Product');
    await factory.create('Sale', {
      payment: 'Dinheiro',
      itens: [
        {
          product: product._id,
          quantity: 4,
        },
      ],
    });
    await factory.create('Sale', {
      payment: 'Debito',
      itens: [
        {
          product: product1._id,
          quantity: 4,
        },
      ],
    });
    await factory.create('Sale', {
      payment: 'Credito',

      itens: [
        {
          product: product2._id,
          quantity: 4,
        },
      ],
    });

    const response = await request(app)
      .get('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          payment: 'Dinheiro',
        }),
        expect.objectContaining({
          payment: 'Debito',
        }),
        expect.objectContaining({
          payment: 'Credito',
        }),
      ])
    );
  });
  it('should not list all sales without admin privileges', async () => {
    const user = await factory.create('User', {
      admin: false,
    });
    const response = await request(app)
      .get('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(401);
  });
  it('should list sales by id', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');
    const sale = await factory.create('Sale', {
      payment: 'Dinheiro',
      itens: [
        {
          product: product._id,
          quantity: 4,
        },
      ],
    });

    const response = await request(app)
      .get('/sales_by_id')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: String(sale._id),
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        payment: 'Dinheiro',
      })
    );
  });
  it('should not list sales with invalid id', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .get('/sales_by_id')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: '1223adfasvbnm',
      });

    expect(response.status).toBe(400);
  });

  it('should delete all sales with more then 6 years old', async () => {
    const user = await factory.create('User');
    await factory.createMany('Sale', 3, {
      createdAt: sub(new Date(), { years: 7 }),
    });
    await factory.create('Sale');

    const response = await request(app)
      .delete('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const sales = await Sale.find().count();

    expect(response.status).toBe(200);
    expect(sales).toBe(1);
  });
});
