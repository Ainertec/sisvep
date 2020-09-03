import jwt from 'jsonwebtoken';
import { IRepository } from '../../repositories/IRepository';
import { User } from '../../entity/User';

export class SessionUseCase {
  constructor(private repository: IRepository<User>) {}

  async createSession(username: string, password: string) {
    const user = await this.repository.findOne<User>({
      where: { name: username },
    });

    if (!user) {
      throw new Error('User not found');
    }
    const isPasswordCorrect = await user.checkPassword(password);

    if (!isPasswordCorrect) {
      throw new Error('Incorrect password');
    }
    user.password_hash = undefined;
    return {
      user,
      token: jwt.sign({ id: user.id }, process.env.APP_SECRET),
    };
  }
}
