import { Response, Request } from 'express';
import { CreateSaleUseCase } from './CreateSaleUseCase';

export class SaleController {
  constructor(private saleUseCase: CreateSaleUseCase) {}

  async store(request: Request, response: Response) {
    const { total, payment, items } = request.body;
    const user = Number(request.userId);
    try {
      const sale = await this.saleUseCase.createSale({
        total,
        payment,
        items,
        user,
      });

      return response.status(201).json(sale);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
