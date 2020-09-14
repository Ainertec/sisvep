import { Request, Response } from 'express';
import { ReportUseCase } from './ReportUseCase';

export class ReportController {
  constructor(private reportUseCase: ReportUseCase) {}

  async index(request: Request, response: Response) {
    try {
      const sales = await this.reportUseCase.allProductsSold();
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
