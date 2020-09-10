/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';

describe('Create provider tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should create a sale', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product');
    const product2 = await getFactory<Product>('Product');

    const items = [
      {
        product: product.id,
        quantity: 4,
      },
      {
        product: product2.id,
        quantity: 2,
      },
    ];

    const response = await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        items,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body.sale).toEqual(
      expect.objectContaining({
        payment: 'Dinheiro',
      }),
    );
    expect(response.status).toBe(201);
  });

  it('should decrement a products stock', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'ovomaltine',
      stock: 15,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'nescal',
      stock: 16,
    });

    const items = [
      {
        product: product.id,
        quantity: 4,
      },
      {
        product: product2.id,
        quantity: 2,
      },
    ];

    const response = await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        items,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body.sale.itemsSale).toEqual(
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
      ]),
    );
    expect(response.status).toBe(201);
  });

  it('should alert when products stock are below to 5', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product', {
      name: 'ovomaltine',
      stock: 6,
    });
    const product2 = await getFactory<Product>('Product', {
      name: 'nescal',
      stock: 4,
    });

    const items = [
      {
        product: product.id,
        quantity: 4,
      },
      {
        product: product2.id,
        quantity: 2,
      },
    ];

    const response = await request(app)
      .post('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        items,
        payment: 'Dinheiro',
        total: 200,
      });

    expect(response.body.alerts).toEqual(
      expect.arrayContaining(['ovomaltine', 'nescal']),
    );
    expect(response.status).toBe(201);
  });
});
