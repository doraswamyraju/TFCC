const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Event = require('../models/Event');
const StrongestHuman = require('../models/StrongestHuman');
const BlogPost = require('../models/BlogPost');
const GalleryItem = require('../models/GalleryItem');
const Enquiry = require('../models/Enquiry');

// Middleware to ensure it's a Super Admin
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied. Super Admin role required.' });
    }
};

// --- ENQUIRIES ---

// @route   GET api/admin/cms/enquiries
router.get('/enquiries', auth, adminAuth, async (req, res) => {
    try {
        const enquiries = await Enquiry.find().sort({ createdAt: -1 });
        res.json(enquiries);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// @route   PUT api/admin/cms/enquiries/:id
router.put('/enquiries/:id', auth, adminAuth, async (req, res) => {
    try {
        const enquiry = await Enquiry.findByIdAndUpdate(req.params.id, { status: req.body.status }, { new: true });
        res.json(enquiry);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- EVENTS ---

// @route   GET api/admin/cms/events
router.get('/events', async (req, res) => {
    try {
        const events = await Event.find().sort({ date: 1 });
        res.json(events);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/events', auth, adminAuth, async (req, res) => {
    try {
        const newEvent = new Event(req.body);
        const event = await newEvent.save();
        res.json(event);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.delete('/events/:id', auth, adminAuth, async (req, res) => {
    try {
        await Event.findByIdAndDelete(req.params.id);
        res.json({ msg: 'Event removed' });
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- STRONGEST HUMAN ---

router.get('/strongest-human', async (req, res) => {
    try {
        const athletes = await StrongestHuman.find().sort({ year: -1, rank: 1 });
        res.json(athletes);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/strongest-human', auth, adminAuth, async (req, res) => {
    try {
        const athlete = new StrongestHuman(req.body);
        await athlete.save();
        res.json(athlete);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- BLOG ---

router.get('/blog', async (req, res) => {
    try {
        const posts = await BlogPost.find({ status: 'published' }).sort({ publishedAt: -1 });
        res.json(posts);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/blog', auth, adminAuth, async (req, res) => {
    try {
        const post = new BlogPost(req.body);
        await post.save();
        res.json(post);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

// --- GALLERY ---

router.get('/gallery', async (req, res) => {
    try {
        const items = await GalleryItem.find().sort({ createdAt: -1 });
        res.json(items);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

router.post('/gallery', auth, adminAuth, async (req, res) => {
    try {
        const item = new GalleryItem(req.body);
        await item.save();
        res.json(item);
    } catch (err) {
        res.status(500).send('Server Error');
    }
});

module.exports = router;
