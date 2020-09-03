/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';

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
    // const user = await getFactory('User', {
    //   password: '123123',
    //   name: 'Cleiton',
    // });

    const res = await request(app).post('/users').send({
      name: 'Cleiton',
      password: '123123',
      question: 'Qual o nome da sua mãe?',
      response: 'Cledir',
      admin: false,
    });
    expect(res.status).toBe(201);
  });
});
