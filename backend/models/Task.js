const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Task = new Schema ({
    name: { type: String, required: true },
    taskDescription: { type: String, required: true },
    isCompleted: { type: Boolean, required: true },
    deadline: { type: Date },
    days: [],
    users:[{ type: Schema.Types.ObjectId, ref: 'User', required: true}],
    history: [{ type: Schema.Types.ObjectId, ref: 'Log'}],
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory', required: true},
    priority: { type: Number }
}, {
    timestamps: true,
})


module.exports = mongoose.model('Task', Task )