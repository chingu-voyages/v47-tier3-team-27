const subcategoryRouter = require("express").Router();

const {
  addSubcategory,
  getSubcategories,
} = require("../controllers/subcategoryController");

// /http://localhost:5000/api/subcategories
subcategoryRouter.route("/add").post(addSubcategory);
subcategoryRouter.route("/all").get(getSubcategories);

module.exports = subcategoryRouter;
