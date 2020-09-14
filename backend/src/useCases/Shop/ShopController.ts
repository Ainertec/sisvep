import { Request, Response } from 'express';
import { ShopUseCase } from './ShopUseCase';

export class ShopController {
  constructor(private shopUseCase: ShopUseCase) {}

  async store(request: Request, response: Response) {
    const { name, identification, phone, email, address } = request.body;
    try {
      const shop = await this.shopUseCase.creatShop({
        name,
        identification,
        phone,
        email,
        address,
      });
      return response.status(201).json(shop);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async update(request: Request, response: Response) {
    const { name, identification, phone, email, address } = request.body;
    const id = Number(request.params.id);
    try {
      const shop = await this.shopUseCase.updateShop({
        name,
        identification,
        phone,
        email,
        address,
        id,
      });
      return response.status(200).json(shop);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async index(request: Request, response: Response) {
    try {
      const shop = await this.shopUseCase.all();
      return response.status(200).json(shop);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
