/* eslint-disable import/no-extraneous-dependencies */
import request from 'supertest';
import connection from '../../database/connection';
import { app } from '../../app';
import { getFactory } from '../../utils/factories';
import { User } from '../../entity/User';

describe('Update user Tests', () => {
  beforeAll(async () => {
    await connection.create();
  });
  afterAll(async () => {
    await connection.close();
  });
  beforeEach(async () => {
    await connection.clear();
  });

  it('should delete a authenticated user', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const response = await request(app)
      .delete(`/users/${user.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('should delete another user', async () => {
    const user = await getFactory<User>('User', {
      admin: true,
    });
    const user3 = await getFactory<User>('User', {
      admin: true,
    });
    const response = await request(app)
      .delete(`/users/${user3.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(200);
  });
  it('should not delete another user without admin privileges ', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
    });
    const user2 = await getFactory<User>('User', {
      admin: false,
    });
    const response = await request(app)
      .delete(`/users/${user2.id}`)
      .set('Authorization', `Bearer ${user.generateToken()}`);
    expect(response.status).toBe(400);
  });
  it('should not delete an user with invalid id ', async () => {
    const user = await getFactory<User>('User', {
      admin: false,
    });
    const response = await request(app)
      .delete(`/users/qwerds`)
      .set('Authorization', `Bearer ${user.generateToken()}`);

    expect(response.status).toBe(400);
  });
});
