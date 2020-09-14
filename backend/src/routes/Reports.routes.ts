import { Router } from 'express';
import { reportController } from '../useCases/Report';

export class ReportRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/reports', (request, response) => {
      return reportController.index(request, response);
    });
  }
}
