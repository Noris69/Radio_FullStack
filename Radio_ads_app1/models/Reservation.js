const mongoose = require('mongoose');

const ReservationSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  slots: [
    {
      _id: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Slot',
      },
      confirmed: {
        type: Boolean,
        default: false,  // Field to track confirmation of the slot in reservation
      },
    }
  ],
  package: {
    _id: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Package',
    },
    name: {
      type: String,
    },
    cost: {
      type: String,
    },
    adSpots: {
      type: Number,
    },
    adLength: {
      type: Number,
    },
    duration: {
      type: String,
    }
  },
  adname: {
    type: String,
    required: true,
  },
  addomaine: {
    type: String,
    required: true,
  },
  totalPrice: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['لم يتم بعد', 'يتم', 'تم الإلغاء'],
    default: 'لم يتم بعد',
  },
  paymentStatus: {
    type: String,
    enum: ['لم يتم بعد', 'يتم', 'تم الإلغاء'],
    default: 'لم يتم بعد',
  },
  isPublished: {
    type: String,
    enum: ['لم يتم بعد', 'يتم', 'تم الإلغاء'],
    default: 'لم يتم بعد',
  },
  audioFile: {
    type: String, // Store the base64-encoded string
    required: true,
  },
  audioDuration: {
    type: Number,
    required: true,
  },
  created_at: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Reservation', ReservationSchema);
