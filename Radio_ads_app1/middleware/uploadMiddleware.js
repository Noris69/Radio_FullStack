const multer = require('multer');
const ffmpeg = require('fluent-ffmpeg');
const path = require('path');

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, path.join(__dirname, '../uploads'));
  },
  filename: (req, file, cb) => {
    cb(null, `${Date.now()}-${file.originalname}`);
  }
});

const fileFilter = (req, file, cb) => {
  const ext = path.extname(file.originalname);
  if (ext !== '.mp3' && ext !== '.wav') {
    return cb(new Error('Only mp3 and wav files are allowed'), false);
  }
  cb(null, true);
};

const upload = multer({
  storage: storage,
  fileFilter: fileFilter
});

const checkAudioDuration = (req, res, next) => {
  if (!req.file) {
    return next(); // If no file is uploaded, move to the next middleware/controller
  }

  const packageAdLength = parseInt(req.body.adLength, 10);

  ffmpeg.ffprobe(req.file.path, (err, metadata) => {
    if (err) {
      console.error('Error processing audio file:', err);
      return res.status(500).json({ msg: 'Error processing audio file' });
    }

    const duration = metadata.format.duration;
    if (duration > packageAdLength) {
      return res.status(400).json({ msg: 'Audio file exceeds allowed duration' });
    }

    next();
  });
};

module.exports = { upload, checkAudioDuration };
