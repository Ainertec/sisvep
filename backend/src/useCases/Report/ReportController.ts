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

  async show(request: Request, response: Response) {
    const { initialDate, finalDate } = request.query;
    try {
      const sales = await this.reportUseCase.productsLucreAndTotalByMonth(
        String(initialDate),
        String(finalDate),
      );
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async totalPercent(request: Request, response: Response) {
    try {
      const sales = await this.reportUseCase.productsTotalPercent();
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async amountPercent(request: Request, response: Response) {
    try {
      const sales = await this.reportUseCase.productsAmountPercent();
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async providersProducts(request: Request, response: Response) {
    try {
      const sales = await this.reportUseCase.providersProducts();
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
