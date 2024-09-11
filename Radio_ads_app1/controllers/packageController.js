const Package = require('../models/Package');
const Reservation = require('../models/Reservation');
const path = require('path');
const ffmpeg = require('fluent-ffmpeg');

exports.getPackages = async (req, res) => {
  try {
    const packages = await Package.find();
    res.json(packages);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

exports.bookPackage = async (req, res) => {
  const { packageId, userId, type, content } = req.body;

  try {
    let package = await Package.findById(packageId);
    if (!package) {
      return res.status(404).json({ msg: 'Package not found' });
    }

    let newReservation;
    if (type === 'audio' && req.file) {
      const packageAdLength = package.adLength;

      ffmpeg.ffprobe(req.file.path, async (err, metadata) => {
        if (err) {
          console.error('Error processing audio file:', err);
          return res.status(500).json({ msg: 'Error processing audio file' });
        }

        const duration = metadata.format.duration;
        if (duration > packageAdLength) {
          return res.status(400).json({ msg: 'Audio file exceeds allowed duration' });
        }

        const contentUrl = `/uploads/${req.file.filename}`;
        newReservation = new Reservation({
          user_id: userId,
          package_id: packageId,
          status: 'en attente',
          created_at: new Date(),
          contentUrl: contentUrl
        });

        const reservation = await newReservation.save();
        res.json({ msg: 'Package booked successfully', reservation });
      });
    } else if (type === 'text') {
      newReservation = new Reservation({
        user_id: userId,
        package_id: packageId,
        status: 'en attente',
        created_at: new Date(),
        contentText: content
      });

      const reservation = await newReservation.save();
      res.json({ msg: 'Package booked successfully', reservation });
    } else {
      return res.status(400).json({ msg: 'Invalid request. Please upload an audio file or provide text content.' });
    }
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};
