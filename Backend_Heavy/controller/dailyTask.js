const  dailyTask =(req, res) => {
    try {
        res.send("<h1>Daily building bock</h1>")
    } catch (error) {
        console.log(error)
    }
   
}


module.exports = {
    dailyTask
}