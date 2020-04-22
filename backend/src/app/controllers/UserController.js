const mongoose = require('mongoose');
const User = require('../models/User');
const { Questions } = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, password, question, response, admin } = req.body;
    const userId = req.userId;

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

    return res.json(user);
  },
};
