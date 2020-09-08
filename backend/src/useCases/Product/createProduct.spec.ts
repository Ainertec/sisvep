/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';
import { Provider } from '../../entity/Provider';
import { Product } from '../../entity/Product';

describe('Create user Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should create a Product', async () => {
    const productTest = await getFactory<Product>('Product');
    const provider = await getFactory<Provider>('Provider', {
      products: [productTest],
    });
    const user = await getFactory<User>('User');

    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        providerId: provider.id,
        name: 'Muzarela',
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      });

    expect(response.status).toBe(201);
  });
  it('should create a Product without providerId', async () => {
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await getFactory<User>('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Muzarela',
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      });

    expect(response.status).toBe(201);
  });

  it('shuld not create a Product with invalid provider id', async () => {
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await getFactory<User>('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'pão',
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
        providerId: 'qwertwas',
      });

    expect(response.status).toBe(400);
  });
  it('should not create a Product with invalid params', async () => {
    const product = await getFactory<Product>('Product', {
      name: 'Chocolate',
      description: 'Bão de mais',
    });
    const user = await getFactory<User>('User');
    const response = await request(app)
      .post('/products')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        // name: 'pão',
        description: product.description,
        price: product.price,
        cost: product.cost,
        barcode: product.barcode,
        validity: product.validity,
        stock: product.stock,
      });

    expect(response.status).toBe(400);
  });
});
