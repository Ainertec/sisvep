import { Request, Response } from 'express';
import { IRepository } from '../../repositories/IRepository';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

export class ForgotPasswordController {
  constructor(private forgotUseCase: ForgotPasswordUseCase) {}

  async show(request: Request, response: Response) {
    const { name } = request.params;
    try {
      const question = await this.forgotUseCase.getUserQuestion(name);
      return response.json({ question });
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async store(request: Request, responseHttp: Response) {
    const { name, response, newPassword } = request.body;
    try {
      await this.forgotUseCase.resetPassword(name, response, newPassword);
      return responseHttp.status(200).send();
    } catch (error) {
      return responseHttp.status(400).json(error.message);
    }
  }
}
