import { Router } from 'express';
import { reportController } from '../useCases/Report';

export class ReportRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/reports', (request, response) => {
      return reportController.index(request, response);
    });
    this.routes.get('/reports/lucre/total', (request, response) => {
      return reportController.show(request, response);
    });
    this.routes.get('/reports/products/total/percent', (request, response) => {
      return reportController.totalPercent(request, response);
    });
    this.routes.get('/reports/products/amount/percent', (request, response) => {
      return reportController.amountPercent(request, response);
    });
    this.routes.get('/reports/providers/products', (request, response) => {
      return reportController.providersProducts(request, response);
    });
    this.routes.get('/reports/sales/total', (request, response) => {
      return reportController.salesTotal(request, response);
    });
  }
}
