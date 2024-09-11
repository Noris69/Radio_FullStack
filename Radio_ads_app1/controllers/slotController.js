const Slot = require('../models/Slot');
const mongoose = require('mongoose');

exports.getSlots = async (req, res) => {
  try {
    const slots = await Slot.find({ isBooked: false });
    res.json(slots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.bookSlot = async (req, res) => {
  const { slotId, userId, type, content } = req.body;

  try {
    let slot = await Slot.findById(slotId);
    if (!slot) {
      return res.status(404).json({ msg: 'Slot not found' });
    }

    if (slot.isBooked) {
      return res.status(400).json({ msg: 'Slot already booked' });
    }

    slot.isBooked = true;
    slot.bookingDetails = {
      userId: new mongoose.Types.ObjectId(userId),
      type,
      content,
    };

    await slot.save();
    res.json(slot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
exports.createSlot = async (req, res) => {
  const { date, startTime, endTime, cost } = req.body;

  try {
    // Conversion des chaînes ISO en objets Date
    const start = new Date(startTime);
    const end = new Date(endTime);
    const slotDate = new Date(date);

    // Validation des objets Date
    if (isNaN(start.getTime()) || isNaN(end.getTime()) || isNaN(slotDate.getTime())) {
      return res.status(400).json({ msg: 'Invalid date or time format' });
    }

    // Calcul de la durée en minutes
    const duration = Math.round((end - start) / 60000) + ' دقيقة';

    const newSlot = new Slot({
      date: new Date(slotDate),
      startTime: new Date(start),
      endTime: new Date(end),
      cost,
      duration,
      isPublished: true,
    });
    

    await newSlot.save();
    res.json(newSlot);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


