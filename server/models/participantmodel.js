const mongoose = require('mongoose');

const participantDetails = mongoose.Schema({
  name: {
    type: String,
    required: true
  },
  email: {
    type: String,
    required: true,
    unique: true
  },
  score: {
    type: Number,
    default: 0
  },
})

module.exports = mongoose.model('participant', participantDetails);
