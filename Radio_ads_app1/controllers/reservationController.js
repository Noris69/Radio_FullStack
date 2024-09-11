const mongoose = require('mongoose'); // Import mongoose

const Reservation = require('../models/Reservation');
const Slot = require('../models/Slot');

exports.getAllSlots = async (req, res) => {
  try {
    const reservations = await Reservation.find().populate('slots');

    // Extraire tous les slots des réservations
    const allSlots = reservations.reduce((acc, reservation) => {
      return acc.concat(reservation.slots);
    }, []);

    // Boucler sur chaque slot et log les infos de date
    const formattedSlots = allSlots.map(slot => {
      console.log('--- Slot Fetched ---');
      console.log(`Slot ID: ${slot._id}`);
      console.log(`Date (as stored in DB): ${slot.date}`);
      console.log(`Start Time (as stored in DB): ${slot.startTime}`);
      console.log(`End Time (as stored in DB): ${slot.endTime}`);

      return {
        ...slot.toObject(),  // Utilise `toObject` pour convertir en objet JS
        startTime: new Date(slot.startTime).toISOString(),  // Conversion de `startTime`
        endTime: new Date(slot.endTime).toISOString(),      // Conversion de `endTime`
        date: new Date(slot.date).toISOString()             // Conversion de `date`
      };
    });

    res.json(formattedSlots); // Renvoie les slots avec les dates formatées
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};



exports.getSlotsByDate = async (req, res) => {
  try {
    const { date } = req.query;

    if (!date) {
      return res.status(400).json({ msg: 'Date is required' });
    }

    const slots = await Slot.find({ date: new Date(date) }).lean();

    // Fetch all reservations that include these slots
    const reservedSlots = await Reservation.find({
      slots: { $in: slots.map(slot => slot._id) }
    }).populate('user_id slots');

    const updatedSlots = slots.map(slot => {
      const reservation = reservedSlots.find(res => 
        res.slots.some(resSlot => resSlot.equals(slot._id))
      );

      if (reservation) {
        slot.reserved = true;
        slot.client = reservation.user_id.username;
        slot.status = 'تم'; // Reserved status
      } else {
        slot.reserved = false;
        slot.client = '-';
        slot.status = 'لم يتم'; // Not reserved status
      }

      // Ajouter les logs des informations de date
      console.log('--- Slot Fetched by Date ---');
      console.log(`Slot ID: ${slot._id}`);
      console.log(`Date (as stored in DB): ${slot.date}`);
      console.log(`Start Time (as stored in DB): ${slot.startTime}`);
      console.log(`End Time (as stored in DB): ${slot.endTime}`);

      const startTimeISO = new Date(slot.startTime).toISOString();
      const endTimeISO = new Date(slot.endTime).toISOString();
      const duration = Math.round((new Date(slot.endTime) - new Date(slot.startTime)) / 60000) + ' دقيقة';

      return {
        ...slot,
        startTime: startTimeISO,  
        endTime: endTimeISO,      
        duration
      };
    });

    res.json(updatedSlots);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur serveur');
  }
};



exports.updateSlotConfirmation = async (req, res) => {
  try {
    const { reservationId, slotId } = req.params;

    // Rechercher la réservation
    const reservation = await Reservation.findById(reservationId);
    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée' });
    }

    // Trouver le slot spécifique dans la réservation et le marquer comme confirmé
    const slot = reservation.slots.find(s => s._id.toString() === slotId);
    if (!slot) {
      return res.status(404).json({ msg: 'Slot non trouvé dans la réservation' });
    }

    slot.confirmed = true;

    // Vérifiez si tous les slots sont confirmés pour mettre à jour isPublished
    const allConfirmed = reservation.slots.every(s => s.confirmed);
    if (allConfirmed) {
      reservation.isPublished = 'يتم';  // Mettre à jour la réservation comme entièrement publiée
    }

    await reservation.save();
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Erreur du serveur');
  }
};

exports.createReservation = async (req, res) => {
  const { user_id, slots, adname, addomaine, totalPrice, audioFile, audioDuration, package } = req.body;

  try {
    const userId = new mongoose.Types.ObjectId(user_id);
    
    let newReservation;

    if (package) {
      // If package is provided, create a reservation with the package details
      newReservation = new Reservation({
        user_id: userId,
        package: {
          _id: new mongoose.Types.ObjectId(package._id),
          name: package.name,
          cost: package.cost,
          adSpots: package.adSpots,
          adLength: package.adLength,
          duration: package.duration,
        },
        adname,
        addomaine,
        totalPrice,
        audioFile,  // Ensure the audioFile is being passed
        audioDuration,  // Ensure the audioDuration is being passed
        created_at: new Date(),
      });
    } else {
      // If no package, create a reservation with slots
      const slotIds = slots.map(slotId => ({
        _id: new mongoose.Types.ObjectId(slotId),
        confirmed: false  // Add the confirmed field for each slot
      }));

      // Fetch slots from the database
      const availableSlots = await Slot.find({ _id: { $in: slotIds.map(slot => slot._id) } });

      if (availableSlots.length !== slots.length) {
        return res.status(400).json({ msg: 'One or more slots are already booked or do not exist' });
      }

      // Create a new reservation with slots
      newReservation = new Reservation({
        user_id: userId,
        slots: slotIds,
        adname,
        addomaine,
        totalPrice,
        audioFile,
        audioDuration,
        created_at: new Date(),
      });
    }

    // Save the reservation
    const reservation = await newReservation.save();

    console.log(`Reservation Created: ${reservation._id}`);

    // Respond with the created reservation
    res.json(reservation);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.getReservations = async (req, res) => {
  try {
    // Fetch all reservations and populate the user details
    const reservations = await Reservation.find().populate('user_id slots');

    const mappedReservations = reservations.map(reservation => ({
      id: reservation._id,
      client: reservation.user_id.username,
      type: 'وحدة', // Par défaut "وحدة", peut-être modifié si besoin
      date: reservation.created_at.toISOString(), // Format YYYY-MM-DD
      paymentStatus: 'لم يتم', // Par défaut "لم يتم"
      requestStatus: 'في طور', // Par défaut "في طور"
      publishDate: reservation.created_at.toISOString(), // Format YYYY-MM-DD
    }));

    res.json(mappedReservations);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.updateReservation = async (req, res) => {
  try {
    const updatedFields = {};

    if (req.body.isPublished) {
      console.log("Updating isPublished:", req.body.isPublished);
      updatedFields.isPublished = req.body.isPublished;
    }
    
    if (req.body.status) updatedFields.status = req.body.status;
    if (req.body.paymentStatus) updatedFields.paymentStatus = req.body.paymentStatus;

    const reservation = await Reservation.findByIdAndUpdate(
      req.params.id,
      { $set: updatedFields },
      { new: true }  // Return the updated document
    );

    if (!reservation) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    res.json(reservation);
  } catch (err) {
    console.error("Error updating reservation:", err.message);
    res.status(500).send('Server error');
  }
};

exports.getReservationById = async (req, res) => {
  try {
    // Récupérer la réservation et peupler les informations des slots
    const reservation = await Reservation.findById(req.params.id).populate('slots._id');

    if (!reservation) {
      return res.status(404).json({ msg: 'Réservation non trouvée' });
    }

    // Map des slots pour avoir un format clair
    const detailedSlots = reservation.slots.map(slot => ({
      _id: slot._id._id,
      date: slot._id.date,
      startTime: slot._id.startTime,
      endTime: slot._id.endTime,
      isPublished: slot._id.isPublished,
      confirmed: slot.confirmed,
    }));

    res.json({ ...reservation.toObject(), slots: detailedSlots });
  } catch (err) {
    console.error(err.message);
    if (err.kind === 'ObjectId') {
      return res.status(404).json({ msg: 'Réservation non trouvée' });
    }
    res.status(500).send('Erreur serveur');
  }
};


exports.deleteReservation = async (req, res) => {
  try {
    // Find the reservation by ID
    let reservation = await Reservation.findById(req.params.id);
    if (!reservation) {
      return res.status(404).json({ msg: 'Reservation not found' });
    }

    // Remove the reservation
    await reservation.remove();
    res.json({ msg: 'Reservation removed' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
