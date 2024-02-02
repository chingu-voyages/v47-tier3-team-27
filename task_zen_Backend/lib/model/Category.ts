// Category.js
const mongoose = require('mongoose');

const categoryEnum = ['home', 'work', 'study', 'personal'];

const categorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        enum: categoryEnum,
    },
    // other fields related to the category...
});

const Category = mongoose.model('Category', categorySchema);

module.exports = Category;
