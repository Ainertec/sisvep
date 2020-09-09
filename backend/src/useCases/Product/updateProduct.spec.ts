/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Provider } from '../../entity/Provider';
import { Product } from '../../entity/Product';

describe('Update product tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should update a product', async () => {
    const product = await getFactory<Product>('Product');
    await getFactory<Provider>('Provider', {
      products: [product],
    });
    const provider2 = await getFactory<Provider>('Provider');

    const user = await getFactory<User>('User');

    const response = await request(app)
      .put(`/products/${product.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Tortugita',
        providerId: provider2.id,
        description: 'Chocolate com Morango',
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
      }),
    );
  });
  it('should not update a product inexistent', async () => {
    const product = await getFactory<Product>('Product');
    const provider = await getFactory<Provider>('Provider', {
      products: [product],
    });

    const user = await getFactory<User>('User');

    const response = await request(app)
      .put(`/products/1234`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Tortugita',
        description: 'Chocolate com Morango',
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
        providerId: provider.id,
      });

    expect(response.status).toBe(400);
  });
});
