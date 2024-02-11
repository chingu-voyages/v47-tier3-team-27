const { User } = require("../model/tasks_Model");

/* create new task 
@method: - POST
@RETURN: - 201 
*/


const new_Task = async (req, res) => {
        try {
    //    const { title, description, startDate, dueDate, isComplete, dailyProgress, labels, invitations } = req.body;
       const newUserTask = new User(req.body);

       // Save the new user task to the database
       const savedUserTask = await newUserTask.save();
   
       res.status(201).json({
         status: 'success',
         message: 'Task created successfully',
         data: savedUserTask,
       }); 

        } catch (error) {
            res.status(404).json({
                "error": "Could not create task",
                "redirect": "http://localhost:8089/api/v27/"
            })
        }
}

const all_task = async (req, res) => {
    try {
        // id validation here
        const test_data = await User.find()
        res.status(200).json(test_data)
    } catch (error) {
        console.error(error);
        res.status(500).json({ error: 'Internal Server Error' });
    }
};
const search_label = async (req, res) => {
    try {
      const { label } = req.params;
  
      // Validate label if needed
      if (!label) {
        return res.status(400).json({ error: 'Label parameter is required' });
      }
  
      // Retrieve tasks with the specified label from the database
      const tasks = await User.find({ labels: label });
  
      // Send the tasks as a JSON response
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  };


const date_search_task = async (req, res) => {
    try {
      const { year, month } = req.params;
  
      // Validate year and month if needed
      if (!year || !month) {
        return res.status(400).json({ error: 'Year and month parameters are required' });
      }
  
      // Construct a date range for the month
      const startDate = new Date(`${year}-${month}-01T00:00:00Z`);
      const endDate = new Date(`${year}-${parseInt(month, 10) + 1}-01T00:00:00Z`);
  
      // Retrieve tasks within the specified date range from the database
      const tasks = await User.find({
        startDate: { $gte: startDate, $lt: endDate }
      });
  
      // Send the tasks as a JSON response
      res.json(tasks);
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

const stats_task = async (req, res) => {
    try {
     // id validation here
     const test_data = await User.find()
     res.status(200).json(test_data)
    } catch (error) {
      console.error(error);
      res.status(500).json({ error: 'Internal Server Error' });
    }
  }

module.exports = {
    new_Task,
    all_task,
    search_label,
    stats_task,
    date_search_task,
  
  
}