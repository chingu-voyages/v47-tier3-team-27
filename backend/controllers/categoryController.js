const Category = require("../models/Category");

// create a new category:
// http://localhost:5000/api/categories/add
const addCategory = async (req, res) => {
  try {
    const { name } = req.body;

    const newCategory = new Category({
      name,
    });

    await newCategory.save();
    console.log("New Category created successfully!", newCategory);
    res.status(200).send({ message: "Success" });
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

// display all existing categories:
// http://localhost:5000/api/categories/all
const getCategories = async (req, res) => {
  try {
    const allCategories = await Category.find()
      .sort({ name: 1 })
      .populate("subcategories")
      .exec();

    res.json(allCategories);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};
// display single category and its linked subcategories:
// http://localhost:5000/api/categories/get/:id
const getCategoryById = async (req, res) => {
  try {
    const { id } = req.params;
    const category = await Category.findById(id)
      .populate("subcategories")
      .exec();
    res.json(category);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { addCategory, getCategories, getCategoryById };
