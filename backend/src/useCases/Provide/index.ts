import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { ProviderUseCase } from './ProviderUseCase';
import { ProviderController } from './ProviderController';

const repository = new SqliteRepository('Provider');

const providerUseCase = new ProviderUseCase(repository);

const providerController = new ProviderController(providerUseCase);

export { providerUseCase, providerController };
