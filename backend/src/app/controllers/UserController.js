const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, password, question, response, admin } = req.body;

    const existUser = await User.findOne({ name });

    if (existUser) {
      return res.status(400).json({ message: 'User aready exist' });
    }

    const user = await User.create({
      name,
      password,
      question,
      response,
      admin,
    });
    return res.json(user);
  },
};
