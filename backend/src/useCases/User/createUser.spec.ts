/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User, Questions } from '../../entity/User';

describe('User Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('It should create an user', async () => {
    const user = await getFactory<User>('User', {
      password: '123123',
      name: 'Cleiton',
    });

    const res = await request(app)
      .post('/users')
      .send({
        name: 'Cleiton Baloneker',
        password: '123123',
        question: 'Qual o nome da sua mãe?',
        response: 'Cledir',
        admin: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(res.status).toBe(201);
  });

  it('should not create users with name already existents', async () => {
    const user = await getFactory<User>('User', { name: 'Daniel' });
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: user.name,
        password: user.password,
        question: user.question,
        response: user.response,
        admin: user.admin,
      });

    expect(response.status).toBe(400);
  });

  it('should not create users with invalid question', async () => {
    const user = await getFactory<User>('User');
    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Cleion',
        password: '123123',
        question: 'asd df',
        response: 'Falei',
        admin: false,
      });

    expect(response.status).toBe(400);
  });

  it('should not create user, with authenticate user not been admin', async () => {
    const user = await getFactory<User>('User', { admin: false });
    const response = await request(app)
      .post('/users')
      .send({
        name: 'Cleion',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
