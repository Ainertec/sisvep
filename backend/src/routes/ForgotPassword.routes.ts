import { Router } from 'express';
import Authorization from '../middlewares/Authorization';
import { forgotPasswordController } from '../useCases/ForgotPassword';

export class ForgotPasswordRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.get('/forgot/:name', (request, response) => {
      return forgotPasswordController.show(request, response);
    });
    this.routes.post('/forgot', (request, response) => {
      return forgotPasswordController.store(request, response);
    });
  }
}
