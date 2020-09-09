/* eslint-disable no-return-await */
import { validate } from 'class-validator';
import {
  Like,
  Between,
  MoreThanOrEqual,
  LessThanOrEqual,
  LessThan,
  Raw,
} from 'typeorm';
import { startOfMonth, endOfMonth, parseISO, isValid } from 'date-fns';
import { IRepository } from '../../repositories/IRepository';

import { Product } from '../../entity/Product';
import { ICreateProductRequest, IUpdateProductRequest } from './ProductDTO';
import { Provider } from '../../entity/Provider';

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

  async updateProduct(data: IUpdateProductRequest) {
    const product = await this.repository.findOne<Product>({
      where: { id: data.id },
    });

    if (!product) throw new Error('product does not exist');

    product.name = data.name;
    product.description = data.description;
    product.price = data.price;
    product.stock = data.stock;
    product.validity = data.validity;

    if (data.provider) {
      const provider = await this.repository.findOne<Provider>({
        where: { id: data.provider },
      });
      product.provider = provider;
    }

    const updatedProduct = await this.repository.update(product);

    return updatedProduct;
  }

  async deleteProduct(id: number) {
    await this.repository.delete(id);
  }

  async listProductsByName(name: string) {
    const products = await this.repository.find({
      where: { name: Like(`%${name}%`) },
      relations: ['provider'],
    });
    return products;
  }

  async listProductsByCreatedAt(validity: string) {
    const initial = startOfMonth(parseISO(validity));
    const final = endOfMonth(initial);

    if (!isValid(initial)) {
      throw new Error('invalid date');
    }
    const initialDateString = initial.toISOString();
    const finalDateString = final.toISOString();
    const products = await this.repository.find<Product>({
      where: {
        createdAt: Between(
          initialDateString.split('T')[0],
          finalDateString.split('T')[0],
        ),
      },
      relations: ['provider'],
    });
    return products;
  }

  async listProductsByValidity(validity: string) {
    const initial = startOfMonth(parseISO(validity));
    const final = endOfMonth(initial);

    if (!isValid(initial)) {
      throw new Error('invalid date');
    }
    const initialDateString = initial.toISOString();
    const finalDateString = final.toISOString();
    const products = await this.repository.find<Product>({
      where: {
        validity: Between(
          initialDateString.split('T')[0],
          finalDateString.split('T')[0],
        ),
      },
      relations: ['provider'],
    });
    return products;
  }

  async listProductsByBarcode(barcode: number) {
    const products = await this.repository.findOne<Product>({
      where: { barcode },
      relations: ['provider'],
    });

    return products;
  }
}
