const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/User');
const Reservation = require('../models/Reservation');
const fs = require('fs');
const path = require('path');

// Function to upload profile picture
exports.uploadProfilePic = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    if (!req.file) {
      return res.status(400).json({ msg: 'No file uploaded' });
    }

    // Assuming you're using multer for file handling
    const filePath = req.file.path;

    // Set the new profile picture
    user.profilePic = `${req.protocol}://${req.get('host')}/${filePath}`;

    await user.save();

    res.json({ msg: 'Profile picture updated successfully', profilePic: user.profilePic });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Delete a user by ID
exports.deleteUser = async (req, res) => {
  try {
    const user = await User.findByIdAndDelete(req.params.userId); // Find user by ID and delete
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }
    res.json({ msg: 'User deleted successfully' });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// Update a user by ID
exports.updateUser = async (req, res) => {
  const { username, email, phone, role } = req.body;

  try {
    let user = await User.findById(req.params.userId);
    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Update user fields
    user.username = username || user.username;
    user.email = email || user.email;
    user.phone = phone || user.phone;
    user.role = role || user.role;

    await user.save();

    res.json({ msg: 'User updated successfully', user });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


// Get all users
exports.getAllUsers = async (req, res) => {
  try {
    const users = await User.find(); // Fetch all users
    res.json(users);
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.loginUser = async (req, res) => {
  const { email, password } = req.body;

  try {
    let user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ msg: 'Invalid Credentials' });
    }

    const payload = {
      user: {
        id: user.id,
        role: user.role, // Include role in the token
      },
    };

    jwt.sign(payload, 'secret', { expiresIn: '5d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id, role: user.role });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};


exports.registerUser = async (req, res) => {
  const { username, email, password, phone } = req.body;
  
  try {
    let user = await User.findOne({ email });
    if (user) {
      return res.status(400).json({ msg: 'User already exists' });
    }

    user = new User({
      username,
      email,
      password,
      phone,
      role: 'annonceur',
    });

    const salt = await bcrypt.genSalt(10);
    user.password = await bcrypt.hash(password, salt);
    
    await user.save();

    const payload = {
      user: {
        id: user.id,
      },
    };

    jwt.sign(payload, 'secret', { expiresIn: '5d' }, (err, token) => {
      if (err) throw err;
      res.json({ token, userId: user.id });
    });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};

// controllers/userController.js

exports.getUserData = async (req, res) => {
  try {
    const user = await User.findById(req.params.userId);

    if (!user) {
      return res.status(404).json({ msg: 'User not found' });
    }

    // Fetch current and previous reservations
    let currentOrders = await Reservation.find({
      user_id: req.params.userId,
      status: 'لم يتم بعد',
    });

    let previousOrders = await Reservation.find({
      user_id: req.params.userId,
      status: { $ne: 'لم يتم بعد' },  // Fetch reservations that are not 'لم يتم بعد'
    });

    // Fetch total number of reservations
    const totalReservations = await Reservation.countDocuments({ user_id: req.params.userId });

    res.json({ user, currentOrders, previousOrders, totalReservations });
  } catch (err) {
    console.error(err.message);
    res.status(500).send('Server error');
  }
};




