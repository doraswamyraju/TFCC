const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const Gym = require('../models/Gym');
const User = require('../models/User');
const DietPlan = require('../models/DietPlan');
const WorkoutPlan = require('../models/WorkoutPlan');
const bcrypt = require('bcryptjs');

// Middleware to ensure it's a Gym
const gymAuth = (req, res, next) => {
    if (!req.gym) {
        return res.status(401).json({ msg: 'Authorization denied. Gym role required.' });
    }
    next();
};

// @route   GET api/gym/dashboard
// @desc    Get Gym Stats & Details
// @access  Private (Gym only)
router.get('/dashboard', auth, gymAuth, async (req, res) => {
    try {
        const memberCount = await User.countDocuments({ gymId: req.gym.id });
        const dietPlanCount = await DietPlan.countDocuments({ gymId: req.gym.id });
        const workoutPlanCount = await WorkoutPlan.countDocuments({ gymId: req.gym.id });

        const gym = await Gym.findById(req.gym.id).select('-password');
        res.json({ gym, stats: { memberCount, dietPlanCount, workoutPlanCount } });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/gym/members
// @desc    Get all members of the gym
// @access  Private (Gym only)
router.get('/members', auth, gymAuth, async (req, res) => {
    try {
        const members = await User.find({ gymId: req.gym.id }).select('-password').sort({ joinDate: -1 });
        res.json(members);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/gym/members
// @desc    Add a new member
// @access  Private (Gym only)
router.post('/members', auth, gymAuth, async (req, res) => {
    const { name, email, password, phone, role } = req.body; // role can be overridden by admin? No, force 'user'

    try {
        let user = await User.findOne({ email });
        if (user) {
            return res.status(400).json({ msg: 'User already exists' });
        }

        user = new User({
            name,
            email,
            password,
            phone,
            gymId: req.gym.id,
            role: 'user'
        });

        const salt = await bcrypt.genSalt(10);
        user.password = await bcrypt.hash(password, salt);

        await user.save();
        res.json(user);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/gym/plans/diet
// @desc    Get all diet plans
// @access  Private (Gym only)
router.get('/plans/diet', auth, gymAuth, async (req, res) => {
    try {
        const plans = await DietPlan.find({ gymId: req.gym.id }).sort({ createdAt: -1 });
        res.json(plans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/gym/plans/diet
// @desc    Create a diet plan
// @access  Private (Gym only)
router.post('/plans/diet', auth, gymAuth, async (req, res) => {
    const { name, description, meals } = req.body;
    try {
        const newPlan = new DietPlan({
            name,
            description,
            meals,
            gymId: req.gym.id
        });
        const plan = await newPlan.save();
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   GET api/gym/plans/workout
// @desc    Get all workout plans
// @access  Private (Gym only)
router.get('/plans/workout', auth, gymAuth, async (req, res) => {
    try {
        const plans = await WorkoutPlan.find({ gymId: req.gym.id }).sort({ createdAt: -1 });
        res.json(plans);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/gym/plans/workout
// @desc    Create a workout plan
// @access  Private (Gym only)
router.post('/plans/workout', auth, gymAuth, async (req, res) => {
    const { name, description, days } = req.body;
    try {
        const newPlan = new WorkoutPlan({
            name,
            description,
            days,
            gymId: req.gym.id
        });
        const plan = await newPlan.save();
        res.json(plan);
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
