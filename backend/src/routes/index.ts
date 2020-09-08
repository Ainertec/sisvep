import { Router } from 'express';

import { UserRoutes } from './User.routes';
import { SessionRoutes } from './Session.routes';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';
import { ProductRoutes } from './Product.routes';

const routes = Router();

const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();

routes.use(Authentication);

const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes();
const productRoutes = new ProductRoutes(routes);
productRoutes.getRoutes();

routes.use(Authorization);

export { routes };
