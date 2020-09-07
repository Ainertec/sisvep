/* eslint-disable no-param-reassign */
import { validate } from 'class-validator';
import { Like } from 'typeorm';
import { IRepository } from '../../repositories/IRepository';
import { User, Questions } from '../../entity/User';
import { ICreateUserRequest, IDeleteUser, IShowUser } from './UserDTO';

export class UserUseCase {
  constructor(private repository: IRepository<User>) {}

  async createUser(data: ICreateUserRequest) {
    const existUser = await this.repository.findOne<User>({
      where: { name: data.name },
    });

    if (existUser) {
      throw new Error('User already exist');
    }

    const authenticatedUser = await this.repository.findOne<User>({
      where: { id: data.userId },
    });

    if (!authenticatedUser.admin) {
      throw new Error('You cannot create a user without admin privileges');
    }
    const user = new User(data);
    const questions = Questions.getQuestions();

    if (!questions.includes(user.question, 0)) {
      throw new Error('Invalid question.');
    }

    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    await this.repository.save(user);
  }

  async updateUser(data: ICreateUserRequest) {
    const user = await this.repository.findOne<User>({
      where: { id: data.userId },
    });
    if (!user) throw new Error('user does not exist');

    if (data.name) {
      const existUser = await this.repository.findOne<User>({
        where: { name: data.name },
      });

      if (existUser) {
        throw new Error('User already exist');
      }
      user.name = data.name;
    }

    if (data.password) {
      user.password = data.password;
    }

    const authenticatedUser = await this.repository.findOne<User>({
      where: { id: data.userId },
    });

    if (authenticatedUser.admin) {
      user.admin = data.admin;
    }

    user.question = data.question;
    user.response = data.response;

    await this.repository.save(user);

    user.password_hash = undefined;
    user.response = undefined;

    return user;
  }

  async deleteUser(data: IDeleteUser) {
    if (data.userId === data.id) {
      await this.repository.delete(data.id);
    } else {
      const user = await this.repository.findOne<User>({
        where: { id: data.userId },
      });
      if (!user.admin) {
        throw new Error(
          'You cannot delete another user without admin privileges',
        );
      }
      await this.repository.delete(data.id);
    }
  }

  async getQuestion() {
    const questions = Questions.getQuestions();

    return questions;
  }

  async byName(data: IShowUser) {
    const user = await this.repository.findOne<User>({
      where: { id: data.userId },
    });

    if (!user.admin) {
      throw new Error('You cannot list user without admin privileges');
    }

    const users = await this.repository.find<User>({
      where: {
        name: Like(`%${data.name}%`),
      },
    });

    users.forEach(userInterator => {
      userInterator.password_hash = undefined;
      userInterator.response = undefined;
    });

    return users;
  }

  async all(userId: number) {
    const user = await this.repository.findOne<User>({ where: { id: userId } });

    if (!user.admin) {
      throw new Error('You cannot list user without admin privileges');
    }

    const users = await this.repository.find<User>();

    users.forEach(userInterator => {
      userInterator.password_hash = undefined;
      userInterator.response = undefined;
    });

    return users;
  }
}
