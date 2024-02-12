const mongoose = require("mongoose");
require("dotenv").config();
const uri = process.env.MONGO;

const connectMongoDB = async () => {
  try {
    await mongoose.connect(uri);
    const connection = mongoose.connection;
    connection.once("open", () => {
      console.log("MongoDB database connection established successfully");
    });
  } catch (error) {
    console.error(`Error: ${error.message}`);
    process.exit(1);
  }
};

module.exports = connectMongoDB;
