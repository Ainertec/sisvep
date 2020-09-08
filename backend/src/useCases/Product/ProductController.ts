import { Request, Response } from 'express';
import { ProductUseCase } from './ProductUseCase';

export class ProductController {
  constructor(private productUseCase: ProductUseCase) {}

  async store(request: Request, response: Response) {
    const {
      name,
      description,
      price,
      cost,
      barcode,
      stock,
      validity,
      providerId,
    } = request.body;

    try {
      await this.productUseCase.createProduct({
        name,
        description,
        price,
        cost,
        barcode,
        stock,
        validity,
        provider: providerId,
      });
      return response.status(201).send();
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
