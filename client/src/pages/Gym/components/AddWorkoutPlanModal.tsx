import { useState } from 'react';
import axios from 'axios';
import {
    X,
    Dumbbell,
    Plus,
    Trash2,
    Loader2,
    AlertCircle,
    Activity,
    ClipboardList
} from 'lucide-react';
import { motion } from 'motion/react';

interface AddWorkoutPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddWorkoutPlanModal = ({ isOpen, onClose, onSuccess }: AddWorkoutPlanModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        description: '',
        days: [{ dayName: '', exercises: [{ name: '', sets: '', reps: '', weight: '' }] }]
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleDayChange = (dayIndex: number, field: string, value: string) => {
        const newDays = [...formData.days];
        newDays[dayIndex] = { ...newDays[dayIndex], [field]: value };
        setFormData({ ...formData, days: newDays });
    };

    const handleExerciseChange = (dayIndex: number, exIndex: number, field: string, value: string) => {
        const newDays = [...formData.days];
        const newExercises = [...newDays[dayIndex].exercises];
        newExercises[exIndex] = { ...newExercises[exIndex], [field]: value };
        newDays[dayIndex] = { ...newDays[dayIndex], exercises: newExercises };
        setFormData({ ...formData, days: newDays });
    };

    const addDay = () => {
        setFormData({
            ...formData,
            days: [...formData.days, { dayName: '', exercises: [{ name: '', sets: '', reps: '', weight: '' }] }]
        });
    };

    const removeDay = (index: number) => {
        if (formData.days.length === 1) return;
        setFormData({
            ...formData,
            days: formData.days.filter((_, i) => i !== index)
        });
    };

    const addExercise = (dayIndex: number) => {
        const newDays = [...formData.days];
        newDays[dayIndex].exercises = [...newDays[dayIndex].exercises, { name: '', sets: '', reps: '', weight: '' }];
        setFormData({ ...formData, days: newDays });
    };

    const removeExercise = (dayIndex: number, exIndex: number) => {
        if (formData.days[dayIndex].exercises.length === 1) return;
        const newDays = [...formData.days];
        newDays[dayIndex].exercises = newDays[dayIndex].exercises.filter((_, i) => i !== exIndex);
        setFormData({ ...formData, days: newDays });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('/api/gym/plans/workout', formData);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', description: '', days: [{ dayName: '', exercises: [{ name: '', sets: '', reps: '', weight: '' }] }] });
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error creating workout plan.');
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
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-3xl rounded-3xl overflow-hidden shadow-2xl my-8"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-950/50">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-[#ffd700]/10 rounded-xl flex items-center justify-center text-[#ffd700] border border-[#ffd700]/20">
                            <Dumbbell size={22} />
                        </div>
                        <div>
                            <h3 className="text-xl font-bold uppercase tracking-tight">Create Workout Plan</h3>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Physical Strategy</p>
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

                    <div className="space-y-4">
                        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
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
                                        placeholder="Ex: Hypertrophy Split Alpha"
                                        className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#ffd700] transition-all font-bold text-white placeholder-zinc-700"
                                    />
                                </div>
                            </div>
                            <div className="space-y-1.5">
                                <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Description</label>
                                <input
                                    type="text"
                                    name="description"
                                    value={formData.description}
                                    onChange={handleChange}
                                    placeholder="Brief goal of this program..."
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-[#ffd700] transition-all font-bold text-white placeholder-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="pt-4">
                            <div className="flex items-center justify-between mb-6">
                                <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest leading-none">Training Days</label>
                                <button
                                    type="button"
                                    onClick={addDay}
                                    className="text-[10px] font-black uppercase tracking-widest px-3 py-1.5 bg-[#ffd700]/10 text-[#ffd700] rounded-lg border border-[#ffd700]/20 hover:bg-[#ffd700] hover:text-black transition-all flex items-center gap-2"
                                >
                                    <Plus size={12} /> Add Day
                                </button>
                            </div>

                            <div className="space-y-6 max-h-[400px] overflow-y-auto pr-2 custom-scrollbar">
                                {formData.days.map((day, dIdx) => (
                                    <motion.div
                                        key={dIdx}
                                        initial={{ opacity: 0, y: 10 }}
                                        animate={{ opacity: 1, y: 0 }}
                                        className="bg-zinc-900/30 rounded-3xl border border-white/5 p-5 space-y-4 relative"
                                    >
                                        <div className="flex items-center gap-3">
                                            <input
                                                placeholder="Day Name (e.g., Push Day)"
                                                value={day.dayName}
                                                onChange={(e) => handleDayChange(dIdx, 'dayName', e.target.value)}
                                                className="bg-black/50 border border-white/5 rounded-xl py-2 px-4 text-xs font-black uppercase tracking-wider text-[#ffd700] focus:border-[#ffd700] focus:outline-none"
                                            />
                                            <button
                                                type="button"
                                                onClick={() => removeDay(dIdx)}
                                                className="p-2 text-zinc-700 hover:text-red-500 transition-colors"
                                            >
                                                <Trash2 size={16} />
                                            </button>
                                        </div>

                                        <div className="space-y-2">
                                            {day.exercises.map((ex, eIdx) => (
                                                <div key={eIdx} className="grid grid-cols-12 gap-2 items-center">
                                                    <div className="col-span-1 border-r border-white/5 flex justify-center text-[10px] font-black text-zinc-600">
                                                        {eIdx + 1}
                                                    </div>
                                                    <div className="col-span-5">
                                                        <input
                                                            placeholder="Exercise"
                                                            value={ex.name}
                                                            onChange={(e) => handleExerciseChange(dIdx, eIdx, 'name', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-3 text-[11px] font-bold text-white focus:border-[#ffd700] focus:outline-none"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <input
                                                            placeholder="Sets"
                                                            value={ex.sets}
                                                            onChange={(e) => handleExerciseChange(dIdx, eIdx, 'sets', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-3 text-[11px] font-bold text-white focus:border-[#ffd700] focus:outline-none text-center"
                                                        />
                                                    </div>
                                                    <div className="col-span-2">
                                                        <input
                                                            placeholder="Reps"
                                                            value={ex.reps}
                                                            onChange={(e) => handleExerciseChange(dIdx, eIdx, 'reps', e.target.value)}
                                                            className="w-full bg-black/20 border border-white/5 rounded-lg py-1.5 px-3 text-[11px] font-bold text-white focus:border-[#ffd700] focus:outline-none text-center"
                                                        />
                                                    </div>
                                                    <div className="col-span-1 flex justify-center">
                                                        <button
                                                            type="button"
                                                            onClick={() => removeExercise(dIdx, eIdx)}
                                                            className="text-zinc-800 hover:text-red-500 transition-colors"
                                                        >
                                                            <Trash2 size={14} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            <button
                                                type="button"
                                                onClick={() => addExercise(dIdx)}
                                                className="text-[9px] font-black uppercase tracking-widest text-zinc-600 hover:text-[#ffd700] transition-colors mt-2"
                                            >
                                                + Add Exercise
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
                            className="flex-[2] py-4 bg-[#ffd700] hover:bg-[#d4af37] disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-black transition-all shadow-xl shadow-[#ffd700]/20 flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : (
                                <>
                                    <span>Deploy Strategy</span>
                                    <Activity size={18} />
                                </>
                            )}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddWorkoutPlanModal;
