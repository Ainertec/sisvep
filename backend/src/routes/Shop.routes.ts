import { Router } from 'express';
import Authorization from '../middlewares/Authorization';

import { shopController } from '../useCases/Shop';

export class ShopRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/shops', (request, response) => {
      return shopController.store(request, response);
    });
    this.routes.put('/shops/:id', (request, response) => {
      return shopController.update(request, response);
    });

    this.routes.get('/shops', Authorization, (request, response) => {
      return shopController.index(request, response);
    });
  }
}
