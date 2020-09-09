/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

import { Product } from '../../entity/Product';

describe('Delete product tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should list products by name ', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'Chamito',
      description: 'Bão de mais',
    });
    await getFactory('Provider', {
      products: [product, product2],
    });
    await getFactory('Provider');
    const response = await request(app)
      .get(`/products/choc`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Chocolate',
        }),
      ]),
    );
  });

  it('should list products by validity ', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'Agrião',
      validity: new Date(2020, 2, 8),
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'Tomate',
      validity: new Date(2020, 5, 8),
    });

    await getFactory('Provider', {
      products: [product, product2],
    });

    const response = await request(app)
      .get('/products/validity/2020-03')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Agrião',
        }),
      ]),
    );
  });

  it('should not list products with month not existent ', async () => {
    const user = await getFactory<User>('User');
    const response = await request(app)
      .get('/products/validity/2020-13')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('sh0uld not list products with date unformatted ', async () => {
    const user = await getFactory<User>('User');
    const response = await request(app)
      .get('/products/validity/13-02')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should list products by barcode ', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'Pão',
      barcode: 12345,
    });
    await getFactory('Provider', {
      products: [product],
    });
    const response = await request(app)
      .get('/products/barcode/12345')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Pão',
      }),
    );
  });

  it('should list products without provider by barcode ', async () => {
    const user = await getFactory<User>('User');
    await getFactory<Product>('Product', {
      name: 'Pão',
      barcode: 12345,
    });
    const response = await request(app)
      .get('/products/barcode/12345')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Pão',
      }),
    );
  });

  it('should list products by createdAt ', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'Tomate',
      createdAt: new Date(2020, 2, 8),
    });
    await getFactory('Provider', {
      products: [product],
    });

    const response = await request(app)
      .get('/products/created/2020-03')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Tomate',
        }),
      ]),
    );
  });

  it('should not list products by created with month not existent ', async () => {
    const user = await getFactory<User>('User');
    const response = await request(app)
      .get('/products/created/2020-13')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not list products by created with date unformatted ', async () => {
    const user = await getFactory<User>('User');
    const response = await request(app)
      .get('/products/created/13-02')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
