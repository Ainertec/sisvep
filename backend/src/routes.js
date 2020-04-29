const routes = require('express').Router();

const { celebrate, Joi, Segments } = require('celebrate');

const ProductController = require('./app/controllers/ProductController');
const ProviderController = require('./app/controllers/ProviderController');
const SessionController = require('./app/controllers/SessionController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');
const UserController = require('./app/controllers/UserController');
const SaleController = require('./app/controllers/SaleController');
const TransactionController = require('./app/controllers/TransactionController');

const authMiddleware = require('./app/middleware/auth');
const authorizationMiddleware = require('./app/middleware/authorization');

//User

// session

routes.post(
  '/sessions',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  SessionController.store
);
// forgot password

routes.get('/forgot', ForgotPasswordController.show);
routes.post('/forgot', ForgotPasswordController.store);

routes.get('/users_questions', UserController.getQuestion);
/////////////////Somente para testes ////////////////////
routes.post(
  '/users_test',
  celebrate({
    [Segments.QUERY]: {
      teste: Joi.boolean(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      question: Joi.string().required(),
      response: Joi.string().required(),
      admin: Joi.boolean(),
    }),
  }),
  UserController.store
);

// Only autenticated users
routes.use(authMiddleware);
//users
routes.get('/users', UserController.index);
routes.get(
  '/users_by_name',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  UserController.show
);

routes.post(
  '/users',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      question: Joi.string().required(),
      response: Joi.string().required(),
      admin: Joi.boolean(),
    }),
  }),
  UserController.store
);

routes.put(
  '/users',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      password: Joi.string().required(),
      question: Joi.string().required(),
      response: Joi.string().required(),
      admin: Joi.boolean(),
    }),
  }),
  UserController.update
);
routes.delete(
  '/users/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  UserController.delete
);

// Products
/**
 * @param name:String
 * @description without parmameter return all products
 */
routes.get(
  '/products',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string(),
    },
  }),
  ProductController.index
);
/**
 * @param date: String
 * @description return all products with a validity infomated
 */
routes.get(
  '/products_validity',
  celebrate({
    [Segments.QUERY]: {
      date: Joi.string().required(),
    },
  }),
  ProductController.show
);
/**
 * @param barcode: Number
 * @description return the product with the barcode infomated
 */
routes.get(
  '/products_barcode',
  celebrate({
    [Segments.QUERY]: {
      barcode: Joi.number().required(),
    },
  }),
  ProductController.showByBarcode
);

routes.post(
  '/products',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      providerId: Joi.string(),
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      cost: Joi.number().required(),
      barcode: Joi.number().required(),
      validity: Joi.date().required(),
      stock: Joi.number().required(),
    }),
  }),
  ProductController.store
);
routes.put(
  '/products',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
      providerId: Joi.string().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string(),
      price: Joi.number().required(),
      cost: Joi.number().required(),
      barcode: Joi.number().required(),
      validity: Joi.date().required(),
      stock: Joi.number().required(),
    }),
  }),
  ProductController.update
);

routes.delete(
  '/products/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.string().required(),
    },
  }),
  ProductController.delete
);

// Provider
routes.get('/providers', ProviderController.index);

routes.get(
  '/providers_by_name',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  ProviderController.show
);

routes.post(
  '/providers',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      identification: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      products: Joi.array().required(),
    }),
  }),
  ProviderController.store
);

routes.put(
  '/providers',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required(),
      description: Joi.string().required(),
      identification: Joi.string().required(),
      phone: Joi.string().required(),
      email: Joi.string().required(),
      products: Joi.array().required(),
    }),
  }),
  ProviderController.update
);
routes.delete(
  '/providers/:id',
  celebrate({
    [Segments.PARAMS]: {
      id: Joi.required(),
    },
  }),
  ProviderController.delete
);

//SALE//

routes.post(
  '/sales',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      payment: Joi.string().required(),
      total: Joi.number().required(),
      itens: Joi.array().required(),
    }),
  }),
  SaleController.store
);

// Only admin users

routes.use(authorizationMiddleware);

routes.get('/sales', SaleController.index);
routes.get(
  '/sales_by_id',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required(),
    },
  }),
  SaleController.show
);

// transactions

routes.get('/transactions', TransactionController.show);
routes.get('/transactions_soldouts', TransactionController.index);
routes.get('/transactions_solds_by_month', TransactionController.byMonth);
routes.get('/transactions_products_total_percent', TransactionController.soldsProductsPercent);

module.exports = routes;
