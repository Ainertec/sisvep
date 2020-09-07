import { Router } from 'express';

import { UserRoutes } from './User.routes';
import { SessionRoutes } from './Session.routes';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';

const routes = Router();

const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();

routes.use(Authentication);

const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes();

routes.use(Authorization);

export { routes };
