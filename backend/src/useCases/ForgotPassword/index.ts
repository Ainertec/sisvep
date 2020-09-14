import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { ForgotPasswordController } from './ForgotPasswordController';
import { ForgotPasswordUseCase } from './ForgotPasswordUseCase';

const repository = new SqliteRepository('User');

const forgotPasswordUseCase = new ForgotPasswordUseCase(repository);

const forgotPasswordController = new ForgotPasswordController(
  forgotPasswordUseCase,
);

export { forgotPasswordController, forgotPasswordUseCase };
