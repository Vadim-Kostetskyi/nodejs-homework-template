require("dotenv").config();

const mongoose = require("mongoose");

const connectMongo = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URL);
  } catch (error) {
    console.log(error);
  }
};

module.exports = {
  connectMongo,
};
