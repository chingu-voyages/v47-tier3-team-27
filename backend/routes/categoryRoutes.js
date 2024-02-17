const categoryRouter = require("express").Router();
const { authJwt } = require("../middlewares/authJWT.js");

const {
  addCategory,
  getCategories,
  getCategoryById,
} = require("../controllers/categoryController");

// /http://localhost:5000/api/categories
categoryRouter.post("/add", [authJwt.verifyToken], addCategory);
categoryRouter.get("/all", [authJwt.verifyToken], getCategories);
categoryRouter.get("/get/:id", [authJwt.verifyToken], getCategoryById);

module.exports = categoryRouter;
