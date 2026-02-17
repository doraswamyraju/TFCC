const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Gym = require('../models/Gym');
const User = require('../models/User');

// @route   POST api/auth/register-gym
// @desc    Register a new Gym
// @access  Public
router.post('/register-gym', async (req, res) => {
    const { gymName, ownerName, email, password, phone, address } = req.body;

    try {
        let gym = await Gym.findOne({ email });
        if (gym) {
            return res.status(400).json({ msg: 'Gym already exists with this email' });
        }

        gym = new Gym({
            gymName,
            ownerName,
            email,
            password,
            phone,
            address
        });

        const salt = await bcrypt.genSalt(10);
        gym.password = await bcrypt.hash(password, salt);

        await gym.save();

        const payload = {
            gym: {
                id: gym.id
            }
        };

        jwt.sign(
            payload,
            process.env.JWT_SECRET,
            { expiresIn: '5d' },
            (err, token) => {
                if (err) throw err;
                res.json({ token, role: 'gym', user: { name: gymName, email } });
            }
        );
    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

// @route   POST api/auth/login
// @desc    Authenticate Gym or User & get token
// @access  Public
router.post('/login', async (req, res) => {
    const { email, password } = req.body;

    try {
        // 1. Check if it's a Gym
        let gym = await Gym.findOne({ email });
        if (gym) {
            const isMatch = await bcrypt.compare(password, gym.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                gym: {
                    id: gym.id
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, role: 'gym', user: { name: gym.gymName, email } });
                }
            );
            return;
        }

        // 2. Check if it's a User
        let user = await User.findOne({ email });
        if (user) {
            const isMatch = await bcrypt.compare(password, user.password);
            if (!isMatch) {
                return res.status(400).json({ msg: 'Invalid Credentials' });
            }

            const payload = {
                user: {
                    id: user.id,
                    gymId: user.gymId
                }
            };

            jwt.sign(
                payload,
                process.env.JWT_SECRET,
                { expiresIn: '5d' },
                (err, token) => {
                    if (err) throw err;
                    res.json({ token, role: 'user', user: { name: user.name, email } });
                }
            );
            return;
        }

        res.status(400).json({ msg: 'Invalid Credentials' });

    } catch (err) {
        console.error(err.message);
        res.status(500).send('Server Error');
    }
});

module.exports = router;
