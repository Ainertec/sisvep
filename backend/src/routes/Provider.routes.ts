import { Router } from 'express';
import { providerController } from '../useCases/Provide';

export class ProviderRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/providers', (request, response) => {
      return providerController.store(request, response);
    });
    this.routes.put('/providers/:id', (request, response) => {
      return providerController.update(request, response);
    });
    this.routes.delete('/providers/:id', (request, response) => {
      return providerController.remove(request, response);
    });
    this.routes.get('/providers', (request, response) => {
      return providerController.index(request, response);
    });
    this.routes.get('/providers/:name', (request, response) => {
      return providerController.show(request, response);
    });
  }
}
