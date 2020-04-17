/* eslint-disable func-names */
// require('dotenv').config({
//   path: '.env',
// });
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password_hash: {
    type: String,
  },
  question: {
    type: String,
    required: true,
  },
  admin: {
    type: Boolean,
    required: true,
  },
  response: {
    type: String,
    required: true,
  },
});

UserSchema.virtual('password', { type: String, require: true });

UserSchema.pre('save', async function (next) {
  const hash = await bcrypt.hash(this.password, 8);
  this.password_hash = hash;

  next();
});

UserSchema.method('checkPassword', function (password) {
  return bcrypt.compare(password, this.password_hash);
});

UserSchema.method('generateToken', function () {
  return jwt.sign({ id: this._id }, process.env.APP_SECRET);
});

module.exports = mongoose.model('User', UserSchema);
