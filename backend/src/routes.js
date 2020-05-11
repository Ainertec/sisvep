const routes = require('express').Router();
const mongoose = require('mongoose');

const { celebrate, Joi, Segments } = require('celebrate');

const ProductController = require('./app/controllers/ProductController');
const ProviderController = require('./app/controllers/ProviderController');
const SessionController = require('./app/controllers/SessionController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');
const UserController = require('./app/controllers/UserController');
const SaleController = require('./app/controllers/SaleController');
const ReportController = require('./app/controllers/ReportController');

const authMiddleware = require('./app/middleware/auth');
const authorizationMiddleware = require('./app/middleware/authorization');

// custom validation
const validObjectId = (value, helpers) => {
  if (!mongoose.Types.ObjectId.isValid(value)) {
    return helpers.message('Invalid id');
  }
  return value;
};

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

routes.get(
  '/forgot',
  celebrate({
    [Segments.QUERY]: {
      name: Joi.string().required(),
    },
  }),
  ForgotPasswordController.show
);
routes.post(
  '/forgot',
  celebrate({
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string().required().exist(),
      response: Joi.string().required(),
      password: Joi.string().required(),
    }),
  }),
  ForgotPasswordController.store
);

routes.get('/users_questions', UserController.getQuestion);

// Only autenticated users
routes.use(authMiddleware);

// Users
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
      id: Joi.custom(validObjectId, 'valid id').required(),
    },
    [Segments.BODY]: Joi.object().keys({
      name: Joi.string(),
      password: Joi.string(),
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
      id: Joi.custom(validObjectId, 'valid id').required(),
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
      name: Joi.string().required(),
    },
  }),
  ProductController.index
);

routes.get(
  '/products_validity',
  celebrate({
    [Segments.QUERY]: {
      date: Joi.string().required(),
    },
  }),
  ProductController.show
);

routes.get(
  '/products_created_date',
  celebrate({
    [Segments.QUERY]: {
      date: Joi.string().required(),
    },
  }),
  ProductController.showByCreated
);

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
      providerId: Joi.custom(validObjectId, 'valid id'),
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
      id: Joi.custom(validObjectId, 'valid id').required(),
      providerId: Joi.custom(validObjectId, 'valid id').required(),
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
      id: Joi.custom(validObjectId, 'valid id').required(),
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
      id: Joi.custom(validObjectId, 'valid id').required(),
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
      id: Joi.custom(validObjectId, 'valid id').required(),
    },
  }),
  ProviderController.delete
);

// SALE //

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
      id: Joi.custom(validObjectId, 'valid id').required(),
    },
  }),
  SaleController.show
);

routes.delete('/sales', SaleController.delete);

// Report

routes.get(
  '/report',
  celebrate({
    [Segments.QUERY]: {
      initialDate: Joi.string().required(),
      finalDate: Joi.string().required(),
    },
  }),
  ReportController.show
);

routes.get(
  '/report_solds_by_month',
  celebrate({
    [Segments.QUERY]: {
      initialDate: Joi.string().required(),
      finalDate: Joi.string().required(),
    },
  }),
  ReportController.byMonth
);
routes.get('/report_soldouts', ReportController.index);

routes.get('/report_products_total_percent', ReportController.soldsProductsPercent);

routes.get('/report_products_amount_percent', ReportController.amountProductsPercent);

routes.get('/report_providers_products', ReportController.providersProducts);

routes.get('/report_sales_amount', ReportController.salesAmount);

module.exports = routes;
