const express = require("express");
const connectMongoDB = require("./config/db"); // require DB connection
const dotenv = require("dotenv");
const cors = require("cors");
const authRoutes = require("./routes/authRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const subcategoryRoutes = require("./routes/subcategoryRoutes");
const taskRoutes = require("./routes/taskRoutes");
const logRoutes = require("./routes/logRoutes");

connectMongoDB();

dotenv.config();
const app = express();

app.use(express.json());

app.use(cors());

//api routes
app.use("/api", authRoutes);
app.use("/api/categories", categoryRoutes);
app.use("/api/subcategories", subcategoryRoutes);
app.use("/api/tasks", taskRoutes);
app.use("/api/logs", logRoutes);

const port = process.env.PORT || 5000;

app.get("/", (req, res) => {
  res.send("Running");
});

app.listen(port, () => {
  console.log(`Server is running on port: ${port}`);
});
