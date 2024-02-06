const mongoose = require('mongoose')
const Schema = mongoose.Schema

const Category = new Schema ({
    name: { type: String },
    subcategories: [{ type: Schema.Types.ObjectId, ref: 'Subcategory'}]
})


module.exports = mongoose.model('Category', Category )