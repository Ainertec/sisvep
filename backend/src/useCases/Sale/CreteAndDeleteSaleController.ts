import { Response, Request } from 'express';
import { CreateDeleteSaleUseCase } from './CreateAndDeleteSaleUseCase';

export class CreateDeleteSaleController {
  constructor(private saleUseCase: CreateDeleteSaleUseCase) {}

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

  async remove(request: Request, response: Response) {
    try {
      await this.saleUseCase.deleteSale();
      return response.status(200).send({});
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
