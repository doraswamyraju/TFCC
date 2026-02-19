const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
    name: { type: String, required: true },
    email: { type: String, required: true, unique: true },
    password: { type: String, required: true }, // Store hashed passwords
    role: { type: String, enum: ['user', 'gym_admin', 'super_admin'], default: 'user' },
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true }, // Helper to link user to their gym
    joinDate: { type: Date, default: Date.now },
    currentDietPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'DietPlan' },
    currentWorkoutPlan: { type: mongoose.Schema.Types.ObjectId, ref: 'WorkoutPlan' },
    phone: { type: String }
});

module.exports = mongoose.model('User', userSchema);
