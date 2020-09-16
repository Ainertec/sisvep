/* eslint-disable no-return-await */
/* eslint-disable no-unused-expressions */
import 'dotenv/config';
import 'reflect-metadata';
import { createConnection } from 'typeorm';
import express from 'express';
import http from 'http';
import socketio from 'socket.io';
import compression from 'compression';
import * as bodyParser from 'body-parser';

import { routes } from './routes';

!process.env.NODE_ENV &&
  createConnection().then(async conn => await conn.runMigrations());

const app = express();
const server = new http.Server(app);
const io = socketio(server);

const connectedUsers: { userId?: number } = {};
io.on('connection', socket => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});
app.use(compression());
app.use(bodyParser.json());
app.use(routes);

// app.listen(3333);

export { server as app };
