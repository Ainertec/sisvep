/* eslint-disable func-names */
const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');

const Questions = Object.freeze({
  primeira: 'Qual o modelo do seu primeiro carro?',
  segunda: 'Qual o nome do seu melhor amigo de infância?',
  terceira: 'Qual o nome do seu primeiro animal de estimação?',
  quarta: 'Qual o nome da sua mãe?',
  quinta: 'Qual sua cor preferida?',
  getQuestions() {
    const ques = [this.primeira, this.segunda, this.terceira, this.quarta, this.quinta];
    return ques;
  },
});

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
    enum: Object.values(Questions),
    required: true,
  },
  admin: {
    type: Boolean,
    default: false,
  },
  response: {
    type: String,
    required: true,
  },
});

Object.assign(UserSchema.statics, {
  Questions,
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
