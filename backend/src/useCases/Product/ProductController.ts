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

  async update(request: Request, response: Response) {
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
    const id = Number(request.params.id);

    try {
      const updatedProduct = await this.productUseCase.updateProduct({
        id,
        name,
        description,
        price,
        cost,
        barcode,
        stock,
        validity,
        provider: providerId,
      });
      return response.status(201).json(updatedProduct);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async remove(request: Request, response: Response) {
    const id = Number(request.params.id);

    try {
      await this.productUseCase.deleteProduct(id);
      return response.status(200).send();
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async index(request: Request, response: Response) {
    const { name } = request.params;

    try {
      const product = await this.productUseCase.listProductsByName(name);
      return response.json(product);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async showByBarcode(request: Request, response: Response) {
    const barcode = Number(request.params.barcode);

    try {
      const product = await this.productUseCase.listProductsByBarcode(barcode);
      return response.json(product);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async showByValidity(request: Request, response: Response) {
    const { date } = request.params;

    try {
      const product = await this.productUseCase.listProductsByValidity(date);
      return response.json(product);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }

  async showByCreated(request: Request, response: Response) {
    const { date } = request.params;

    try {
      const product = await this.productUseCase.listProductsByCreatedAt(date);
      return response.json(product);
    } catch (error) {
      return response.status(400).json(error.message);
    }
  }
}
