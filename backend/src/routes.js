const routes = require('express').Router();

const { celebrate, Joi, Segments } = require('celebrate');

const ProductController = require('./app/controllers/ProductController');
const ProviderController = require('./app/controllers/ProviderController');
const SessionController = require('./app/controllers/SessionController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');
const UserController = require('./app/controllers/UserController');

const authMiddleware = require('./app/middleware/auth');

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

routes.use(authMiddleware);
//users

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
      providerId: Joi.string().required(),
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
      id: Joi.string().required(),
    },
  }),
  ProviderController.delete
);

module.exports = routes;
