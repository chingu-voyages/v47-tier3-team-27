const Subcategory = require("../models/Subcategory");
const Category = require("../models/Category")

const addSubcategory = async (req, res) => {
  try {
    const { name, categoryId } = req.body;

    const newSubcategory = new Subcategory({
      name,
    });

    const category = await Category.findById(categoryId)

    await newSubcategory.save();

    category.subcategories.push(category)
    await category.save()


    console.log("New Subcategory created successfully!");
    res.status(200).send({ message: "Success" });


  } catch (error) {
    res.status(500).send({ message: error });
  }
};

const getSubcategories = async (req, res) => {
    try {
        const allSubcategories = await Subcategory.find({})
        
        res.json(allSubcategories)
        console.log(allSubcategories);

    } catch (error) {
        res.status(500).send({ message: error });
    }
}


module.exports = { addSubcategory, getSubcategories };
