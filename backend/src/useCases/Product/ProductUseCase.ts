import { validate } from 'class-validator';
import { IRepository } from '../../repositories/IRepository';

import { Product } from '../../entity/Product';
import { ICreateProductRequest } from './ProductDTO';

export class ProductUseCase {
  constructor(private repository: IRepository<Product>) {}

  async createProduct(data: ICreateProductRequest) {
    const product = new Product(data);
    const errors = await validate(product);
    if (errors.length > 0) {
      throw new Error(String(errors));
    }
    await this.repository.save(product);
  }
}
