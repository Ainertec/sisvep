import { Router } from 'express';

import { UserRoutes } from './User.routes';
import { SessionRoutes } from './Session.routes';
import Authorization from '../middlewares/Authorization';
import Authentication from '../middlewares/Authentication';
import { ProductRoutes } from './Product.routes';
import { ProviderRoutes } from './Provider.routes';
import { SaleRoutes } from './Sale.routes';
import { ShopRoutes } from './Shop.routes';
import { ForgotPasswordRoutes } from './ForgotPassword.routes';
import { ReportRoutes } from './Reports.routes';

const routes = Router();

const sessionRoutes = new SessionRoutes(routes);
sessionRoutes.getRoutes();
const forgotRoutes = new ForgotPasswordRoutes(routes);
forgotRoutes.getRoutes();

routes.use(Authentication);

const userRoutes = new UserRoutes(routes);
userRoutes.getRoutes();

const productRoutes = new ProductRoutes(routes);
productRoutes.getRoutes();

const providerRoutes = new ProviderRoutes(routes);
providerRoutes.getRoutes();

const saleRoutes = new SaleRoutes(routes);
saleRoutes.getRoutes();

const shopRoutes = new ShopRoutes(routes);
shopRoutes.getRoutes();

routes.use(Authorization);
const reportRoutes = new ReportRoutes(routes);
reportRoutes.getRoutes();

export { routes };
