const express = require('express');
const { getPackages, bookPackage } = require('../controllers/packageController');
const { upload, checkAudioDuration } = require('../middleware/uploadMiddleware');
const Package = require('../models/Package');

const router = express.Router();

router.get('/', getPackages);
// Create a new package
router.post('/', async (req, res) => {
    const { name, duration, adSpots, adLength, targetTimeSlots, cost } = req.body;
  
    try {
      const newPackage = new Package({
        name,
        duration,
        adSpots,
        adLength,
        targetTimeSlots,
        cost,
      });
  
      await newPackage.save();
      res.json(newPackage);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });

  // Update a package by ID
router.put('/:id', async (req, res) => {
    const { name, duration, adSpots, adLength, targetTimeSlots, cost } = req.body;
  
    try {
      const updatedPackage = await Package.findByIdAndUpdate(
        req.params.id,
        { name, duration, adSpots, adLength, targetTimeSlots, cost },
        { new: true, runValidators: true } // Return the updated document
      );
  
      if (!updatedPackage) {
        return res.status(404).json({ msg: 'Package not found' });
      }
  
      res.json(updatedPackage);
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  // Delete a package by ID
router.delete('/:id', async (req, res) => {
    try {
      const packageToDelete = await Package.findByIdAndDelete(req.params.id);
  
      if (!packageToDelete) {
        return res.status(404).json({ msg: 'Package not found' });
      }
  
      res.json({ msg: 'Package deleted successfully' });
    } catch (err) {
      console.error(err.message);
      res.status(500).send('Server error');
    }
  });
  
  
module.exports = router;
