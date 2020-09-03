import { validate } from 'class-validator';
import { IRepository } from '../../repositories/IRepository';
import { User, Questions } from '../../entity/User';
import { ICreateUserRequest } from './UserDTO';

export class UserUseCase {
  constructor(private repository: IRepository<User>) {}

  async createUser(data: ICreateUserRequest) {
    const user = new User(data);
    const errors = await validate(user);
    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    const questions = Questions.getQuestions();

    if (!questions.includes(user.question, 0)) {
      throw new Error('Invalid question.');
    }

    await this.repository.save(user);
  }
}
