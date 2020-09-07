import { Request, Response } from 'express';

import { UserUseCase } from './UserUseCase';

export class UserController {
  constructor(private userUseCase: UserUseCase) {}

  async store(request: Request, responseHttp: Response) {
    const { name, password, question, response, admin } = request.body;
    const id = Number(request.userId);
    try {
      await this.userUseCase.createUser({
        name,
        password,
        question,
        response,
        admin,
        userId: id,
      });
      return responseHttp.status(201).send({});
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async update(request: Request, responseHttp: Response) {
    const { name, password, question, response, admin } = request.body;
    const id = Number(request.params.id);

    try {
      const user = await this.userUseCase.updateUser({
        name,
        password,
        question,
        response,
        admin,
        userId: id,
      });
      return responseHttp.json(user);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async remove(request: Request, responseHttp: Response) {
    const id = Number(request.params.id);
    const user = Number(request.userId);

    try {
      await this.userUseCase.deleteUser({
        id,
        userId: user,
      });
      return responseHttp.status(200).send();
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async index(request: Request, responseHttp: Response) {
    const user = Number(request.userId);

    try {
      const users = await this.userUseCase.all(user);
      return responseHttp.json(users);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async show(request: Request, responseHttp: Response) {
    const user = Number(request.userId);
    const { name } = request.params;

    try {
      const users = await this.userUseCase.byName({ name, userId: user });
      return responseHttp.json(users);
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }

  async getQuestion(request: Request, responseHttp: Response) {
    const questions = await this.userUseCase.getQuestion();
    return responseHttp.json(questions);
  }
}
