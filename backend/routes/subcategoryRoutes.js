const subcategoryRouter = require("express").Router();
const { authJwt } = require("../middlewares/authJWT.js");

const {
  addSubcategory,
  getSubcategories,
} = require("../controllers/subcategoryController");

// /http://localhost:5000/api/subcategories
subcategoryRouter.post("/add", [authJwt.verifyToken], addSubcategory);
subcategoryRouter.get("/all", [authJwt.verifyToken], getSubcategories);

module.exports = subcategoryRouter;
