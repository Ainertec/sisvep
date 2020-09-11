import { Request, Response } from 'express';
import { ListSalesUseCase } from './ListSalesUseCase';

export class ListSalesController {
  constructor(private listSalesUseCase: ListSalesUseCase) {}

  async index(request: Request, response: Response) {
    try {
      const sales = await this.listSalesUseCase.allSales();
      return response.json(sales);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async show(request: Request, response: Response) {
    const id = Number(request.params.id);
    try {
      const sale = await this.listSalesUseCase.salesById(id);
      return response.json(sale);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
