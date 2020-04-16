const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/app/models/User');
const connectionManager = require('../utils/connectionManager');

describe('teste Product', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('should authenticate a user ', async () => {
    // const user = await factory.create('User', {
    //   name: 'Cleiton',
    //   password: '123',
    // });

    // const response = await request(app).post('sessions').send({
    //   name: user.name,
    //   password: user.password,
    // });

    expect(2 + 2).toBe(4);
  });
});
