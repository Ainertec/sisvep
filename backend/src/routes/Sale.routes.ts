import { Router } from 'express';
import Authorization from '../middlewares/Authorization';

import {
  createDeleteSaleController,
  listSalesController,
} from '../useCases/Sale';

export class SaleRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/sales', (request, response) => {
      return createDeleteSaleController.store(request, response);
    });
    this.routes.delete('/sales', Authorization, (request, response) => {
      return createDeleteSaleController.remove(request, response);
    });

    this.routes.get('/sales', Authorization, (request, response) => {
      return listSalesController.index(request, response);
    });
    this.routes.get('/sales/:id', Authorization, (request, response) => {
      return listSalesController.show(request, response);
    });
  }
}
