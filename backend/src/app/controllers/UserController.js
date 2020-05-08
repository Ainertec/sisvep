/* eslint-disable no-param-reassign */
const mongoose = require('mongoose');
const User = require('../models/User');
const { Questions } = require('../models/User');

module.exports = {
  async getQuestion(req, res) {
    const questions = Questions.getQuestions();

    return res.json(questions);
  },
  async show(req, res) {
    const { name } = req.query;
    const { userId } = req;
    const user = await User.findOne({ _id: userId });

    if (!user.admin) {
      return res.status(400).json({ message: 'You cannot list user without admin privileges' });
    }

    const users = await User.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    users.forEach((userInterator) => {
      userInterator.password_hash = undefined;
      userInterator.response = undefined;
    });

    return res.json(users);
  },
  async index(req, res) {
    const { userId } = req;
    const user = await User.findOne({ _id: userId });

    if (!user.admin) {
      return res.status(400).json({ message: 'You cannot list user without admin privileges' });
    }

    const users = await User.find();

    users.forEach((userInterator) => {
      userInterator.password_hash = undefined;
      userInterator.response = undefined;
    });

    return res.json(users);
  },
  async store(req, res) {
    const { name, password, question, response, admin } = req.body;
    const { userId } = req;

    const questions = Questions.getQuestions();

    if (!questions.includes(question, 0)) {
      return res.status(400).json({ message: 'Invalid question.' });
    }

    const existUser = await User.findOne({ name });

    if (existUser) {
      return res.status(400).json({ message: 'User aready exist' });
    }

    const althenticatedUser = await User.findOne({ _id: userId });

    if (!althenticatedUser.admin) {
      return res.status(400).json({ message: 'You cannot create a user without admin privileges' });
    }

    const user = await User.create({
      name,
      password,
      question,
      response,
      admin,
    });
    user.password_hash = undefined;
    user.response = undefined;
    return res.json(user);
  },
  async update(req, res) {
    const { name, password, question, response, admin } = req.body;
    const { id } = req.query;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid user id` });
    }

    const user = await User.findOne({ _id: id });
    if (!user) return res.status(400).json('user does not exist');

    if (name) {
      const existUser = await User.findOne({ name });

      if (existUser) {
        return res.status(400).json({ message: 'User aready exist' });
      }
      user.name = name;
    }

    if (password) {
      user.password = password;
    }

    const authenticatedUser = await User.findOne({ _id: userId });

    if (authenticatedUser.admin) {
      user.admin = admin;
    }

    user.question = question;
    user.response = response;

    await user.save();

    user.password_hash = undefined;
    user.response = undefined;

    return res.json(user);
  },
  async delete(req, res) {
    const { id } = req.params;
    const { userId } = req;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid user id` });
    }

    if (userId === id) {
      await User.deleteOne({ _id: id });
      return res.status(200).send();
    }
    const user = await User.findOne({ _id: userId });
    if (!user.admin) {
      return res
        .status(400)
        .json({ message: 'You cannot delete another user without admin privileges' });
    }
    await User.deleteOne({ _id: id });
    return res.status(200).send();
  },
};
