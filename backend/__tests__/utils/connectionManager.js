const mongoose = require('mongoose');

module.exports = {
  async openConnection() {
    if (!process.env.MONGO_URL) {
      throw new Error('MongoDb server not initializaded');
    }
    await mongoose.connect(process.env.MONGO_URL, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: false,
    });
  },
  async closeConnection() {
    await mongoose.connection.close();
  },
};
