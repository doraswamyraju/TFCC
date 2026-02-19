import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    X,
    Plus,
    Trash2,
    Loader2,
    CheckCircle2,
    AlertCircle,
    ChefHat,
    ClipboardList,
    Save
} from 'lucide-react';
import { motion } from 'motion/react';

interface EditDietPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    plan: any;
}

const EditDietPlanModal = ({ isOpen, onClose, onSuccess, plan }: EditDietPlanModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        meals: [{ type: 'Breakfast', items: [''], calories: '', protein: '', carbs: '', fats: '' }]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (plan) {
            setFormData({
                name: plan.name || '',
                description: plan.description || '',
                meals: plan.meals?.length > 0 ? plan.meals.map((m: any) => ({
                    type: m.type || 'Meal',
                    items: Array.isArray(m.items) ? m.items : [m.food || ''],
                    calories: m.calories || '',
                    protein: m.protein || '',
                    carbs: m.carbs || '',
                    fats: m.fats || ''
                })) : [{ type: 'Breakfast', items: [''], calories: '', protein: '', carbs: '', fats: '' }]
            });
        }
    }, [plan]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleMealChange = (index: number, field: string, value: any) => {
        const newMeals = [...formData.meals];
        newMeals[index] = { ...newMeals[index], [field]: value };
        setFormData({ ...formData, meals: newMeals });
    };

    const handleItemChange = (mealIndex: number, itemIndex: number, value: string) => {
        const newMeals = [...formData.meals];
        const newItems = [...newMeals[mealIndex].items];
        newItems[itemIndex] = value;
        newMeals[mealIndex].items = newItems;
        setFormData({ ...formData, meals: newMeals });
    };

    const addItem = (mealIndex: number) => {
        const newMeals = [...formData.meals];
        newMeals[mealIndex].items = [...newMeals[mealIndex].items, ''];
        setFormData({ ...formData, meals: newMeals });
    };

    const removeItem = (mealIndex: number, itemIndex: number) => {
        const newMeals = [...formData.meals];
        if (newMeals[mealIndex].items.length > 1) {
            newMeals[mealIndex].items = newMeals[mealIndex].items.filter((_: any, i: number) => i !== itemIndex);
            setFormData({ ...formData, meals: newMeals });
        }
    };

    const addMeal = () => {
        setFormData({
            ...formData,
            meals: [...formData.meals, { type: 'New Meal', items: [''], calories: '', protein: '', carbs: '', fats: '' }]
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
            await axios.put(`/api/gym/plans/diet/${plan._id}`, formData);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error updating diet plan.');
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
                            <h3 className="text-xl font-bold uppercase tracking-tight">Modify Strategy</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Nutritional Protocol Update</p>
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
                            Strategy updated successfully!
                        </div>
                    )}

                    <div className="space-y-4">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Strategy Codename</label>
                            <div className="relative">
                                <ClipboardList className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Tactical Intelligence</label>
                            <textarea
                                name="description"
                                value={formData.description}
                                onChange={handleChange}
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white min-h-[100px] resize-none"
                            />
                        </div>

                        <div className="pt-4">
                            <div className="flex items-center justify-between mb-4">
                                <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Meal Allocation</label>
                                <button
                                    type="button"
                                    onClick={addMeal}
                                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-[#ffd700]/10 text-[#ffd700] rounded-lg border border-[#ffd700]/20 hover:bg-[#ffd700] hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Plus size={12} /> Add Allocation
                                </button>
                            </div>

                            <div className="space-y-4 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {formData.meals.map((meal, mIdx) => (
                                    <motion.div
                                        key={mIdx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="p-6 bg-zinc-900/30 border border-white/5 rounded-[2rem] space-y-4 relative group/meal"
                                    >
                                        <div className="flex justify-between items-center">
                                            <div className="flex-1">
                                                <input
                                                    type="text"
                                                    placeholder="Meal Type (e.g., Breakfast)"
                                                    value={meal.type}
                                                    onChange={(e) => handleMealChange(mIdx, 'type', e.target.value)}
                                                    className="w-full bg-transparent border-none text-lg font-black uppercase tracking-tight text-[#ffd700] focus:ring-0 p-0 placeholder-zinc-700"
                                                />
                                            </div>
                                            <button
                                                type="button"
                                                onClick={() => removeMeal(mIdx)}
                                                className="p-2 text-zinc-700 hover:text-red-500 transition-colors opacity-0 group-hover/meal:opacity-100"
                                            >
                                                <Trash2 size={18} />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            <label className="text-[8px] font-black text-zinc-600 uppercase tracking-widest ml-1">Nutrient Components</label>
                                            <div className="space-y-2">
                                                {meal.items.map((item: string, iIdx: number) => (
                                                    <div key={iIdx} className="flex gap-2">
                                                        <input
                                                            type="text"
                                                            placeholder="Food item..."
                                                            value={item}
                                                            onChange={(e) => handleItemChange(mIdx, iIdx, e.target.value)}
                                                            className="flex-1 bg-black/40 border border-white/5 rounded-xl py-2 px-4 text-xs font-bold text-white focus:border-[#c41e3a] focus:outline-none placeholder-zinc-800"
                                                        />
                                                        {meal.items.length > 1 && (
                                                            <button
                                                                type="button"
                                                                onClick={() => removeItem(mIdx, iIdx)}
                                                                className="p-2 text-zinc-700 hover:text-red-500 transition-colors"
                                                            >
                                                                <X size={14} />
                                                            </button>
                                                        )}
                                                    </div>
                                                ))}
                                                <button
                                                    type="button"
                                                    onClick={() => addItem(mIdx)}
                                                    className="text-[9px] font-black text-[#c41e3a] uppercase tracking-widest flex items-center gap-1 hover:text-white transition-colors ml-1"
                                                >
                                                    <Plus size={10} /> Add Component
                                                </button>
                                            </div>
                                        </div>

                                        <div className="grid grid-cols-4 gap-3 pt-2">
                                            <div>
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-tighter ml-1">Kcal</label>
                                                <input
                                                    type="text"
                                                    placeholder="0"
                                                    value={meal.calories}
                                                    onChange={(e) => handleMealChange(mIdx, 'calories', e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-2 text-[10px] font-black text-white focus:border-[#c41e3a] focus:outline-none text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-tighter ml-1">Prot</label>
                                                <input
                                                    type="text"
                                                    placeholder="0g"
                                                    value={meal.protein}
                                                    onChange={(e) => handleMealChange(mIdx, 'protein', e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-2 text-[10px] font-black text-white focus:border-[#c41e3a] focus:outline-none text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-tighter ml-1">Carb</label>
                                                <input
                                                    type="text"
                                                    placeholder="0g"
                                                    value={meal.carbs}
                                                    onChange={(e) => handleMealChange(mIdx, 'carbs', e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-2 text-[10px] font-black text-white focus:border-[#c41e3a] focus:outline-none text-center"
                                                />
                                            </div>
                                            <div>
                                                <label className="text-[7px] font-black text-zinc-700 uppercase tracking-tighter ml-1">Fat</label>
                                                <input
                                                    type="text"
                                                    placeholder="0g"
                                                    value={meal.fats}
                                                    onChange={(e) => handleMealChange(mIdx, 'fats', e.target.value)}
                                                    className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-2 text-[10px] font-black text-white focus:border-[#c41e3a] focus:outline-none text-center"
                                                />
                                            </div>
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
                            Abort
                        </button>
                        <button
                            disabled={loading || isSuccess}
                            className="flex-[2] py-4 bg-[#c41e3a] hover:bg-[#a01830] disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-[#c41e3a]/20 flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <span>Commit Strategy</span>
                                    <Save size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default EditDietPlanModal;
