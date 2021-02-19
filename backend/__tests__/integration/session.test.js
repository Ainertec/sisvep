const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/app/models/User');
const connectionManager = require('../utils/connectionManager');

describe('Login', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should authenticate a user with valid credentials ', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app).post('/sessions').send({
      name: user.name,
      password: '1234',
    });
    expect(response.status).toBe(200);
  });
  it('should not authenticate with invalid credentials', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app).post('/sessions').send({
      name: user.name,
      password: '123456',
    });

    expect(response.status).toBe(401);
  });
  it('should not authenticate with invalid credentials(name)', async () => {
    await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app).post('/sessions').send({
      name: 'Pablo',
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('should return jwt token when authenticated', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app).post('/sessions').send({
      name: user.name,
      password: '1234',
    });
    expect(response.body).toHaveProperty('token');
  });
  it('should be able to acess private routes when authenticated', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app).post('/sessions').send({
      name: user.name,
      password: '123456',
    });

    expect(response.status).toBe(401);
  });

  it('should be able access private routes', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });

    const response = await request(app)
      .get('/products')
      .query({ name: 'Choc' })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('should not be able to access private routes without jwt token', async () => {
    const response = await request(app).get('/products');

    expect(response.status).toBe(401);
  });
  it('should not be able to access private routes with invalid jwt token', async () => {
    const response = await request(app).get('/products').set('Authorization', `Bearer 123123`);

    expect(response.status).toBe(401);
  });
});
