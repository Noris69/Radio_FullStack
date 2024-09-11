const express = require('express');
const router = express.Router();
const reservationController = require('../controllers/reservationController');
const auth = require('../middleware/auth');

router.get('/all', reservationController.getAllSlots);
router.get('/slots', reservationController.getSlotsByDate);

// Routes pour les réservations
router.post('/create',  reservationController.createReservation);
router.get('/',  reservationController.getReservations);
router.get('/:id',  reservationController.getReservationById);
router.put('/:id',  reservationController.updateReservation);
router.delete('/:id',  reservationController.deleteReservation);
router.put('/:reservationId/slot/:slotId/confirm', reservationController.updateSlotConfirmation);


module.exports = router;
