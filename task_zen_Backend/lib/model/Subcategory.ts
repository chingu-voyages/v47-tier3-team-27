const mongoose = require('mongoose');

const subCategoryColorEnum = ['#3498db', '#2ecc71', '#e74c3c', '#f39c12', '#9b59b6']; // Add your allowed color values

const subCategorySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        enum: ['Work', 'Personal', 'Shopping', 'Study', 'Other'],
    },
    description: {
        type: String,
        trim: true,
    },
    category: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Category', 
        required: true,
    },
    icon: {
        type: String,
        trim: true,
    },
    color: {
        type: String,
        trim: true,
        enum: subCategoryColorEnum,
    },
    
});

const SubCategory = mongoose.model('SubCategory', subCategorySchema);

module.exports = SubCategory;
