const mongoose = require('mongoose');

const EventSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    date: {
        type: Date,
        required: true
    },
    location: {
        type: String,
        required: true,
        trim: true
    },
    image: {
        type: String,
        default: '/assets/placeholders/event-bg.jpg'
    },
    description: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['Competition', 'Seminar', 'Training', 'Meeting'],
        default: 'Competition'
    },
    link: {
        type: String,
        trim: true
    },
    status: {
        type: String,
        enum: ['upcoming', 'ongoing', 'completed', 'cancelled'],
        default: 'upcoming'
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('Event', EventSchema);
