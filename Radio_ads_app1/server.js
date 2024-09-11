const express = require('express');
const connectDB = require('./config/db');
const cors = require('cors');
const path = require('path');


// Initialiser l'application
const app = express();

// Connecter à la base de données
connectDB();

// Middleware
app.use(cors());
app.use(express.json({ extended: false }));

// Routes
app.use('/api/users', require('./routes/userRoute')); 
app.use('/api/ads', require('./routes/adRoutes'));
app.use('/api/reservations', require('./routes/reservationRoutes'));
app.use('/api/payments', require('./routes/paymentRoutes'));
app.use('/api/slots', require('./routes/slotRoutes'));
app.use('/api/packages', require('./routes/packageRoutes'));
app.use('/uploads', express.static(path.join(__dirname, 'uploads')));



const PORT = process.env.PORT || 5000;

app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
