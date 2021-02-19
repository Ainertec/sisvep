const request = require('supertest');
const factory = require('../factories');
const app = require('../../src/app');
const User = require('../../src/app/models/User');
const Product = require('../../src/app/models/User');
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
  afterEach(async () => {
    await User.deleteMany({});
    await Product.deleteMany({});
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

    expect(response.status).toBe(400);
  });
  it('should update an user with password not provider', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user._id),
      })
      .send({
        name: 'Cleiton',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: true,
      })
    );

    expect(response.status).toBe(200);
  });
  it('should update an user with name and password not providers', async () => {
    const user = await factory.create('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user._id),
      })
      .send({
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jão',
        admin: true,
      })
    );

    expect(response.status).toBe(200);
  });
  it('should not update a user with name aready existent', async () => {
    const user = await factory.create('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user._id),
      })
      .send({
        name: 'Jão',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should update an user with name not provider', async () => {
    const user = await factory.create('User', {
      admin: true,
      name: 'Jão',
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user._id),
      })
      .send({
        password: '1234',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Jão',
        admin: true,
      })
    );

    expect(response.status).toBe(200);
  });
  it('should not update an unexistent user', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const product = await factory.create('Product');

    const response = await request(app)
      .put('/users')
      .query({
        id: String(product._id),
      })
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should update an user', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user._id),
      })
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: true,
      })
    );

    expect(response.status).toBe(200);
  });
  it('should not update an user with invalid id', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: '12345',
      })
      .send({
        name: 'Cleiton',
        password: '123123',
        question: Questions.primeira,
        response: 'Falei',
        admin: false,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
  it('should not update an user admin type without privileges of admin', async () => {
    const user = await factory.create('User', {
      admin: false,
    });
    const user2 = await factory.create('User', {
      admin: false,
    });
    const response = await request(app)
      .put('/users')
      .query({
        id: String(user2._id),
      })
      .send({
        name: 'Cleiton',
        password: '1234543',
        question: Questions.primeira,
        response: 'Falei',
        admin: true,
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.body).toEqual(
      expect.objectContaining({
        name: 'Cleiton',
        admin: false,
      })
    );
    expect(response.status).toBe(200);
  });
  it('should delete a authenticated user', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const response = await request(app)
      .delete(`/users/${user._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('should delete another user', async () => {
    const user = await factory.create('User', {
      admin: true,
    });
    const user3 = await factory.create('User', {
      admin: true,
    });
    const response = await request(app)
      .delete(`/users/${user3._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('should not delete another user without admin privileges ', async () => {
    const user = await factory.create('User', {
      admin: false,
    });
    const user2 = await factory.create('User', {
      admin: false,
    });
    const response = await request(app)
      .delete(`/users/${user2._id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
  it('should not delete an user with invalid id ', async () => {
    const user = await factory.create('User', {
      admin: false,
    });
    const response = await request(app)
      .delete(`/users/qwerds`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });

  // list//

  it('should list all users', async () => {
    const user = await factory.create('User', {
      admin: true,
      name: 'Lucas',
    });
    await factory.create('User', {
      admin: false,
      name: 'Leonardo',
    });

    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Lucas',
        }),
        expect.objectContaining({
          name: 'Leonardo',
        }),
      ])
    );
    expect(response.status).toBe(200);
  });
  it('should not list all users witout admin privileges', async () => {
    const user = await factory.create('User', {
      admin: false,
      name: 'Lucas',
    });
    await factory.create('User', {
      admin: false,
      name: 'Leonardo',
    });

    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should  list all users by name', async () => {
    const user = await factory.create('User', {
      admin: true,
      name: 'Lucas',
    });
    await factory.create('User', {
      admin: false,
      name: 'Leonardo',
    });
    await factory.create('User', {
      admin: false,
      name: 'Cleiton',
    });

    const response = await request(app)
      .get(`/users_by_name`)
      .query({
        name: 'Le',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Leonardo',
        }),
      ])
    );

    expect(response.status).toBe(200);
  });
  it('should not list all users by name without admin privileges', async () => {
    const user = await factory.create('User', {
      admin: false,
      name: 'Lucas',
    });

    const response = await request(app)
      .get(`/users_by_name`)
      .query({
        name: 'L',
      })
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });

  // Question//

  it('should list the questions', async () => {
    const response = await request(app).get('/users_questions');

    expect(response.status).toBe(200);
  });
});
