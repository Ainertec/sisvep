import { Router } from 'express';
// import { celebrate } from 'celebrate';
import { userController } from '../useCases/User';
// import { IValidateUser } from './routesDTO';

export class UserRoutes {
  constructor(private routes: Router) {}

  getRoutes() {
    // this.routes.get('/users', userController.index);
    // this.routes.get(
    //   '/users/:name',
    //   // celebrate({ params: validations.paramName }),
    //   userController.show,
    // );
    this.routes.post('/users', (request, response) => {
      return userController.store(request, response);
    });
    // this.routes.put(
    //   '/users/:id',
    //   // celebrate({
    //   //   params: validations.paramIdUser,
    //   //   body: validations.userUpdate,
    //   // }),
    //   userController.update,
    // );
    // this.routes.delete(
    //   '/users/:id',
    //   // celebrate({ params: validations.paramIdUser }),
    //   userController.delete,
    // );
  }
}
