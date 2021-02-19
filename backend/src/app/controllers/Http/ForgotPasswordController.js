const User = require('../../models/User');

module.exports = {
  async show(req, res) {
    const { name } = req.query;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    return res.status(200).json({ question: user.question });
  },

  async store(req, res) {
    const { name, response, password } = req.body;

    const user = await User.findOne({ name });

    if (!user) {
      return res.status(401).json({ message: 'User does not exist' });
    }

    if (response !== user.response) {
      return res.status(401).json({ message: 'Incorret response' });
    }

    user.password = password;

    await user.save();

    return res.status(200).send();
  },
};
