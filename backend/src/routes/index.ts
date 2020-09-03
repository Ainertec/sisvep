import { Router } from 'express';

import { UserRoutes } from './User.routes';
import { SessionRoutes } from './Session.routes';

const routes = Router();

const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();

const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes();

export { routes };
