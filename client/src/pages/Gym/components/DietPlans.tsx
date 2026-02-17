import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Plus,
    Utensils,
    Clock,
    Loader2,
    ChefHat,
    MoreVertical
} from 'lucide-react';
import { motion } from 'motion/react';

interface DietPlan {
    _id: string;
    name: string;
    description: string;
    meals: any[];
    createdAt: string;
}

const DietPlans = () => {
    const [plans, setPlans] = useState<DietPlan[]>([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPlans = async () => {
            try {
                const res = await axios.get('/api/gym/plans/diet');
                setPlans(res.data);
            } catch (err) {
                console.error('Error fetching diet plans', err);
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
                <h3 className="text-xl font-bold">Nutritional Programs</h3>
                <button className="flex items-center gap-2 px-6 py-2.5 bg-red-600 hover:bg-red-700 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 active:scale-95">
                    <Plus size={20} />
                    Create Diet Plan
                </button>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {plans.length > 0 ? (
                    plans.map((plan, index) => (
                        <motion.div
                            key={plan._id}
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            transition={{ delay: index * 0.1 }}
                            className="bg-zinc-900 border border-zinc-800 rounded-2xl p-6 hover:border-red-600 transition-all group relative"
                        >
                            <div className="absolute top-4 right-4 text-zinc-600 group-hover:text-zinc-400">
                                <MoreVertical size={20} />
                            </div>
                            <div className="w-12 h-12 bg-red-600/10 rounded-xl flex items-center justify-center text-red-500 mb-4 group-hover:bg-red-600 group-hover:text-white transition-colors text-ellipsis overflow-hidden">
                                <ChefHat size={24} />
                            </div>
                            <h4 className="text-lg font-bold mb-2 group-hover:text-red-500 transition-colors">{plan.name}</h4>
                            <p className="text-sm text-zinc-500 line-clamp-2 mb-6">{plan.description || "No description provided."}</p>

                            <div className="flex items-center justify-between pt-4 border-t border-zinc-800">
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Clock size={14} />
                                    {new Date(plan.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-xs text-zinc-400">
                                    <Utensils size={14} />
                                    {plan.meals?.length || 0} Meals
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full bg-zinc-900/50 border border-zinc-800 border-dashed rounded-2xl p-12 text-center">
                        <Utensils className="mx-auto text-zinc-700 mb-4" size={48} />
                        <h4 className="text-lg font-semibold text-zinc-400">No diet plans created yet</h4>
                        <p className="text-sm text-zinc-500 mt-1">Start by creating a nutritional program for your members.</p>
                    </div>
                )}
            </div>
        </div>
    );
};

export default DietPlans;
