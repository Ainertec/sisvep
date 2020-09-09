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
  it('shuld create a Product without providerId', async () => {
    const product = await factory.build('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await factory.create('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
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
  it('shuld not create a Product with invalid provider id', async () => {
    const product = await factory.build('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await factory.create('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'pão',
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
        providerId: 'qwertwas',
      });

    expect(response.status).toBe(400);
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
  // //////////////////////////////////////////////////////////////////
  it('shuld update a product', async () => {
    const product = await factory.create('Product');
    const provider = await factory.create('Provider', {
      products: [product._id],
    });
    const provider2 = await factory.create('Provider');

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
        providerId: String(provider2._id),
      });
    const providerWithoutProduct = await Provider.findOne({
      _id: provider._id,
    });
    const providerProductsSize = providerWithoutProduct.products.length;
    expect(providerProductsSize).toBe(0);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
      }),
    );
  });
  it('shuld not update a product unixestent', async () => {
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
        id: String(provider._id),
        providerId: String(product._id),
      });
    expect(response.status).toBe(400);
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
  it('shuld not update a product with a invalid provider id', async () => {
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
        id: String(product._id),
        providerId: '123as0000012a',
      });

    expect(response.status).toBe(400);
  });
  /// /////////////////////////////////////////////////
  it('shuld delete a product', async () => {
    const product = await factory.create('Product');
    await factory.create('Provider', {
      products: product._id,
    });

    const user = await factory.create('User');
    const response = await request(app)
      .delete(`/products/${product._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const providers = await Provider.findOne().lean();

    expect(response.status).toBe(200);
    expect(providers.products).toEqual([]);
  });
  it('shuld not delete an unexistent product', async () => {
    const product = await factory.create('Product');
    const provider = await factory.create('Provider', {
      products: product._id,
    });

    const user = await factory.create('User');
    const response = await request(app)
      .delete(`/products/${provider._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const providers = await Provider.findOne().lean();

    expect(response.status).toBe(200);
    expect(providers.products).toEqual([product._id]);
  });
  it('shuld not delete a product whit invalid id', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .delete('/products/123as0000012a')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
  // list

  it('shuld list products by name ', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });

    const product2 = await factory.create('Product', {
      name: 'Chamito',
      description: 'Bão de mais',
    });
    await factory.create('Provider', {
      products: [product._id, product2._id],
    });

    await factory.createMany('Provider', 2);

    const response = await request(app)
      .get('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({ name: 'Choc' });

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Chocolate',
        }),
      ]),
    );
  });
  it('shuld list products by validity ', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'Agrião',
      validity: new Date(2020, 2, 8),
    });

    await factory.create('Provider', {
      products: [product._id],
    });
    await factory.createMany('Provider', 2);

    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-03',
      });

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Agrião',
        }),
      ]),
    );
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
  it('shuld not list products with date unformatad ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_validity')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '13-02',
      });
    expect(response.status).toBe(400);
  });
  it('shuld list products by barcode ', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'Pão',
      barcode: 12345,
    });
    await factory.create('Provider', {
      products: [product._id],
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
      }),
    );
  });
  it('shuld list products without provider by barcode ', async () => {
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
      }),
    );
  });

  it('shuld list products by createdAt ', async () => {
    const user = await factory.create('User');
    const product = await factory.create('Product', {
      name: 'Tomate',
      createdAt: new Date(2020, 2, 8),
    });
    await factory.create('Provider', {
      products: [product._id],
    });
    await factory.createMany('Provider', 2);

    const response = await request(app)
      .get('/products_created_date')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-03',
      });
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Tomate',
        }),
      ]),
    );
  });
  it('shuld not list products by created with month not existent ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_created_date')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '2020-13',
      });
    expect(response.status).toBe(400);
  });
  it('shuld not list products by created with date unformatad ', async () => {
    const user = await factory.create('User');
    const response = await request(app)
      .get('/products_created_date')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        date: '13-02',
      });
    expect(response.status).toBe(400);
  });
});
