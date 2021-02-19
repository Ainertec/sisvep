const request = require('supertest');
const bcrypt = require('bcryptjs');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/app/models/User');
const connectionManager = require('../utils/connectionManager');

describe('Reset password', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should be able to get user question', async () => {
    const user = await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });

    const response = await request(app).get('/forgot').query({
      name: user.name,
    });
    expect(response.body).toEqual(
      expect.objectContaining({
        question: user.question,
      })
    );
  });

  it('should not get user question whith invalid user', async () => {
    const response = await request(app).get('/forgot').query({
      name: 'geovane',
    });

    expect(response.status).toBe(401);
  });

  it('should rest password', async () => {
    const user = await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
      password: '1234',
    });

    const response = await request(app).post('/forgot').send({
      name: user.name,
      response: 'cledir',
      password: '92865120',
    });
    const userReseted = await User.findOne({ name: user.name });
    const validPassword = await userReseted.checkPassword('92865120');
    expect(validPassword).toBe(true);
    expect(response.status).toBe(200);
  });

  it('should not reset password with incorrect user name', async () => {
    await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });
    const response = await request(app).post('/forgot').send({
      name: 'Json',
      response: 'Maria Clara',
      password: '92865120',
    });

    expect(response.status).toBe(401);
  });
  it('should not reset password with incorrect response for user question', async () => {
    const user = await factory.create('User', {
      name: 'cleiton',
      question: 'Qual o modelo do seu primeiro carro?',
      response: 'cledir',
    });
    const response = await request(app).post('/forgot').send({
      name: user.name,
      response: 'Maria Clara',
      password: '92865120',
    });

    expect(response.status).toBe(401);
  });
});
