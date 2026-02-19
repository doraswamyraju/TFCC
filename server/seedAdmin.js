const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const User = require('./models/User');
const path = require('path');
const fs = require('fs');

// Load .env explicitly from the same directory
const envPath = path.join(__dirname, '.env');
if (fs.existsSync(envPath)) {
    require('dotenv').config({ path: envPath });
} else {
    require('dotenv').config(); // Fallback to current working directory
}

const seedSuperAdmin = async () => {
    try {
        const uri = process.env.MONGO_URI || 'mongodb://localhost:27017/tfcc';

        // Safety masking for logs
        const maskedUri = uri.replace(/\/\/.*@/, '//***:***@');
        console.log('--- SYSTEM OVERSEER INITIALIZATION ---');
        console.log('Connecting to Registry:', maskedUri);
        console.log('Environment Path:', envPath);
        console.log('Environment Loaded:', !!process.env.MONGO_URI ? 'YES' : 'NO (Using Default)');

        await mongoose.connect(uri, { serverSelectionTimeoutMS: 5000 });
        console.log('Connection to MongoDB established.');

        const email = 'admin@tfcc.com';
        const password = 'SuperSecureAdminPassword123!';

        console.log('Verifying identity registry...');
        let admin = await User.findOne({ email });
        if (admin) {
            console.log('Super Admin identity already verified in registry.');
            process.exit(0);
        }

        const Gym = require('./models/Gym');
        console.log('Ensuring System Infrastructure exists...');
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
            console.log('System Infrastructure initialized.');
        }

        console.log('Deploying Super Admin credentials...');
        admin = new User({
            name: 'FCC Super Admin',
            email,
            password: await bcrypt.hash(password, 10),
            role: 'super_admin',
            gymId: systemGym._id
        });

        await admin.save();
        console.log('--------------------------------------------------');
        console.log('SUPER ADMIN DEPLOYED SUCCESSFULLY');
        console.log(`Identifier: ${email}`);
        console.log(`Access Key: ${password}`);
        console.log('--------------------------------------------------');
        console.log('CRITICAL: Synchronize entry credentials immediately.');

        await mongoose.disconnect();
        process.exit(0);
    } catch (err) {
        console.error('--- DEPLOYMENT ABORTED ---');
        console.error('Reason:', err.message);
        if (err.message.includes('authentication') || err.message.includes('user')) {
            console.error('SECURITY ALERT: MongoDB authentication denied. Verify MONGO_URI in .env');
        }
        process.exit(1);
    }
};

seedSuperAdmin();
