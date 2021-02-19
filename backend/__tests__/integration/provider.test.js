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

    expect(response.status).toBe(400);
  });
  it('should update a provider', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product');
    const provider = await factory.create('Provider');

    const productsArray = provider.products;
    productsArray.push(product._id);

    const response = await request(app)
      .put('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: String(provider._id),
      })
      .send({
        name: 'Cleiton',
        description: provider.description,
        phone: provider.phone,
        email: 'cleitnbaloneker@gmail.com',
        identification: provider.identification,
        products: productsArray,
      });
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
    expect(response.status).toBe(200);
  });
  it('should not update a provider with invalid id', async () => {
    const user = await factory.create('User');
    const provider = await factory.create('Provider');

    const response = await request(app)
      .put('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: '122321435',
      })
      .send({
        name: 'Cleiton',
        description: provider.description,
        phone: provider.phone,
        email: 'cleitnbaloneker@gmail.com',
        identification: provider.identification,
        products: provider.products,
      });
    expect(response.status).toBe(400);
  });
  it('should not update a provider with invalid products ids', async () => {
    const user = await factory.create('User');
    const provider = await factory.create('Provider');

    const response = await request(app)
      .put('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: '122321435',
      })
      .send({
        name: 'Cleiton',
        description: provider.description,
        phone: provider.phone,
        email: 'cleitnbaloneker@gmail.com',
        identification: provider.identification,
        products: ['aadsda123s'],
      });
    expect(response.status).toBe(400);
  });
  it('should delete a provider', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      stock: 0,
    });
    const provider = await factory.create('Provider', {
      products: product._id,
    });

    const response = await request(app)
      .delete(`/providers/${provider._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const deletedProvider = await Provider.findOne({});
    expect(deletedProvider).toBe(null);
    expect(response.status).toBe(200);
  });
  it('should delete a provider without products', async () => {
    const user = await factory.create('User');
    const provider = await factory.create('Provider', {
      products: [],
    });

    const response = await request(app)
      .delete(`/providers/${provider._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const deletedProvider = await Provider.findOne({});
    expect(deletedProvider).toBe(null);
    expect(response.status).toBe(200);
  });
  it('should not delete a provider with invalid id', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .delete(`/providers/${'afsjb15'}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should not delete a provider with products with stock != 0', async () => {
    const user = await factory.create('User');

    const product = await factory.create('Product', {
      stock: 12,
    });
    const provider = await factory.create('Provider', {
      products: product._id,
    });
    const response = await request(app)
      .delete(`/providers/${provider._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(401);
  });
  it('should not delete a provider with inexistent provider', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .delete(`/providers/${'5e9f6c9bc91740083c5c4d98'}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(404);
  });

  // LIST

  it('should list all providers', async () => {
    const user = await factory.create('User');
    const provider = await factory.create('Provider');
    await factory.create('Provider', {
      name: 'Cleiton',
    });

    const response = await request(app)
      .get('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: provider.name,
        }),
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ])
    );
  });
  it('should list providers by name', async () => {
    const user = await factory.create('User');
    await factory.create('Provider', {
      name: 'Cleiton',
    });

    const response = await request(app)
      .get('/providers_by_name')
      .query({
        name: 'Cleiton',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ])
    );
  });
});
