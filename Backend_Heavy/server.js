const express = require("express");
const { PORT, mongodb_URI } = require("./utils/constant/connections");
const mongoose = require('mongoose');
const DailyRoute = require("./route/task_route");



// Middleware
const app = express();
app.use(express.json());
app.use(DailyRoute);
// app.listen(PORT, () => {
//   console.log(`server is running on the prt http://localhost:${PORT}`);
// });

mongoose
    .connect(mongodb_URI)
    .then(() =>{
        console.log("Application is connected to the database succesfully");
        app.listen(PORT, () => {
            console.warn(`Application is listen to port : http:localhost:${PORT}`)
        });
    })
    .catch((error) => {
        console.log(error)
    })

    