/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Provider } from '../../entity/Provider';
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

  it('should create a provider', async () => {
    const user = await getFactory<User>('User');
    // const product = await getFactory<Product>('Product');
    // const product2 = await getFactory<Product>('Product');
    const response = await request(app)
      .post('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'José Aldo',
        description: 'Campeão dos pesados',
        phone: '(22)992726852',
        email: 'cleitnbaloneker@gmail.com',
        identification: '176.963.917-98',
      });

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'José Aldo',
      }),
    );

    expect(response.status).toBe(201);
  });

  it('should update a provider', async () => {
    const user = await getFactory<User>('User');
    const provider = await getFactory<Provider>('Provider');

    // const productsArray = provider.products;
    // productsArray.push(product.id);

    const response = await request(app)
      .put(`/providers/${provider.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Cleiton',
        description: provider.description,
        phone: provider.phone,
        email: 'cleitnbaloneker@gmail.com',
        identification: provider.identification,
      });
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      }),
    );
    expect(response.status).toBe(200);
  });

  it('should not update a provider with invalid id', async () => {
    const user = await getFactory<User>('User');
    const provider = await getFactory<Provider>('Provider');

    const response = await request(app)
      .put(`/providers/1243`)
      .set('Authorization', `Bearer ${user.generateToken()}`)

      .send({
        name: 'Cleiton',
        description: provider.description,
        phone: provider.phone,
        email: 'cleitnbaloneker@gmail.com',
      });
    expect(response.status).toBe(400);
  });

  it('should delete a provider', async () => {
    const user = await getFactory<User>('User');

    const provider = await getFactory<Provider>('Provider', {});

    const response = await request(app)
      .delete(`/providers/${provider.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });

  it('should not delete a provider with invalid id', async () => {
    const user = await getFactory<User>('User');

    const response = await request(app)
      .delete(`/providers/${'afsjb15'}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should not delete a provider with products with stock != 0', async () => {
    const user = await getFactory<User>('User');

    const provider = await getFactory<Provider>('Provider');
    await getFactory<Product>('Product', {
      stock: 12,
      provider,
    });

    const response = await request(app)
      .delete(`/providers/${provider.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  it('should list all providers', async () => {
    const user = await getFactory<User>('User');
    const provider = await getFactory<Provider>('Provider');
    await getFactory<Provider>('Provider', {
      name: 'Cleiton',
    });
    await getFactory('Product', { provider });

    const response = await request(app)
      .get('/providers')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: provider.name,
        }),
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ]),
    );
  });

  it('should list providers by name', async () => {
    const user = await getFactory<User>('User');
    await getFactory<Provider>('Provider', {
      name: 'Cleiton',
    });

    const response = await request(app)
      .get(`/providers/cle`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Cleiton',
        }),
      ]),
    );
  });
});
