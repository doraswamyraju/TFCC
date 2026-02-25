const mongoose = require('mongoose');

const EnquirySchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        lowercase: true
    },
    phone: {
        type: String,
        required: true
    },
    institution: {
        type: String,
        trim: true
    },
    category: {
        type: String,
        required: true,
        enum: ['university', 'athlete', 'sponsor', 'media', 'other']
    },
    message: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['pending', 'contacted', 'processed', 'archived'],
        default: 'pending'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Enquiry', EnquirySchema);
