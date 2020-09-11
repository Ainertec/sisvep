import { Router } from 'express';

import { UserRoutes } from './User.routes';
import { SessionRoutes } from './Session.routes';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';
import { ProductRoutes } from './Product.routes';
import { ProviderRoutes } from './Provider.routes';
import { SaleRoutes } from './Sale.routes';

const routes = Router();

const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();

routes.use(Authentication);

const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes();

const productRoutes = new ProductRoutes(routes);
productRoutes.getRoutes();

const providerRoutes = new ProviderRoutes(routes);
providerRoutes.getRoutes();

const saleRoutes = new SaleRoutes(routes);
saleRoutes.getRoutes();

routes.use(Authorization);

export { routes };
