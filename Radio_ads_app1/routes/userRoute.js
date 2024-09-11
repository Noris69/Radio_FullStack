const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const multer = require('multer');
// Multer setup for handling file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'uploads/');  // Save uploaded images to the 'uploads' folder
    },
    filename: function (req, file, cb) {
      cb(null, Date.now() + '-' + file.originalname);  // Give each file a unique name
    }
  });

  const upload = multer({ storage });



// Routes for users
router.post('/register', userController.registerUser);
router.post('/login', userController.loginUser);
router.get('/:userId', userController.getUserData);
router.get('/', userController.getAllUsers); // Route to get all users
router.put('/:userId', userController.updateUser); // Update user by ID
router.delete('/:userId', userController.deleteUser); // Route to delete a user
router.post('/:userId/uploadProfilePic', upload.single('profilePic'), userController.uploadProfilePic); // Route to upload profile picture


module.exports = router;
