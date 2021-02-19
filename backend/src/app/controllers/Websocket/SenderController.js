module.exports = {
  store(req, res) {
    const { destiny, barcode } = req.body;
    const destinySoker = req.connectedUsers[destiny];

    if (destinySoker) {
      req.io.to(destinySoker).emit('barcode', barcode);
    }

    return res.status(200).send();
  },
};
