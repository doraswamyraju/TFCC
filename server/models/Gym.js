const mongoose = require('mongoose');

const gymSchema = new mongoose.Schema({
    gymName: { type: String, required: true },
    ownerName: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    phone: { type: String, required: true },
    address: { type: String },
    logo: { type: String }, // URL to logo image
    isVerified: { type: Boolean, default: false },
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('Gym', gymSchema);
