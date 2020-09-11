import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { CreateDeleteSaleController } from './CreteAndDeleteSaleController';
import { CreateDeleteSaleUseCase } from './CreateAndDeleteSaleUseCase';
import { ListSalesUseCase } from './ListSalesUseCase';
import { ListSalesController } from './ListSalesController';

const repository = new SqliteRepository('Sale');

const createDeleteSaleUseCase = new CreateDeleteSaleUseCase(repository);

const createDeleteSaleController = new CreateDeleteSaleController(
  createDeleteSaleUseCase,
);
// List Sales
const listSalesUseCase = new ListSalesUseCase(repository);
const listSalesController = new ListSalesController(listSalesUseCase);

export {
  createDeleteSaleController,
  createDeleteSaleUseCase,
  listSalesUseCase,
  listSalesController,
};
