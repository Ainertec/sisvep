const routes = require('express').Router();
const { celebrate, Joi, Segments } = require('celebrate');
const ProductController = require('./app/controllers/ProductController');

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

/**
 * @param name:String
 * @description sem parâmetro lista todos
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

routes.get('/products_validity', ProductController.show);

module.exports = routes;
