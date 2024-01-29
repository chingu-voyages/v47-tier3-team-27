const express = require('express');
const router = express.Router()
const {Application_version} = require('../utils/constant/connections');
const { new_Task, all_task,search_label,date_search_task, stats_task } = require('../controller/task_controller');


router.route(`${Application_version}/tasks`)
        .post(new_Task)
        .get(all_task)
        .get(stats_task)

// fiter tasks by label 

router.route(`${Application_version}/tasks/:label` )
        .get(search_label)

// total task - total_task
router.route(`${Application_version}/tasks/stats` )
        .get(stats_task)
        
//  search date
router.route(`${Application_version}/:year/:month` )
        .get(date_search_task)



module.exports = router