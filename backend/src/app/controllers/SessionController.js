const User = require('../models/User');

module.exports = {
  async store(req, res) {
    const { name, password } = req.body;

    const user = await User.findOne({ name });
    if (!user) {
      return res.status(401).json({ message: 'User not found' });
    }

    if (!(await user.checkPassword(password))) {
      return res.status(401).json({ message: 'Incorrect password' });
    }
    user.password_hash = undefined;
    return res.json({
      user,
      token: user.generateToken(),
    });
  },
};
