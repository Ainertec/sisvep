import { SqliteRepository } from '../../repositories/implementation/SqliteRepository';
import { ReportController } from './ReportController';
import { ReportUseCase } from './ReportUseCase';

const repository = new SqliteRepository('Sale');

const reportUseCase = new ReportUseCase(repository);
const reportController = new ReportController(reportUseCase);

export { reportController, reportUseCase };
