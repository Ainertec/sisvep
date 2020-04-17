const factory = require('../factories');

module.exports = {
  async login() {
    const user = await factory.create('User', {
      name: 'Cleiton',
      password: '1234',
    });
    return user.generateToken();
  },
};
