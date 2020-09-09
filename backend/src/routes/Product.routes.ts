import { Router } from 'express';
// import { celebrate } from 'celebrate';
import { productController } from '../useCases/Product';
// import { IValidateUser } from './routesDTO';

export class ProductRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/products/validity/:date', (request, response) => {
      return productController.showByValidity(request, response);
    });
    this.routes.get('/products/created/:date', (request, response) => {
      return productController.showByCreated(request, response);
    });
    this.routes.get('/products/barcode/:barcode', (request, response) => {
      return productController.showByBarcode(request, response);
    });
    this.routes.get('/products/:name', (request, response) => {
      return productController.index(request, response);
    });
    this.routes.post('/products', (request, response) => {
      return productController.store(request, response);
    });
    this.routes.put('/products/:id', (request, response) => {
      return productController.update(request, response);
    });

    this.routes.delete('/products/:id', (request, response) => {
      return productController.remove(request, response);
    });
  }
}
