/* eslint-disable func-names */
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },

  password_hash: {
    type: String,
    select: false,
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

UserSchema.methods.checkPassword = function (password) {
  return bcrypt.compare(password, this.password_hash);
};

module.exports = mongoose.model('User', UserSchema);
