const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const Product = require('../../src/app/models/Product');
const User = require('../../src/app/models/User');
const Provider = require('../../src/app/models/Provider');
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
    await Provider.deleteMany({});
    await User.deleteMany({});
  });

  it('shuld create a Product', async () => {
    const provider = await factory.create('Provider');

    const product = await factory.build('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await factory.create('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        providerId: provider._id,
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
    const user = await factory.create('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
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

  it('shuld update a product', async () => {
    const product = await factory.create('Product');
    const provider = await factory.create('Provider', {
      products: [product._id],
    });

    const user = await factory.create('User');

    const response = await request(app)
      .put('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      })
      .query({
        id: String(product._id),
        providerId: String(provider._id),
      });
    const providers = await Provider.findOne().lean();
    console.log('Fornecedores', providers);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
      })
    );
  });
  it('shuld not update a product with a invalid id', async () => {
    const product = await factory.create('Product');
    const user = await factory.create('User');

    const response = await request(app)
      .put('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      })
      .query({
        id: '123as0000012a',
        providerId: '123as0000012a',
      });
    // console.log(response.body);

    expect(response.status).toBe(400);
  });
  it('shuld delete a product', async () => {
    const product = await factory.create('Product');
    const provider = await factory.create('Provider', {
      products: product._id,
    });
    const user = await factory.create('User');
    const response = await request(app)
      .delete('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: String(product._id),
      });
    const providers = await Provider.findOne().lean();
    // console.log(providers);
    expect(response.status).toBe(200);
    expect(providers.products).toEqual([]);
  });

  it('shuld not delete a product whit invalid id', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .delete('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: '123as0000012a',
      });
    expect(response.status).toBe(400);
  });

  // list

  it('shuld list products by name ', async () => {
    const user = await factory.create('User');
    await factory.create('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });

    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
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
    const user = await factory.create('User');
    await factory.create('Product', {
      name: 'Pão',
      description: 'Bão de mais',
    });
    await factory.create('Product', {
      name: 'Ovo',
      description: 'Bão de mais',
    });

    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query();
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pão',
        }),
        expect.objectContaining({
          name: 'Ovo',
        }),
      ])
    );
  });

  it('shuld list products by validity ', async () => {
    const user = await factory.create('User');
    await factory.create('Product', {
      name: 'Pão',
      validity: new Date(2020, 1, 8),
    });

    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-02',
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Pão',
        }),
      ])
    );
  });
  it('shuld not list products without month informated ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020',
      });
    expect(response.status).toBe(400);
  });
  it('shuld not list products with month not existent ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-13',
      });
    expect(response.status).toBe(400);
  });
  it('shuld not list products with date unformatade ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '13-02',
      });
    expect(response.status).toBe(400);
  });
  it('shuld not list products with day informated', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-03-23',
      });
    expect(response.status).toBe(400);
  });
  it('shuld list products by barcode ', async () => {
    const user = await factory.create('User');
    await factory.create('Product', {
      name: 'Pão',
      barcode: 12345,
    });
    const response = await request(app)
      .get('/products_barcode')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        barcode: 12345,
      });
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Pão',
      })
    );
  });
});
