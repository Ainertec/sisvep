/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { getRepository } from 'typeorm';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Provider } from '../../entity/Provider';
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

  it('should delete a product', async () => {
    const product = await getFactory<Product>('Product');
    await getFactory<Provider>('Provider', {
      products: [product],
    });

    const user = await getFactory<User>('User');
    const response = await request(app)
      .delete(`/products/${product.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    const providers = await getRepository(Provider).findOne({});

    expect(response.status).toBe(200);
    expect(providers.products).toEqual(undefined);
  });
});
