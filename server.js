// server.js

require('dotenv').config(); // Load environment variables
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const port = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Allows parsing of JSON request bodies

// MongoDB Connection
const uri = process.env.MONGO_URI;
mongoose.connect(uri)
    .then(() => console.log('MongoDB connected successfully!'))
    .catch(err => console.error('MongoDB connection error:', err));

// Import routes
const itemsRouter = require('./routes/items'); // Make sure this path is correct

// Integrate routes
app.use('/items', itemsRouter); // All requests to /items will use itemsRouter

// Basic Route
app.get('/', (req, res) => {
    res.send('Hello from the MERN backend!');
});

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});