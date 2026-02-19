const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
require('dotenv').config();

const seedSuperAdmin = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI || 'mongodb://localhost:27017/tfcc');
        console.log('Connected to MongoDB...');

        const email = 'admin@tfcc.com';
        const password = 'SuperSecureAdminPassword123!'; // User should change this ASAP

        // Check if admin already exists
        let admin = await User.findOne({ email });
        if (admin) {
            console.log('Super Admin already exists.');
            process.exit(0);
        }

        // Create new Super Admin
        // Note: Super Admin might not need a gymId, but the model says it's required.
        // For now, we'll create a dummy Gym or use a reserved ID if the model allows null (checking model...)
        // Model: gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true }

        // Let's create a "System" gym first if it doesn't exist
        const Gym = require('./models/Gym');
        let systemGym = await Gym.findOne({ gymName: 'FCC SYSTEM' });
        if (!systemGym) {
            systemGym = new Gym({
                gymName: 'FCC SYSTEM',
                ownerName: 'ROOT',
                email: 'system@tfcc.com',
                password: await bcrypt.hash(Math.random().toString(36), 10),
                phone: '0000000000',
                address: 'CLOUD'
            });
            await systemGym.save();
            console.log('System Gym created.');
        }

        admin = new User({
            name: 'FCC Super Admin',
            email,
            password: await bcrypt.hash(password, salt = 10),
            role: 'super_admin',
            gymId: systemGym._id
        });

        await admin.save();
        console.log('--------------------------------------------------');
        console.log('SUPER ADMIN CREATED SUCCESSFULLY');
        console.log(`Email: ${email}`);
        console.log(`Password: ${password}`);
        console.log('--------------------------------------------------');
        console.log('CRITICAL: Please log in and change your password immediately.');

        process.exit(0);
    } catch (err) {
        console.error('Seeding failed:', err.message);
        process.exit(1);
    }
};

seedSuperAdmin();
