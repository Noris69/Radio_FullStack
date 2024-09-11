const Payment = require('../models/Payment');

exports.createPayment = async (req, res) => {
  const { user_id, reservation_id, amount, method, status } = req.body;

  try {
    const newPayment = new Payment({
      user_id,
      reservation_id,
      amount,
      method,
      status,
      transaction_date: new Date(),
    });

    const payment = await newPayment.save();
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPayments = async (req, res) => {
  try {
    const payments = await Payment.find().populate('user_id reservation_id');
    res.json(payments);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.getPaymentById = async (req, res) => {
  try {
    const payment = await Payment.findById(req.params.id).populate('user_id reservation_id');
    if (!payment) {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.json(payment);
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Payment not found' });
    }
    res.status(500).send('Server error');
  }
};

// Mise à jour d'un paiement
exports.updatePayment = async (req, res) => {
    const { amount, method, status } = req.body;
    try {
      let payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({ msg: 'Payment not found' });
      }
  
      payment.amount = amount || payment.amount;
      payment.method = method || payment.method;
      payment.status = status || payment.status;
  
      await payment.save();
      res.json(payment);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  
  // Suppression d'un paiement
  exports.deletePayment = async (req, res) => {
    try {
      let payment = await Payment.findById(req.params.id);
      if (!payment) {
        return res.status(404).json({ msg: 'Payment not found' });
      }
  
      await payment.remove();
      res.json({ msg: 'Payment removed' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  };
  