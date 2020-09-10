import { Router } from 'express';

import { saleController } from '../useCases/Sale';

export class SaleRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/sales', (request, response) => {
      return saleController.store(request, response);
    });
    // this.routes.put('/sales/:id', (request, response) => {
    //   return saleController.update(request, response);
    // });
    // this.routes.delete('/sales/:id', (request, response) => {
    //   return saleController.remove(request, response);
    // });
    // this.routes.get('/sales', (request, response) => {
    //   return saleController.index(request, response);
    // });
    // this.routes.get('/sales/:name', (request, response) => {
    //   return saleController.show(request, response);
    // });
  }
}
