const mongoose = require('mongoose');

const PackageSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  duration: {
    type: String,
    required: true,
  },
  adSpots: {
    type: Number,
    required: true,
  },
  adLength: {
    type: Number,  
    required: true,
  },
  targetTimeSlots: {
    type: String,
    required: true,
  },
  contentType: {
    type: String,
    required: false,
  },
  additionalFeatures: {
    type: String,
  },
  cost: {
    type: Number,
    required: true,
  },
});

module.exports = mongoose.model('Package', PackageSchema);
