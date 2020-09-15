/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';

import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';
import { Sale } from '../../entity/Sale';

describe('List sales tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should list all sales', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product');
    const product1 = await getFactory<Product>('Product');
    const product2 = await getFactory<Product>('Product');

    const sale1 = await getFactory<Sale>('Sale', {
      payment: 'Dinheiro',
    });
    await getFactory('ItemsSale', {
      sale: sale1.id,
      product: product.id,
      quantity: 4,
    });
    const sale2 = await getFactory<Sale>('Sale', {
      payment: 'Debito',
    });

    // await getFactory<ItemsSale>('ItemsSale', {
    //   sale: sale2,
    //   product: product1,
    //   quantity: 7,
    // });

    const sale3 = await getFactory<Sale>('Sale', {
      payment: 'Credito',
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
      ]),
    );
  });

  it('should not list all sales without admin privileges', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
    });
    const response = await request(app)
      .get('/sales')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(401);
  });

  it('should list sales by id', async () => {
    const user = await getFactory<User>('User');
    const product = await getFactory<Product>('Product');
    const sale = await getFactory<Sale>('Sale', {
      payment: 'Dinheiro',
    });

    const response = await request(app)
      .get(`/sales/${sale.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        payment: 'Dinheiro',
      }),
    );
  });
});
