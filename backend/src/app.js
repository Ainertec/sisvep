require('dotenv/config');
const express = require('express');
const mongoose = require('mongoose');
const compression = require('compression');
const { errors } = require('celebrate');

const socketio = require('socket.io');
const http = require('http');

const routes = require('./routes');

const app = express();
const server = http.Server(app);
const io = socketio(server);

if (!process.env.NODE_ENV) {
  mongoose.connect(process.env.DATABASE_URL, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
    useCreateIndex: true,
    useFindAndModify: false,
  });
}

const connectedUsers = {};

io.on('connection', (socket) => {
  const { userId } = socket.handshake.query;
  connectedUsers[userId] = socket.id;
});

app.use((req, res, next) => {
  req.io = io;
  req.connectedUsers = connectedUsers;

  return next();
});

app.use(compression());
app.use(express.json());
app.use(routes);
app.use(errors());

module.exports = server;
