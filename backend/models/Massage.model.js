const mongoose = require('mongoose');

const messageSchema = new mongoose.Schema({
  fullname: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [3, 'Name must be at least 3 characters long']
  },
  email: {
    type: String,
    required: true,
    unique: true,
    lowercase: true,
    trim: true,
    minlength: [10, 'Email must be at least 10 characters long']
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
});

const Message = mongoose.model('Message', messageSchema);
module.exports = Message;
