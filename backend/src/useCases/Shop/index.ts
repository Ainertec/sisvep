import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { ShopController } from './ShopController';
import { ShopUseCase } from './ShopUseCase';

const repository = new SqliteRepository('Shop');

const shopUseCase = new ShopUseCase(repository);

const shopController = new ShopController(shopUseCase);

export { shopController, shopUseCase };
