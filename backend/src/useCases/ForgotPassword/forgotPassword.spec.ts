/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import { getRepository } from 'typeorm';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

describe('Forgot password tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should be able to get user question', async () => {
    const user = await getFactory<User>('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });

    const response = await request(app).get(`/forgot/${user.name}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        question: user.question,
      }),
    );
  });

  it('should not get user question with invalid user', async () => {
    const response = await request(app).get('/forgot').query({
      name: 'geovane',
    });

    expect(response.status).toBe(401);
  });

  it('should rest password', async () => {
    const user = await getFactory<User>('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
      password: '1234',
    });

    const response = await request(app).post('/forgot').send({
      name: user.name,
      response: 'cledir',
      newPassword: '92865120',
    });
    const userReseted = await getRepository(User).findOne({
      where: { name: user.name },
    });
    console.log(userReseted);
    const validPassword = await userReseted.checkPassword('92865120');
    console.log(response.body);

    expect(response.status).toBe(200);
    expect(validPassword).toBe(true);
  });

  // it('should not reset password with incorrect user name', async () => {
  //   await getFactory<User>('User', {
  //     name: 'cleiton',
  //     question: 'Qual o modelo do seu primeiro carro?',
  //     response: 'cledir',
  //   });
  //   const response = await request(app).post('/forgot').send({
  //     name: 'Json',
  //     response: 'Maria Clara',
  //     password: '92865120',
  //   });

  //   expect(response.status).toBe(401);
  // });

  // it('should not reset password with incorrect response for user question', async () => {
  //   const user = await getFactory<User>('User', {
  //     name: 'cleiton',
  //     question: 'Qual o modelo do seu primeiro carro?',
  //     response: 'cledir',
  //   });
  //   const response = await request(app).post('/forgot').send({
  //     name: user.name,
  //     response: 'Maria Clara',
  //     password: '92865120',
  //   });

  //   expect(response.status).toBe(401);
  // });
});
