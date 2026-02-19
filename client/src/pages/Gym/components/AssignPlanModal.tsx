import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    X,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Activity,
    ChefHat,
    Save
} from 'lucide-react';
import { motion } from 'motion/react';

interface AssignPlanModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    member: any;
}

const AssignPlanModal = ({ isOpen, onClose, onSuccess, member }: AssignPlanModalProps) => {
    const [dietPlans, setDietPlans] = useState<any[]>([]);
    const [workoutPlans, setWorkoutPlans] = useState<any[]>([]);
    const [selectedDiet, setSelectedDiet] = useState('');
    const [selectedWorkout, setSelectedWorkout] = useState('');
    const [loading, setLoading] = useState(false);
    const [fetchLoading, setFetchLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        const fetchAllPlans = async () => {
            try {
                const [dietRes, workoutRes] = await Promise.all([
                    axios.get('/api/gym/plans/diet'),
                    axios.get('/api/gym/plans/workout')
                ]);
                setDietPlans(dietRes.data);
                setWorkoutPlans(workoutRes.data);

                if (member) {
                    setSelectedDiet(member.currentDietPlan?._id || member.currentDietPlan || '');
                    setSelectedWorkout(member.currentWorkoutPlan?._id || member.currentWorkoutPlan || '');
                }
            } catch (err) {
                console.error('Error fetching plans', err);
                setError('Failed to load available plans.');
            } finally {
                setFetchLoading(false);
            }
        };

        if (isOpen) {
            fetchAllPlans();
        }
    }, [isOpen, member]);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.put(`/api/gym/members/${member._id}`, {
                currentDietPlan: selectedDiet || null,
                currentWorkoutPlan: selectedWorkout || null
            });
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error assigning strategies.');
        } finally {
            setLoading(false);
        }
    };

    if (!isOpen) return null;

    return (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm">
            <motion.div
                initial={{ opacity: 0, scale: 0.95 }}
                animate={{ opacity: 1, scale: 1 }}
                className="bg-[#0a0a0a] border border-white/10 w-full max-w-lg rounded-3xl overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-white/5 flex justify-between items-center bg-zinc-950/50">
                    <div>
                        <h3 className="text-xl font-bold uppercase tracking-tight">Deploy Strategy</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Tactical Resource Allocation</p>
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
                            Strategies deployed successfully!
                        </div>
                    )}

                    <div className="space-y-6">
                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest flex items-center gap-2">
                                <ChefHat size={14} className="text-[#c41e3a]" />
                                Nutritional Protocol
                            </label>
                            <select
                                value={selectedDiet}
                                onChange={(e) => setSelectedDiet(e.target.value)}
                                disabled={fetchLoading}
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-[#0a0a0a] text-zinc-500">Unassigned / None</option>
                                {dietPlans.map(plan => (
                                    <option key={plan._id} value={plan._id} className="bg-[#0a0a0a] text-white">
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        </div>

                        <div className="space-y-3">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest flex items-center gap-2">
                                <Activity size={14} className="text-[#ffd700]" />
                                Physical Strategy
                            </label>
                            <select
                                value={selectedWorkout}
                                onChange={(e) => setSelectedWorkout(e.target.value)}
                                disabled={fetchLoading}
                                className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 px-4 focus:outline-none focus:border-[#ffd700] transition-all font-bold text-white appearance-none cursor-pointer"
                            >
                                <option value="" className="bg-[#0a0a0a] text-zinc-500">Unassigned / None</option>
                                {workoutPlans.map(plan => (
                                    <option key={plan._id} value={plan._id} className="bg-[#0a0a0a] text-white">
                                        {plan.name}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>

                    {fetchLoading && (
                        <div className="flex justify-center py-4">
                            <Loader2 size={24} className="animate-spin text-zinc-600" />
                        </div>
                    )}

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all text-xs border border-white/5"
                        >
                            Abort
                        </button>
                        <button
                            disabled={loading || isSuccess || fetchLoading}
                            className="flex-[2] py-4 bg-[#ffd700] hover:bg-[#d4af37] disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-black transition-all shadow-xl shadow-[#ffd700]/20 flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? <Loader2 className="animate-spin text-black" size={20} /> : (
                                <>
                                    <span>Initiate Transfer</span>
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

export default AssignPlanModal;
