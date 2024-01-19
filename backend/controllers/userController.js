const User = require('../models/User')

const addUser = async (req, res) => {
    try {

        const { username, email, password, image } = req.body

        console.log(req.body)

        const newUser = new User( {
            email, password, username, image
        })

        await newUser.save()
        console.log('New User created successfully!')

        console.log('New ')

    } catch (error) {
        console.log(error)
    }

}


module.exports = { addUser }