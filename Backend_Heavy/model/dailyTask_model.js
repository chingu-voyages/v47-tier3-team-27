const mongoose = require('mongoose');
const Schema = mongoose.Schema;


const UserSchema = new Schema({
    username: {
        type: String,
        required: true,
        minlength: 3,
        maxlength: 50,
        trim: true,
        unique: true,
        // You can add additional custom validation functions if needed
      },
      email: {
        type: String,
        required: true,
        unique: true,
        trim: true,
        lowercase: true,
        // You can add additional custom validation functions if needed
      },
      password: {
        type: String,
        required: true,
        minlength: 6,
        // You can add additional custom validation functions if needed
      },

})
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
