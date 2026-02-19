const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Gym = require('../models/Gym');
const User = require('../models/User');

// Middleware to ensure it's a Super Admin
const adminAuth = (req, res, next) => {
    if (req.user && req.user.role === 'super_admin') {
        next();
    } else {
        res.status(403).json({ msg: 'Access denied. Super Admin role required.' });
    }
};

// @route   GET api/admin/stats
// @desc    Get Global System Stats
// @access  Private (Super Admin only)
router.get('/stats', auth, adminAuth, async (req, res) => {
    try {
        const totalGyms = await Gym.countDocuments();
        const totalMembers = await User.countDocuments({ role: { $ne: 'super_admin' } });
        const activeGyms = totalGyms; // Can be refined later with status

        res.json({
            totalGyms,
            totalMembers,
            activeGyms
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/admin/gyms
// @desc    Get All Gyms with member counts
// @access  Private (Super Admin only)
router.get('/gyms', auth, adminAuth, async (req, res) => {
    try {
        const gyms = await Gym.find().select('-password');

        // Add member counts to each gym
        const gymsWithStats = await Promise.all(gyms.map(async (gym) => {
            const memberCount = await User.countDocuments({ gymId: gym._id, role: 'user' });
            return {
                ...gym._doc,
                memberCount
            };
        }));

        res.json(gymsWithStats);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   DELETE api/admin/gyms/:id
// @desc    Remove a Gym and its members
// @access  Private (Super Admin only)
router.delete('/gyms/:id', auth, adminAuth, async (req, res) => {
    try {
        const gymId = req.params.id;

        // Find and delete gym
        const gym = await Gym.findByIdAndDelete(gymId);
        if (!gym) {
            return res.status(404).json({ msg: 'Gym not found' });
        }

        // Delete all users associated with this gym
        await User.deleteMany({ gymId });

        res.json({ msg: 'Gym and associated members removed successfully' });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
