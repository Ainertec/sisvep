import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { SaleController } from './SaleController';
import { CreateSaleUseCase } from './CreateSaleUseCase';

const repository = new SqliteRepository('Sale');

const saleUseCase = new CreateSaleUseCase(repository);

const saleController = new SaleController(saleUseCase);

export { saleController, saleUseCase };
