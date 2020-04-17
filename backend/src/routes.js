const routes = require('express').Router();

const { celebrate, Joi, Segments } = require('celebrate');

const ProductController = require('./app/controllers/ProductController');
const SessionController = require('./app/controllers/SessionController');
const ForgotPasswordController = require('./app/controllers/ForgotPasswordController');

const authMiddleware = require('./app/middleware/auth');

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
      id: Joi.string().required().min(12),
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
  '/products',
  celebrate({
    [Segments.QUERY]: {
      id: Joi.string().required().min(12),
    },
  }),
  ProductController.delete
);
//

module.exports = routes;
