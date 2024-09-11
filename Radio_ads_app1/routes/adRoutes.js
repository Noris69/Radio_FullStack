const express = require('express');
const router = express.Router();
const adController = require('../controllers/adController');
const auth = require('../middleware/auth');

// Routes pour les annonces publicitaires
router.post('/create', auth, adController.createAd);
router.get('/', adController.getAds);
router.get('/:id', adController.getAdById);
router.put('/:id', auth, adController.updateAd);
router.delete('/:id', auth, adController.deleteAd);

module.exports = router;
