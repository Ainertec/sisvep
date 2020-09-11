/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { sub } from 'date-fns';
import { getRepository } from 'typeorm';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';

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

  it('should delete all sales with more then 6 years old', async () => {
    const user = await getFactory<User>('User');
    await getFactory('Sale', {
      createdAt: sub(new Date(2020, 8, 4), { years: 7 }),
    });
    await getFactory('Sale', {
      createdAt: sub(new Date(2017, 8, 10), { years: 7 }),
    });
    await getFactory('Sale', {
      createdAt: sub(new Date(2019, 2, 10), { years: 7 }),
    });
    await getFactory('Sale');

    const response = await request(app)
      .delete('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const sales = await getRepository('Sale').count();

    expect(response.status).toBe(200);
    expect(sales).toBe(1);
  });
});
