const mongoose = require('mongoose');

const labelEnum = ['personal', 'work', 'shopping', 'urgent', 'important'];

const taskSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true,
    },
    description: {
        type: String,
        trim: true,
    },
    dueDate: {
        type: Date,
    },
    isComplete: {
        type: Boolean,
        default: false,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category',
    },
    priority: {
        type: String,
        enum: ['low', 'medium', 'high'],
        default: 'medium',
    },
    labels: {
        type: [{
            type: String,
            enum: labelEnum,
        }],
        default: [],
    },
});

const Task = mongoose.model('Task', taskSchema);

module.exports = Task;
