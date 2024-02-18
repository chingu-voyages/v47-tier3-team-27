const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category");

//add a new subcategory:
//http://localhost:5000/api/subcategories/add
const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const newSubcategory = new Subcategory({
      name,
    });

    const savedSubcategory = await newSubcategory.save();

    const category = await Category.findById(categoryId);
    category.subcategories.push(savedSubcategory._id);
    await category.save();

    res.status(200).json(savedSubcategory);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

//display all existing subcategories:
//http://localhost:5000/api/subcategories/all
const getSubcategories = async (req, res) => {
  try {
    const allSubcategories = await Subcategory.find({});

    res.json(allSubcategories);
  } catch (error) {
    res.status(500).send({ message: error });
  }
};

module.exports = { addSubcategory, getSubcategories };
