const mongoose = require('mongoose');

const StrongestHumanSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true
    },
    gender: {
        type: String,
        required: true,
        enum: ['Male', 'Female']
    },
    year: {
        type: Number,
        required: true
    },
    title: {
        type: String,
        required: true,
        default: 'Champion'
    },
    image: {
        type: String,
        default: '/assets/placeholders/athlete.jpg'
    },
    achievements: [String],
    rank: {
        type: Number,
        default: 1
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('StrongestHuman', StrongestHumanSchema);
