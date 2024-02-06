// const User = require("../models/User");

// const addUser = async (req, res) => {
//   try {
//     const { username, email, password, image } = req.body;

//     console.log(req.body);

//     const newUser = new User({
//       email,
//       password,
//       username,
//       image,
//     });

//     await newUser.save();
//     console.log("New User created successfully!");
//   } catch (error) {
//     console.log(error);
//   }
// };

// module.exports = { addUser };


const Category = require("../models/Category")




// http://localhost:5000/api/categories/add
const addCategory = async (req, res) => {
    try {
        const { name,} = req.body;

        const newCategory = new Category({
          name
        });
    
        await newCategory.save();
        console.log("New Category created successfully!");
        res.status(200).send({ message: "Success" });
        
    } catch (error) {
        res.status(500).send({ message: error });
    }
}




// http://localhost:5000/api/categories/all
const getCategories = async (req, res) => {
    try {
        const allCategories = await Category.find({})
        .populate('subcategories')
        .exec();
        
        res.json(allCategories)
        console.log(allCategories);

    } catch (error) {
        res.status(500).send({ message: error });
    }
}


module.exports = { addCategory, getCategories }