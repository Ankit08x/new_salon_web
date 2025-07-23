const mongoose = require('mongoose');

const appointmentSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    trim: true,
    minlength: 3
  },
  phone: {
    type: String,
    required: true,
    trim: true,
    minlength: 10
  },
  message: {
    type: String,
    required: true,
    trim: true
  }
});

module.exports = mongoose.model('Appointment', appointmentSchema);
