const mongoose = require('mongoose');

const GalleryItemSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
        trim: true
    },
    url: {
        type: String,
        required: true
    },
    type: {
        type: String,
        enum: ['image', 'video'],
        default: 'image'
    },
    category: {
        type: String,
        enum: ['Championship', 'Training', 'Events', 'Behind the Scenes'],
        default: 'Championship'
    },
    featured: {
        type: Boolean,
        default: false
    },
    createdAt: {
        type: Date,
        default: Date.now
    }
});

module.exports = mongoose.model('GalleryItem', GalleryItemSchema);
