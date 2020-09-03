import { Request, Response } from 'express';

import { SessionUseCase } from './sessionUseCase';

export class SessionController {
  constructor(private sessionUseCase: SessionUseCase) {}

  async store(request: Request, response: Response) {
    const { name, password } = request.body;
    try {
      const { token, user } = await this.sessionUseCase.createSession(
        name,
        password,
      );
      return response.json({ token, user });
    } catch (error) {
      // console.error(error.message);
      return response.status(401).json('Error when trying to create session');
    }
  }
}
