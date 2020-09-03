/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { getRepository } from 'typeorm';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

describe('Session Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should authenticate a user with valid credentials ', async () => {
    const user = await getFactory('User', {
      password: '123123',
      name: 'Cleiton',
    });

    const res = await request(app).post('/sessions').send({
      name: 'Cleiton',
      password: '123123',
    });

    expect(res.status).toBe(200);
  });

  it('should not authenticate with invalid credentials', async () => {
    const name = 'Cleiton';
    const password = '123123';
    const question = 'Qual o nome da sua mãe?';
    const response = 'Cledir';
    const user = new User({ name, password, question, response });

    await getRepository(User).save(user);

    const res = await request(app).post('/sessions').send({
      name: user.name,
      password: '123456',
    });

    expect(res.status).toBe(401);
  });

  it('should not authenticate with invalid credentials(name)', async () => {
    const name = 'Cleiton';
    const password = '123123';
    const question = 'Qual o nome da sua mãe?';
    const response = 'Cledir';
    const user = new User({ name, password, question, response });

    await getRepository(User).save(user);

    const res = await request(app).post('/sessions').send({
      name: 'Pablo',
      password: '123456',
    });

    expect(res.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const name = 'Cleiton';
    const password = '123123';
    const question = 'Qual o nome da sua mãe?';
    const response = 'Cledir';
    const user = new User({ name, password, question, response });
    await getRepository(User).save(user);

    const res = await request(app).post('/sessions').send({
      name: user.name,
      password: '123123',
    });
    expect(res.body).toHaveProperty('token');
  });

  // it('should be able to acess private routes when authenticated', async () => {
  //   const user = await factory.for(User).with({ password: '1234' }).create();

  //   const response = await request(app).post('/sessions').send({
  //     name: user.name,
  //     password: '123456',
  //   });

  //   expect(response.status).toBe(401);
  // });

  // it('should be able access private routes', async () => {
  //   const user = await factory.create('User', {
  //     name: 'Cleiton',
  //     password: '1234',
  //   });

  //   const response = await request(app)
  //     .get('/products')
  //     .query({ name: 'Choc' })
  //     .set('Authorization', `Bearer ${user.generateToken()}`);

  //   expect(response.status).toBe(200);
  // });
  // it('should not be able to access private routes without jwt token', async () => {
  //   const response = await request(app).get('/products');

  //   expect(response.status).toBe(401);
  // });
  // it('should not be able to access private routes with invalid jwt token', async () => {
  //   const response = await request(app).get('/products').set('Authorization', `Bearer 123123`);

  //   expect(response.status).toBe(401);
  // });
});
