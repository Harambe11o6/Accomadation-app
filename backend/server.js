require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(express.json());

// CORS Configuration (Allow frontend requests)
app.use(cors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
    credentials: true
}));

// Connect to MongoDB with Error Handling
mongoose.connect(process.env.MONGO_URI || 'mongodb://127.0.0.1:27017/accommodation', {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
    .then(() => console.log("MongoDB Connected"))
    .catch(err => {
        console.error("MongoDB Connection Error:", err);
        process.exit(1);
    });

// Import Routes
const authRoutes = require('./routes/auth');
const accommodationRoutes = require('./routes/accommodations');

// Routes
app.get('/', (req, res) => {
    res.json({ message: 'Student Accommodation API Running' });
});

app.use('/api/auth', authRoutes);
app.use('/api/accommodations', accommodationRoutes);

// Error Handling Middleware
app.use((err, req, res, next) => {
    console.error("Server Error:", err.message);
    res.status(500).json({ error: "Internal Server Error" });
});

// Start Server
const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
