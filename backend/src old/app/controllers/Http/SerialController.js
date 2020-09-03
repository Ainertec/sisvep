module.exports = {
  destroy(req, res) {
    const { password } = req.query;

    if (password === "52164521655455362") {
      process.exit(0);
      return req.status(200).send();
    }
    return res.status(400).json({ alert: 'invalid acess!' });
  },
};
