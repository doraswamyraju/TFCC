const express = require('express');
const router = express.Router();
const auth = require('../middleware/auth');
const User = require('../models/User');
const DietPlan = require('../models/DietPlan');
const WorkoutPlan = require('../models/WorkoutPlan');
const Gym = require('../models/Gym');

// Middleware to ensure it's a User
const userAuth = (req, res, next) => {
    if (req.user) next();
    else return res.status(401).json({ msg: 'Authorization denied. User role required.' });
};

// @route   GET api/user/dashboard
// @desc    Get User Dashboard Data
// @access  Private (User only)
router.get('/dashboard', auth, userAuth, async (req, res) => {
    try {
        const user = await User.findById(req.user.id).select('-password');
        if (!user) return res.status(404).json({ msg: 'User not found' });

        let gym = null;
        if (user.gymId) {
            gym = await Gym.findById(user.gymId).select('gymName logo address phone');
        }

        let dietPlan = null;
        if (user.currentDietPlan) {
            dietPlan = await DietPlan.findById(user.currentDietPlan);
        }

        let workoutPlan = null;
        if (user.currentWorkoutPlan) {
            workoutPlan = await WorkoutPlan.findById(user.currentWorkoutPlan);
        }

        res.json({
            user,
            gym,
            dietPlan,
            workoutPlan
        });
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
