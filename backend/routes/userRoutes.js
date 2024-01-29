const router = require("express").Router();

const { addUser } = require('../controllers/userController')


// /http://localhost:5000/api/users
router.route("/adduser").post(addUser);

module.exports = router
