const mongoose = require('mongoose');

const PaymentSchema = new mongoose.Schema({
  user_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User',
    required: true,
  },
  reservation_id: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Reservation',
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  method: {
    type: String,
    enum: ['carte bancaire', 'Wafacash', 'virement'],
    required: true,
  },
  status: {
    type: String,
    enum: ['en attente', 'réussi', 'échoué'],
    default: 'en attente',
  },
  transaction_date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Payment', PaymentSchema);
