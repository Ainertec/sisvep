/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import fs from 'fs';
import path from 'path';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

import { Product } from '../../entity/Product';
import { Sale } from '../../entity/Sale';

describe('Create product tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should create a file', async () => {
    const user = await getFactory<User>('User');
    await getFactory('Shop');
    const product = await getFactory<Product>('Product');

    const sale = await getFactory<Sale>('Sale', {
      user,
    });
    await getFactory('ItemsSale', {
      sale: sale.id,
      product: product.id,
    });

    const response = await request(app)
      .post(`/recipes`)
      .send({
        id: sale.id,
        details: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    setTimeout(async () => {
      await fs.unlinkSync(path.resolve(__dirname, 'recipes', `${sale.id}.rtf`));
    }, 1000);

    expect(response.status).toBe(200);
  });

  it('should create a detail file', async () => {
    const user = await getFactory<User>('User');
    await getFactory('Shop');
    const product = await getFactory<Product>('Product');

    const sale = await getFactory<Sale>('Sale', {
      user,
    });
    await getFactory('ItemsSale', {
      sale: sale.id,
      product: product.id,
    });

    const response = await request(app)
      .post(`/recipes`)
      .send({
        id: sale.id,
        details: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    setTimeout(async () => {
      await fs.unlinkSync(path.resolve(__dirname, 'recipes', `${sale.id}.rtf`));
    }, 1000);

    expect(response.status).toBe(200);
  });
});
