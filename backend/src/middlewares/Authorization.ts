/* eslint-disable consistent-return */
import { Request, Response, NextFunction } from 'express';
import { SqliteRepository } from '../repositories/implementation/SqliteRepository';
import { User } from '../entity/User';

class Authentication {
  public async auth(request: Request, response: Response, next: NextFunction) {
    const { userId } = request;
    const repository = new SqliteRepository('User');
    const user = await repository.findOne<User>({ where: { _id: userId } });

    if (!user?.admin) {
      return response.status(401).json('Restrict area');
    }

    next();
  }
}

export default new Authentication().auth;