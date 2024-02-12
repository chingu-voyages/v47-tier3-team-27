const categoryRouter = require('express').Router();

const { addCategory, getCategories, getCategoryById } = require("../controllers/categoryController")


// /http://localhost:5000/api/categories
categoryRouter.route("/add").post(addCategory);
categoryRouter.route("/all").get(getCategories);
categoryRouter.route("/get/:id").get(getCategoryById);


module.exports = categoryRouter;
