/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

import { Shop } from '../../entity/Shop';

describe('Shop tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should create a shop', async () => {
    const user = await getFactory<User>('User');

    const response = await request(app)
      .post('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(201);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ainertec',
        email: 'cleiton@ainertec.com.br',
      }),
    );
  });

  it('should not create a shop if already exist one', async () => {
    const user = await getFactory<User>('User');
    await getFactory('Shop');

    const response = await request(app)
      .post('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(400);
  });

  it('should update a shop', async () => {
    const user = await getFactory<User>('User');
    const shop = await getFactory<Shop>('Shop');

    const response = await request(app)
      .put(`/shops/${shop.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ainertec',
        email: 'cleiton@ainertec.com.br',
      }),
    );
  });

  it('should list the shop', async () => {
    const user = await getFactory<User>('User');
    const shop = await getFactory<Shop>('Shop');

    const response = await request(app)
      .get('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: shop.name,
        phone: shop.phone,
        identification: shop.identification,
      }),
    );
  });
});
