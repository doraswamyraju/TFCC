import { useState } from 'react';
import axios from 'axios';
import {
    X,
    Plus,
    Trash2,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChefHat,
    ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';

interface AddDietPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddDietPlanModal = ({ isOpen, onClose, onSuccess }: AddDietPlanModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        meals: [{ time: '', food: '', notes: '' }]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleMealChange = (index: number, field: string, value: string) => {
        const newMeals = [...formData.meals];
        newMeals[index] = { ...newMeals[index], [field]: value };
        setFormData({ ...formData, meals: newMeals });
    };

    const addMeal = () => {
        setFormData({
            ...formData,
            meals: [...formData.meals, { time: '', food: '', notes: '' }]
        });
    };

    const removeMeal = (index: number) => {
        if (formData.meals.length === 1) return;
        setFormData({
            ...formData,
            meals: formData.meals.filter((_, i) => i !== index)
        });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('/api/gym/plans/diet', formData);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', description: '', meals: [{ time: '', food: '', notes: '' }] });
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error creating diet plan.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm overflow-y-auto">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-2xl rounded-3xl overflow-hidden shadow-2xl my-8"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#c41e3a]/10 rounded-xl flex items-center justify-center text-[#c41e3a] border border-[#c41e3a]/20">
                            <ChefHat size={22} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-tight">Create Diet Plan</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Nutritional Protocol</p>
                        </div>
                    </div>
                    <button onClick={onClose} className="p-2 hover:bg-white/5 rounded-xl transition-colors text-zinc-500 hover:text-white">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-8 space-y-6">
                    {error && (
                        <div className="flex items-center gap-3 p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-2xl text-sm font-bold animate-pulse">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex items-center gap-3 p-4 bg-green-500/10 border border-green-500/20 text-green-500 rounded-2xl text-sm font-bold">
                            <CheckCircle2 size={18} />
                            Plan created successfully!
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Plan Name</label>
                            <div className="relative">
                                <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Ex: Shredding Protocol V1"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white placeholder-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Description</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                placeholder="Purpose of this diet plan..."
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white placeholder-zinc-700 min-h-[100px] resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Meal Schedule</label>
                                <button
                                    type="button"
                                    onClick={addMeal}
                                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-[#ffd700]/10 text-[#ffd700] rounded-lg border border-[#ffd700]/20 hover:bg-[#ffd700] hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Plus size={12} /> Add Meal
                                </button>
                            </div>

                            <div className="space-y-3 max-h-[300px] overflow-y-auto pr-2 custom-scrollbar">
                                {formData.meals.map((meal, index) => (
                                    <motion.div
                                        key={index}
                                        initial={{ opacity: 0, x: -10 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        className="grid grid-cols-12 gap-3 items-center bg-zinc-900/30 p-3 rounded-2xl border border-white/5"
                                    >
                                        <div className="col-span-3">
                                            <input
                                                type="text"
                                                placeholder="08:00 AM"
                                                value={meal.time}
                                                onChange={(e) => handleMealChange(index, 'time', e.target.value)}
                                                className="w-full bg-black/50 border border-white/5 rounded-xl py-2 px-3 text-xs font-bold text-white focus:border-[#c41e3a] focus:outline-none"
                                            />
                                        </div>
                                        <div className="col-span-8">
                                            <input
                                                type="text"
                                                placeholder="Oatmeal + Protein Shake"
                                                value={meal.food}
                                                onChange={(e) => handleMealChange(index, 'food', e.target.value)}
                                                className="w-full bg-black/50 border border-white/5 rounded-xl py-2 px-3 text-xs font-bold text-white focus:border-[#c41e3a] focus:outline-none"
                                            />
                                        </div>
                                        <div className="col-span-1 flex justify-center">
                                            <button
                                                type="button"
                                                onClick={() => removeMeal(index)}
                                                className="text-zinc-700 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>
                                    </motion.div>
                                ))}
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all text-xs border border-white/5"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading || isSuccess}
                            className="flex-[2] py-4 bg-[#c41e3a] hover:bg-[#a01830] disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-[#c41e3a]/20 flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <span>Deploy Strategy</span>
                                    <ChefHat size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddDietPlanModal;
