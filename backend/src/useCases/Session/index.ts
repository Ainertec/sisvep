import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { User } from '../../entity/User';
import { SessionUseCase } from './sessionUseCase';
import { SessionController } from './SessionController';

const repository = new SqliteRepository<User>('User');

const useCaseSession = new SessionUseCase(repository);

const sessionController = new SessionController(useCaseSession);

export { useCaseSession, sessionController };
