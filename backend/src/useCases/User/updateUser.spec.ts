/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User, Questions } from '../../entity/User';

describe('Update user Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should update an user with password not provider', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        name: 'Cleiton',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: true,
      }),
    );

    expect(response.status).toBe(200);
  });
  it('should update an user with name and password not providers', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put(`/users/${user.id}`)

      .send({
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jão',
        admin: true,
      }),
    );

    expect(response.status).toBe(200);
  });
  it('should not update a user with name already existent', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        name: 'Jão',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should update an user with name not provider', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        password: '1234',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jão',
        admin: true,
      }),
    );

    expect(response.status).toBe(200);
  });
  it('should not update an inexistent user', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    // const product = await getFactory<User>('Product');

    const response = await request(app)
      .put(`/users/9999999999`)
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should update an user', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: true,
      }),
    );

    expect(response.status).toBe(200);
  });
  it('should not update an user with invalid id', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const response = await request(app)
      .put(`/users/12s2`)
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
  it('should not update an user admin type without privileges of admin', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
    });
    const user2 = await getFactory<User>('User', {
      admin: false,
    });
    const response = await request(app)
      .put(`/users/${user.id}`)
      .send({
        name: 'Cleiton',
        password: '1234543',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: false,
      }),
    );
    expect(response.status).toBe(200);
  });
});
