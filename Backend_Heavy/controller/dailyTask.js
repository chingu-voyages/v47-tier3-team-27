const { User } = require("../model/dailyTask_model")


const  dailyTask = async (req, res) => {
    try {
        const data = await User.find({})
        res.send({
            "data": data
        })
    } catch (error) {
        console.log(error.message)
        res.status(500).send({
            message: error.message
        })
    }
   
}


//@Route - '/api/v1/24/' 
//@desc - 
//@Method - GET


module.exports = {
    dailyTask
}