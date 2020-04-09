const routes = require('express').Router();
const ProductController = require('./app/controllers/ProductController');

routes.post('/products', ProductController.store);

module.exports = routes;
