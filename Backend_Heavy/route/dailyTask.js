const express = require('express');
const router = express.Router()
const { dailyTask } = require("../controller/dailyTask")
const {Application_version} = require('../utils/constant/connections')


router.route(`${Application_version}/`)
        .get(dailyTask)


module.exports = router