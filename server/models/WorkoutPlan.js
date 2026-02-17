const mongoose = require('mongoose');

const workoutPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true }, // Plan belongs to a gym
    description: String,
    days: [{
        dayName: { type: String }, // e.g., 'Monday - Chest & Triceps'
        exercises: [{
            name: { type: String, required: true },
            sets: Number,
            reps: String,
            notes: String
        }]
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('WorkoutPlan', workoutPlanSchema);
