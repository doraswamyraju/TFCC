const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const path = require('path');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 5003;

// Middleware
app.use(cors());

// DEBUG: Log raw body to debug JSON errors
app.use(express.text({ type: 'application/json' }));
app.use((req, res, next) => {
    if (req.headers['content-type']?.includes('application/json') && typeof req.body === 'string') {
        console.log('--- RAW BODY RECIEVED ---');
        console.log(req.body);
        try {
            req.body = JSON.parse(req.body);
            console.log('JSON Parse Successful');
        } catch (e) {
            console.error('JSON Parse Failed:', e.message);
            return res.status(400).json({ error: 'Invalid JSON', details: e.message, raw: req.body });
        }
    }
    next();
});

// app.use(bodyParser.json()); 
app.use(bodyParser.urlencoded({ extended: true }));

// JSON Parse Error Handler
app.use((err, req, res, next) => {
    if (err instanceof SyntaxError && err.status === 400 && 'body' in err) {
        console.error('Bad JSON:', err.message);
        return res.status(400).send({ status: 400, message: 'Invalid JSON payload' });
    }
    next();
});

// Database Connection
mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tfcc')
    .then(() => console.log('MongoDB Connected'))
    .catch(err => console.log('MongoDB Connection Error:', err));

// API Routes
app.get('/api/health', (req, res) => {
    res.json({ status: 'OK', message: 'TFCC Backend is running' });
});

// Auth & Gym Routes
app.use('/api/auth', require('./routes/auth'));
app.use('/api/gym', require('./routes/gym'));
app.use('/api/user', require('./routes/user'));

// Serve Frontend (Production)
if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '../client/dist')));

    app.get('*', (req, res) => {
        res.sendFile(path.join(__dirname, '../client/dist/index.html'));
    });
}

app.listen(PORT, () => {
    console.log(`Server running on port ${PORT}`);
});
