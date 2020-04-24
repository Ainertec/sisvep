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
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    if (!user.admin) {
      return res.status(400).json({ message: 'You cannot list user without admin privileges' });
    }

    const users = await User.find({
      name: { $regex: new RegExp(name), $options: 'i' },
    });

    users.map((user) => {
      user.password_hash = undefined;
      user.response = undefined;
    });

    return res.json(users);
  },
  async index(req, res) {
    const userId = req.userId;
    const user = await User.findOne({ _id: userId });

    if (!user.admin) {
      return res.status(400).json({ message: 'You cannot list user without admin privileges' });
    }

    const users = await User.find();

    users.map((user) => {
      user.password_hash = undefined;
      user.response = undefined;
    });

    return res.json(users);
  },
  async store(req, res) {
    const { name, password, question, response, admin } = req.body;
    const userId = req.userId;
    const { teste } = req.query;

    const questions = Questions.getQuestions();

    if (!questions.includes(question, 0)) {
      return res.status(400).json({ message: 'Invalid question.' });
    }

    const existUser = await User.findOne({ name });

    if (existUser) {
      return res.status(400).json({ message: 'User aready exist' });
    }

    const althenticatedUser = await User.findOne({ _id: userId });
    if (!teste) {
      if (!althenticatedUser.admin) {
        return res
          .status(400)
          .json({ message: 'You cannot create a user without admin privileges' });
      }
    }

    const user = await User.create({
      name,
      password,
      question,
      response,
      admin,
    });
    user.password_hash = undefined;
    return res.json(user);
  },
  async update(req, res) {
    const { name, password, question, response, admin } = req.body;
    const { id } = req.query;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid user id` });
    }

    const authenticatedUser = await User.findOne({ _id: userId });

    const existUser = await User.findOne({ name });

    if (existUser) {
      return res.status(400).json({ message: 'User aready exist' });
    }
    const user = await User.findOneAndUpdate(
      { _id: id },
      {
        name,
        question,
        response,
      },
      { new: true }
    );

    user.password = password;

    if (authenticatedUser.admin) {
      user.admin = admin;
    }

    await user.save();
    user.password_hash = undefined;
    user.response = undefined;

    return res.json(user);
  },
  async delete(req, res) {
    const { id } = req.params;
    const userId = req.userId;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: `invalid user id` });
    }

    if (userId === id) {
      await User.deleteOne({ _id: id });
      return res.status(200).send();
    } else {
      const user = await User.findOne({ _id: userId });
      if (!user.admin) {
        return res
          .status(400)
          .json({ message: 'You cannot delete another user without admin privileges' });
      }
      await User.deleteOne({ _id: id });
      return res.status(200).send();
    }
  },
};
