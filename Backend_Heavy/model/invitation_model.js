// invitationSchema.js
const mongoose = require('mongoose');

const invitationSchema = new mongoose.Schema({
  invitee: {
    type: String, 
    required: true,
  },
  message: {
    type: String,
  },
});

const Invitation = mongoose.model('Invitation', invitationSchema);

module.exports = Invitation;