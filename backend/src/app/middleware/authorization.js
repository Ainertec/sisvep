const User = require('../models/User');

module.exports = async (req, res, next) => {
  const userId = req.userId;

  const user = await User.findOne({ _id: userId });

  if (!user.admin) {
    return res.status(401).json({ message: 'You do not have permission for ascess this route' });
  }

  return next();
};
