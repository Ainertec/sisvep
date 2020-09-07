import { Router } from 'express';

import { sessionController } from '../useCases/Session';
import { userController } from '../useCases/User';

export class SessionRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    this.routes.post('/sessions', (request, response) => {
      return sessionController.store(request, response);
    });
    this.routes.get('/users/questions', (request, response) => {
      return userController.getQuestion(request, response);
    });
  }
}
