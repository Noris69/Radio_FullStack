const express = require('express');
const router = express.Router();
const { getSlots, bookSlot , createSlot} = require('../controllers/slotController');

router.get('/', getSlots);
router.post('/book', bookSlot);
router.post('/create', createSlot);


module.exports = router;
