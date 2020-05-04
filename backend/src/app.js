require('dotenv').config({
  path: '.env',
});
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

if (!process.env.NODE_ENV) {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}
app.use(compression());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
