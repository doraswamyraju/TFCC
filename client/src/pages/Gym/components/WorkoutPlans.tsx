import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Plus,
    Dumbbell,
    Clock,
    Loader2,
    MoreVertical,
    Trophy
} from 'lucide-react';
import { motion } from 'motion/react';

interface WorkoutPlan {
    _id: string;
    name: string;
    description: string;
    days: any[];
    createdAt: string;
}

const WorkoutPlans = () => {
    const [plans, setPlans] = useState<WorkoutPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get('/api/gym/plans/workout');
                setPlans(res.data);
            } catch (err) {
                console.error('Error fetching workout plans', err);
            } finally {
                setLoading(false);
            }
        };
        fetchPlans();
    }, []);

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center">
                <h3 className="text-xl font-bold">Training Regimens</h3>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95">
                    <Plus size={20} />
                    Create Workout Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, x: -20 }}
                            animate={{ opacity: 1, x: 0 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-all group relative"
                        >
                            <div className="absolute top-4 right-4 text-zinc-600 group-hover:text-zinc-400">
                                <MoreVertical size={20} />
                            </div>
                            <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors">
                                <Dumbbell size={24} />
                            </div>
                            <h4 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors uppercase tracking-tight">{plan.name}</h4>
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-6">{plan.description || "No description provided."}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Clock size={14} />
                                    {new Date(plan.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Trophy size={14} />
                                    {plan.days?.length || 0} Days
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                        <Dumbbell className="mx-auto text-zinc-700 mb-4" size={48} />
                        <h4 className="text-lg font-semibold text-zinc-400">No workout programs yet</h4>
                        <p className="text-sm text-zinc-500 mt-1">Design intensive training programs for your trainees.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default WorkoutPlans;
