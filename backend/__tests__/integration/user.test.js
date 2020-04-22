const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/app/models/User');
const { Questions } = require('../../src/app/models/User');
const connectionManager = require('../utils/connectionManager');

describe('User', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should create a user', async () => {
    const user = await factory.create('User', {
      password: '123123',
    });

    const response = await request(app)
      .post('/users')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Cleiton',
        password: user.password,
        question: user.question,
        response: user.response,
        admin: user.admin,
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
      })
    );
  });

  it('shuld not create users with name aready existents', async () => {
    const user = await factory.create('User', {
      name: 'Daniel',
    });
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
  it('shuld not create users with invalid question', async () => {
    const user = await factory.create('User');
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
  it('shuld not create user, with authencicate user not been admin', async () => {
    const user = await factory.create('User', {
      admin: false,
    });
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
    console.log(response.body);

    expect(response.status).toBe(400);
  });
});
