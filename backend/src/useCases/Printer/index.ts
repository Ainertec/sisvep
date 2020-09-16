import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { PrinterController } from './PrinterController';
import { PrinterUseCase } from './PrinterUseCase';

const repository = new SqliteRepository('Sale');
const repositoryShop = new SqliteRepository('Shop');

const printerUseCase = new PrinterUseCase(repository, repositoryShop);

const printerController = new PrinterController(printerUseCase);

export { printerController, printerUseCase };
