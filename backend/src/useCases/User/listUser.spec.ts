/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

describe('User Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should list all users', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
      name: 'Lucas',
    });
    await getFactory<User>('User', {
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
      ]),
    );
    expect(response.status).toBe(200);
  });
  it('should not list all users without admin privileges', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
      name: 'Lucas',
    });
    await getFactory<User>('User', {
      admin: false,
      name: 'Leonardo',
    });

    const response = await request(app)
      .get(`/users`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
  it('should  list all users by name', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
      name: 'Lucas',
    });
    await getFactory<User>('User', {
      admin: false,
      name: 'Leonardo',
    });
    await getFactory<User>('User', {
      admin: false,
      name: 'Cleiton',
    });

    const response = await request(app)
      .get(`/users/leo`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.body).toEqual(
      expect.arrayContaining([
        expect.objectContaining({
          name: 'Leonardo',
        }),
      ]),
    );

    expect(response.status).toBe(200);
  });
  it('should not list all users by name without admin privileges', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
      name: 'Lucas',
    });

    const response = await request(app)
      .get(`/users/leo`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });

  // Question//

  it('should list the questions', async () => {
    const response = await request(app).get('/users/questions');

    expect(response.status).toBe(200);
  });
});
