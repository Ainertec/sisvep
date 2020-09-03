import { Request, Response } from 'express';

import { UserUseCase } from './UserUseCase';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async store(request: Request, responseHttp: Response) {
    const { name, password, question, response, admin } = request.body;
    try {
      await this.userUseCase.createUser({
        name,
        password,
        question,
        response,
        admin,
      });
      return responseHttp.status(201).send({});
    } catch (error) {
      return responseHttp.status(400).send(error.message);
    }
  }
}
