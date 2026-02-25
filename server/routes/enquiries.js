const express = require('express');
const router = express.Router();
const Enquiry = require('../models/Enquiry');

// @route   POST api/enquiries
// @desc    Submit a new competition enquiry
// @access  Public
router.post('/', async (req, res) => {
    try {
        const { name, email, phone, institution, category, message } = req.body;

        if (!name || !email || !phone || !category || !message) {
            return res.status(400).json({ msg: 'Please provide all required fields.' });
        }

        const newEnquiry = new Enquiry({
            name,
            email,
            phone,
            institution,
            category,
            message
        });

        const enquiry = await newEnquiry.save();
        res.json(enquiry);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
