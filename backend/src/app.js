const express = require('express');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
