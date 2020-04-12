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
      // name: 'pão',
      description: product.description,
      price: product.price,
      cost: product.cost,
      barcode: product.barcode,
      validity: product.validity,
      stock: product.stock,
    });

    expect(response.status).toBe(400);
  });

  it('shuld list products by name ', async () => {
    await factory.create('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    await factory.create('Product', {
      name: 'Queijo',
      description: 'Bão de mais',
    });

    const response = await request(app)
      .get('/products')
      .query({ name: 'Chocolate' });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Chocolate',
        }),
      ])
    );
  });
  it('shuld list all products ', async () => {
    await factory.create('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    await factory.create('Product', {
      name: 'Pão',
      description: 'Bão de mais',
    });
    await factory.create('Product', {
      name: 'Ovo',
      description: 'Bão de mais',
    });

    const response = await request(app).get('/products').query();
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pão',
        }),
      ])
    );
  });
  it('shuld list products by validity ', async () => {
    await factory.create('Product', {
      name: 'Chocolate',
      validity: new Date(2020, 1, 8),
    });
    await factory.create('Product', {
      name: 'Pão',
      validity: new Date(2020, 1, 8),
    });
    await factory.create('Product', {
      name: 'Ovo',
      validity: new Date(2022, 1, 8),
    });

    const response = await request(app).get('/products_validity').query({
      date: '01,2020',
    });
    console.log(response.body);
    //
    expect(response.status).toBe(200);
  });
});
