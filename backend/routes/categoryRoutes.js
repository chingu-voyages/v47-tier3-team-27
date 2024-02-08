const categoryRouter = require('express').Router();

const { addCategory, getCategories } = require("../controllers/categoryController")


// /http://localhost:5000/api/categories
categoryRouter.route("/add").post(addCategory);
categoryRouter.route("/all").get(getCategories);


module.exports = categoryRouter;
