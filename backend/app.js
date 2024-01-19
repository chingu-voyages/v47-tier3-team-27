const express = require("express");
const connectMongoDB = require("./config/db"); // require DB connection
const dotenv = require("dotenv");
const cors = require('cors')

// connectMongoDB();
dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
