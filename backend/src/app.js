require('dotenv').config({
  path: '.env',
});
const express = require('express');
const mongoose = require('mongoose');
const { errors } = require('celebrate');
const routes = require('./routes');

const app = express();

// const url = process.env.NODE_ENV === 'test' ? process.env.MONGO_URL : process.env.DATABASE_URL;

// mongoose.connect(process.env.DATABASE_URL, {
//   useNewUrlParser: true,
//   useUnifiedTopology: true,
//   useCreateIndex: true,
//   useFindAndModify: false,
// });

app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = app;
