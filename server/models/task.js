const mongoose = require('mongoose');

const taskSchema = new mongoose.Schema({
  title: {
    type: String,
    minlength: 2,
    maxlength: 100,
    require: true
  },
  description: {
    type: String,
  },
  file: {
    type: String,
  }
});

module.exports = mongoose.model('task', taskSchema);