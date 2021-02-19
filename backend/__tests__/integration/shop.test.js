const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const Shop = require('../../src/app/models/Shop');
const connectionManager = require('../utils/connectionManager');

describe('Shop', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await Shop.deleteMany({});
  });

  it('should create a shop', async () => {
    const user = await factory.create('User');

    const response = await request(app)
      .post('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ainertec',
        email: 'cleiton@ainertec.com.br',
      })
    );
  });
  it('should not create a shop if aready exist one', async () => {
    const user = await factory.create('User');
    await factory.create('Shop');

    const response = await request(app)
      .post('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(401);
  });
  it('should update a shop', async () => {
    const user = await factory.create('User');
    const shop = await factory.create('Shop');

    const response = await request(app)
      .put('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`)
      .query({
        id: String(shop._id),
      })
      .send({
        name: 'Ainertec',
        identification: '1234567890',
        phone: '992726852',
        email: 'cleiton@ainertec.com.br',
        address: 'Lumiar',
      });

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Ainertec',
        email: 'cleiton@ainertec.com.br',
      })
    );
  });

  it('should list the shop', async () => {
    const user = await factory.create('User');
    const shop = await factory.create('Shop');

    const response = await request(app)
      .get('/shops')
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: shop.name,
        phone: shop.phone,
        identification: shop.identification,
      })
    );
  });
});
