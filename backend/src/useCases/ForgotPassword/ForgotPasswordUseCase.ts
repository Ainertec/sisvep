import { User } from '../../entity/User';
import { IRepository } from '../../repositories/IRepository';

export class ForgotPasswordUseCase {
  constructor(private repository: IRepository<User>) {}

  async getUserQuestion(name: string) {
    const user = await this.repository.findOne<User>({ where: { name } });

    if (!user) {
      throw new Error('User does not exist');
    }

    return user.question;
  }

  async resetPassword(name: string, response: string, newPassword: string) {
    const user = await this.repository.findOne<User>({ where: { name } });

    if (!user) {
      throw new Error('User does not exist');
    }

    if (response !== user.response) {
      throw new Error('Incorrect response');
    }

    user.password = newPassword;

    const updatedUser = await this.repository.save<User>(user);
    console.log(updatedUser);
  }
}
