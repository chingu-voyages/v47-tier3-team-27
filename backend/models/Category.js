const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema ({
    name: { type: String },
    subcategory: { type: Schema.Types.ObjectId, ref: 'Subcategory'}
})


module.exports = mongoose.model('Subcategory', Category )