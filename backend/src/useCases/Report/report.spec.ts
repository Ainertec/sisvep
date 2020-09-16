/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';
import { Sale } from '../../entity/Sale';

describe('Create sales tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should list all the sold products', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    await getFactory<Product>('Product', {
      name: 'Chocolate',
      stock: 20,
    });
    const product1 = await getFactory<Product>('Product', {
      name: 'Pão',
      stock: 20,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'biscoito',
      stock: 20,
    });
    const product3 = await getFactory<Product>('Product', {
      name: 'Tomate',
      stock: 20,
    });

    await getFactory<Sale>('Sale');
    const sale1 = await getFactory<Sale>('Sale');
    const sale2 = await getFactory<Sale>('Sale');
    const sale3 = await getFactory<Sale>('Sale');
    await getFactory<Sale>('Sale');

    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product3.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product2.id,
      quantity: 2,
    });
    await getFactory('ItemsSale', {
      sale: sale3.id,
      product: product3.id,
      quantity: 4,
    });

    const response = await request(app)
      .get('/reports')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          products_name: 'Tomate',
          soldout: 9,
        }),
      ]),
    );
  });

  it('should list lucre by informed date', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });

    await getFactory<Product>('Product', {
      name: 'Chocolate',
      stock: 20,
    });
    const product1 = await getFactory<Product>('Product', {
      name: 'Pão',
      stock: 20,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'biscoito',
      stock: 20,
    });
    const product3 = await getFactory<Product>('Product', {
      name: 'Tomate',
      stock: 20,
    });
    const sale1 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    const sale2 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 18),
      total: 30,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 20),
      total: 10,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 10),
      total: 10,
    });
    const sale3 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 2, 18),
    });

    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product3.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product2.id,
      quantity: 2,
    });
    await getFactory('ItemsSale', {
      sale: sale3.id,
      product: product3.id,
      quantity: 4,
    });

    const response = await request(app)
      .get('/reports/lucre/total')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-01-01',
        finalDate: '2020-02-28',
      });

    expect(response.status).toBe(200);
  });

  it('should not list lucre with invalid dates', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/reports/lucre/total')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-1-12',
        finalDate: '2020-13',
      });
    expect(response.status).toBe(400);
  });

  it('should not list lucre with invalid dates interval', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });

    const response = await request(app)
      .get('/reports/lucre/total')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        initialDate: '2020-03-12',
        finalDate: '2020-01-24',
      });
    expect(response.status).toBe(400);
  });

  it('should list products percent about sold products total', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      stock: 20,
    });
    const product1 = await getFactory<Product>('Product', {
      name: 'Pão',
      stock: 20,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'biscoito',
      stock: 20,
    });
    const product3 = await getFactory<Product>('Product', {
      name: 'Tomate',
      stock: 20,
    });
    const sale1 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    const sale2 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 18),
      total: 30,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 20),
      total: 10,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 10),
      total: 10,
    });
    const sale3 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 2, 18),
    });

    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product3.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product2.id,
      quantity: 2,
    });
    await getFactory('ItemsSale', {
      sale: sale3.id,
      product: product3.id,
      quantity: 4,
    });

    const response = await request(app)
      .get('/reports/products/total/percent')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          products_name: 'Chocolate',
        }),
      ]),
    );
  });

  it('should list products percent about sold products amount', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      stock: 20,
    });
    const product1 = await getFactory<Product>('Product', {
      name: 'Pão',
      stock: 20,
      price: 5,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'biscoito',
      stock: 20,
    });
    const product3 = await getFactory<Product>('Product', {
      name: 'Tomate',
      stock: 20,
    });
    const sale1 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 0, 1),
      total: 50,
    });
    const sale2 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 18),
      total: 30,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 20),
      total: 10,
    });
    await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 1, 10),
      total: 10,
    });
    const sale3 = await getFactory<Sale>('Sale', {
      createdAt: new Date(2020, 2, 18),
    });

    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product1.id,
      quantity: 7,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product3.id,
      quantity: 5,
    });
    await getFactory('ItemsSale', {
      sale: sale2.id,
      product: product2.id,
      quantity: 2,
    });
    await getFactory('ItemsSale', {
      sale: sale3.id,
      product: product3.id,
      quantity: 4,
    });

    const response = await request(app)
      .get('/reports/products/amount/percent')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          products_name: 'Pão',
          // soldout: '2.04',
        }),
      ]),
    );
  });

  it('should list all providers products', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const product = await getFactory('Product', {
      name: 'Chocolate',
    });
    const product1 = await getFactory('Product', {
      name: 'Pão',
    });
    const product2 = await getFactory('Product', {
      name: 'Presunto',
    });
    const product3 = await getFactory('Product', {
      name: 'Presunto',
    });
    const product4 = await getFactory('Product', {
      name: 'Presunto',
    });
    const product5 = await getFactory('Product', {
      name: 'Presunto',
    });

    await getFactory('Provider', {
      products: [product4],
      name: 'Josival',
    });
    await getFactory('Provider', {
      products: [product, product1, product3],
      name: 'Jão',
    });
    await getFactory('Provider', {
      products: [product2, product5],
      name: 'Jovitral',
    });

    const response = await request(app)
      .get('/reports/providers/products')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          total_products: 2,
        }),
      ]),
    );
  });

  it('should return the sales amount', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    await getFactory('Sale');
    await getFactory('Sale');
    await getFactory('Sale');
    await getFactory('Sale');
    await getFactory('Sale');
    await getFactory('Sale');

    const response = await request(app)
      .get('/reports/sales/total')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toHaveProperty('total');
  });
});
