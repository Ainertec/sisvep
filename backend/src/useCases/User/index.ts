import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { UserUseCase } from './UserUseCase';
import { UserController } from './UserController';
import { User } from '../../entity/User';

const repository = new SqliteRepository<User>('User');

const userUseCase = new UserUseCase(repository);

const userController = new UserController(userUseCase);

export { userController, userUseCase };
