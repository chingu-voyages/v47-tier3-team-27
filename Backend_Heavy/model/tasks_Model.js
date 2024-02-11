const mongoose = require('mongoose');
const Invitation = require('./invitation_model');
const Schema = mongoose.Schema;



const UserSchema = new Schema({
    title: {
        type: String,
        required: true,
        minlength: [10, "title must be greater than 3 character"],
        maxlength: [150, "Task tilte must not be greate that 150 charcter use the description field for more input"],
        trim: true,
       
        // You can add additional custom validation functions if needed
      },
      description: {
        type: String,
        maxlength:[300, "Soory!, Description can not be more than 300 character"],
      },
      startDate: {
        type: Date,
      },
      dueDate: {
        type: Date,
      },
      isComplete: {
        type: Boolean,
        default: false,
      },
      dailyProgress: {
        type: String,
      },
      labels: {
        type: String,
        enum: [
            'Work',
            'Personal',
            'Urgent',
            'Important',
            'Meetings',
            'Health',
            'Errands',
            'Family',
            'Study',
            'Project',
            'Home',
            'Social',
            'Hobbies',
            'Travel',
            'Finance',
            'Calls/Emails',
            'Self-Care',
            'Tech',
            'Volunteer',
          ]
      },
      invitations: {
        type: [Invitation.schema],
      },
      
      
})
const User = mongoose.model('User', UserSchema);

module.exports = {
  User
}
