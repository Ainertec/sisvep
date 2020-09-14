/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { sub } from 'date-fns';
import { getRepository } from 'typeorm';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Product } from '../../entity/Product';
import { ItemsSale } from '../../entity/ItemsSale';
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

    const sale = await getFactory<Sale>('Sale');
    const sale1 = await getFactory<Sale>('Sale');
    const sale2 = await getFactory<Sale>('Sale');
    const sale3 = await getFactory<Sale>('Sale');
    const sale4 = await getFactory<Sale>('Sale');

    await getFactory<ItemsSale>('ItemsSale', {
      sale: sale1,
      product: product1,
      quantity: 7,
    });
    await getFactory<ItemsSale>('ItemsSale', {
      sale: sale1,
      product: product3,
      quantity: 5,
    });
    await getFactory<ItemsSale>('ItemsSale', {
      sale: sale2,
      product: product2,
      quantity: 2,
    });
    await getFactory<ItemsSale>('ItemsSale', {
      sale: sale3,
      product: product3,
      quantity: 4,
    });

    const response = await request(app)
      .get('/reports')
      .set('Authorization', `Bearer ${user.generateToken()}`);
    console.log(response.body);
    expect(response.status).toBe(200);
    // expect(response.body).toEqual(
    //   expect.arrayContaining([
    //     expect.objectContaining({
    //       _id: expect.objectContaining({
    //         name: 'Pão',
    //       }),
    //       soldout: 8,
    //     }),
    //   ]),
    // );
  });
});
