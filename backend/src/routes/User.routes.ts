import { Router } from 'express';
// import { celebrate } from 'celebrate';
import { userController } from '../useCases/User';
// import { IValidateUser } from './routesDTO';

export class UserRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/users', (request, response) => {
      return userController.index(request, response);
    });
    this.routes.get('/users/:name', (request, response) => {
      return userController.show(request, response);
    });
    this.routes.post('/users', (request, response) => {
      return userController.store(request, response);
    });
    this.routes.put('/users/:id', (request, response) => {
      return userController.update(request, response);
    });

    this.routes.delete('/users/:id', (request, response) => {
      return userController.remove(request, response);
    });
  }
}
