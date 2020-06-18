const request = require('supertest');

const fs = require('fs');
const path = require('path');

const factory = require('../factories');
const connectionManager = require('../utils/connectionManager');

const Sale = require('../../src/app/models/Sale');
const app = require('../../src/app');

describe('A print test', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await Sale.deleteMany({});
  });

  it('should create a file', async () => {
    const user = await factory.create('User');
    await factory.create('Shop');

    const sale = await factory.create('Sale');

    const response = await request(app)
      .post(`/recipes`)
      .send({
        id: sale._id,
        details: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    setTimeout(async () => {
      await fs.unlinkSync(path.resolve(__dirname, '..', 'recipes', `${sale._id}.rtf`));
    }, 1000);

    expect(response.status).toBe(200);
  });
  it('should create a detail file', async () => {
    const user = await factory.create('User');
    await factory.create('Shop');

    const sale = await factory.create('Sale');

    const response = await request(app)
      .post(`/recipes`)
      .send({
        id: sale._id,
        details: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    setTimeout(async () => {
      await fs.unlinkSync(path.resolve(__dirname, '..', 'recipes', `${sale._id}.rtf`));
    }, 1000);

    expect(response.status).toBe(200);
  });
});
