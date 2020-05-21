const mongoose = require('mongoose');

const questionDetails = mongoose.Schema({
  questions: {
    type: Array
  }
})

module.exports = mongoose.model('question', questionDetails);
