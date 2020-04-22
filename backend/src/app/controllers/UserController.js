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
};
