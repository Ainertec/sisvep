const bcrypt = require('bcryptjs');

const User = require('../../src/app/models/User');
const factory = require('../factories');
const connectionManager = require('../utils/connectionManager');

describe('test User', () => {
  beforeAll(() => {
    connectionManager.openConnection();
  });
  afterAll(() => {
    connectionManager.closeConnection();
  });
  beforeEach(async () => {
    await User.deleteMany({});
  });

  it('shuld encrypt user password', async () => {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: 'asd',
    });
    const compareHash = await bcrypt.compare('asd', user.password_hash);
    expect(compareHash).toBe(true);
  });
});
