const mongoose = require('mongoose');

const dietPlanSchema = new mongoose.Schema({
    name: { type: String, required: true },
    gymId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gym', required: true }, // Plan belongs to a gym
    description: String,
    meals: [{
        type: { type: String }, // e.g., 'Breakfast', 'Lunch', 'Dinner', 'Snack'
        items: [String], // Array of food items
        calories: Number,
        protein: String,
        carbs: String,
        fats: String
    }],
    createdAt: { type: Date, default: Date.now }
});

module.exports = mongoose.model('DietPlan', dietPlanSchema);
