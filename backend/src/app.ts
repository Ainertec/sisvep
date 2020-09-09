/* eslint-disable no-return-await */
/* eslint-disable no-unused-expressions */
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import * as bodyParser from 'body-parser';

import { routes } from './routes';

!process.env.NODE_ENV &&
  createConnection().then(async conn => await conn.runMigrations());

const app = express();
app.use(bodyParser.json());

app.use(routes);

// app.listen(3333);

export { app };
