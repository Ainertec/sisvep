import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { ProductUseCase } from './ProductUseCase';
import { ProductController } from './ProductController';

const repository = new SqliteRepository('Product');

const productUseCase = new ProductUseCase(repository);

const productController = new ProductController(productUseCase);

export { productController, productUseCase };
