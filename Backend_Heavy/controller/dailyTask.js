const { User } = require("../model/dailyTask_model")


const  new_Task = async (req, res) => {
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



module.exports = {
    dailyTask
}