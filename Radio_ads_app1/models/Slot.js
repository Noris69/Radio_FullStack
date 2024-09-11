const mongoose = require('mongoose');

const SlotSchema = new mongoose.Schema({
  date: {
    type: Date,
    required: true,
  },
  startTime: {
    type: Date,
    required: true,
  },
  endTime: {
    type: Date,
    required: true,
  },
  isBooked: {
    type: Boolean,
    default: false,
  },
  cost: {
    type: String,
    required: true,
  },
  duration: {
    type: String, // Store the duration as a string like "30 minutes"
  },
  isPublished: {
    type: Boolean,
    default: false,
  },
  
});

module.exports = mongoose.model('Slot', SlotSchema);
