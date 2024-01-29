const express = require("express");
const connectMongoDB = require("./config/db"); // require DB connection
const dotenv = require("dotenv");
const cors = require('cors')
const userRoutes = require('./routes/userRoutes')

connectMongoDB();

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

app.use('/api/users', userRoutes)

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
