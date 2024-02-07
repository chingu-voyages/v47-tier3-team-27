const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Log = new Schema ({
    user: { type: Schema.Types.ObjectId, ref: 'User'},
    taskid: { type: Schema.Types.ObjectId, ref: 'Task'},
    date: { type: Date },
    logDescription: { type: String }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Log', Log )