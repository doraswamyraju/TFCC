import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Plus,
    Utensils,
    Clock,
    Loader2,
    ChefHat,
    MoreVertical,
    Trash2,
    Edit2
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import AddDietPlanModal from './AddDietPlanModal';
import EditDietPlanModal from './EditDietPlanModal';

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
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isEditModalOpen, setIsEditModalOpen] = useState(false);
    const [selectedPlan, setSelectedPlan] = useState<DietPlan | null>(null);
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchPlans = async () => {
        try {
            setLoading(true);
            const res = await axios.get('/api/gym/plans/diet');
            setPlans(res.data);
        } catch (err) {
            console.error('Error fetching diet plans', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchPlans();
    }, []);

    const handleDelete = async (id: string) => {
        if (!window.confirm('Are you sure you want to delete this plan?')) return;
        setIsDeleting(id);
        try {
            await axios.delete(`/api/gym/plans/diet/${id}`);
            setPlans(plans.filter(p => p._id !== id));
        } catch (err) {
            console.error('Error deleting plan', err);
            alert('Failed to delete plan');
        } finally {
            setIsDeleting(null);
            setOpenMenuId(null);
        }
    };

    if (loading) {
        return (
            <div className="flex items-center justify-center min-h-[400px]">
                <Loader2 className="animate-spin text-red-600" size={32} />
            </div>
        );
    }

    return (
        <div className="space-y-6">
            <div className="flex justify-between items-center bg-[#0a0a0a] p-2 rounded-2xl">
                <div>
                    <h3 className="text-2xl font-black uppercase tracking-tight text-white italic">Nutritional Strategy</h3>
                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Global Dietary Catalog</p>
                </div>
                <button
                    onClick={() => setIsModalOpen(true)}
                    className="flex items-center gap-2 px-6 py-3 bg-[#c41e3a] hover:bg-[#a01830] text-white rounded-xl font-black uppercase tracking-widest text-xs transition-all shadow-xl shadow-[#c41e3a]/20 active:scale-95"
                >
                    <Plus size={18} />
                    Create Strategy
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
                            <div className="absolute top-4 right-4 z-20">
                                <button
                                    onClick={() => setOpenMenuId(openMenuId === plan._id ? null : plan._id)}
                                    className={`p-2 rounded-lg transition-all ${openMenuId === plan._id ? 'bg-white/10 text-white' : 'text-zinc-600 hover:text-white hover:bg-white/5'}`}
                                >
                                    <MoreVertical size={18} />
                                </button>

                                <AnimatePresence>
                                    {openMenuId === plan._id && (
                                        <>
                                            <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                            <motion.div
                                                initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                animate={{ opacity: 1, scale: 1, y: 0 }}
                                                exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                className="absolute right-0 mt-2 w-48 bg-[#0a0a0a] border border-white/10 rounded-xl shadow-2xl z-20 py-1.5 overflow-hidden"
                                            >
                                                <button
                                                    onClick={() => {
                                                        setSelectedPlan(plan);
                                                        setIsEditModalOpen(true);
                                                        setOpenMenuId(null);
                                                    }}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-zinc-400 hover:bg-white/5 hover:text-white transition-colors uppercase tracking-widest"
                                                >
                                                    <Edit2 size={14} />
                                                    Edit Plan
                                                </button>
                                                <div className="h-px bg-white/5 my-1" />
                                                <button
                                                    onClick={() => handleDelete(plan._id)}
                                                    disabled={isDeleting === plan._id}
                                                    className="w-full flex items-center gap-3 px-4 py-2 text-xs font-bold text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50 uppercase tracking-widest"
                                                >
                                                    {isDeleting === plan._id ? (
                                                        <Loader2 size={14} className="animate-spin" />
                                                    ) : (
                                                        <Trash2 size={14} />
                                                    )}
                                                    Remove Plan
                                                </button>
                                            </motion.div>
                                        </>
                                    )}
                                </AnimatePresence>
                            </div>

                            <div className="w-14 h-14 bg-[#c41e3a]/5 rounded-2xl flex items-center justify-center text-[#c41e3a] mb-6 border border-[#c41e3a]/10 group-hover:bg-[#c41e3a] group-hover:text-white transition-all duration-300 transform group-hover:rotate-6">
                                <ChefHat size={28} />
                            </div>
                            <h4 className="text-xl font-black mb-2 text-white group-hover:text-[#c41e3a] transition-colors uppercase tracking-tight italic">{plan.name}</h4>
                            <p className="text-sm text-zinc-500 font-medium line-clamp-2 mb-8 leading-relaxed italic">{plan.description || "Experimental protocol metadata not specified."}</p>

                            <div className="flex items-center justify-between pt-5 border-t border-white/5">
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-zinc-600">
                                    <Clock size={12} className="text-[#c41e3a]" />
                                    {new Date(plan.createdAt).toLocaleDateString()}
                                </div>
                                <div className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd700] bg-[#ffd700]/5 px-3 py-1 rounded-full border border-[#ffd700]/10">
                                    <Utensils size={12} />
                                    {plan.meals?.length || 0} Meals
                                </div>
                            </div>
                        </motion.div>
                    ))
                ) : (
                    <div className="col-span-full bg-zinc-900/10 border border-white/5 border-dashed rounded-3xl p-16 text-center">
                        <div className="w-20 h-20 bg-zinc-900/50 rounded-full flex items-center justify-center mb-6 mx-auto border border-white/5">
                            <Utensils className="text-zinc-800" size={40} />
                        </div>
                        <h4 className="text-xl font-black text-zinc-600 uppercase tracking-widest mb-2 italic">Zero Strategies Identified</h4>
                        <p className="text-sm text-zinc-700 font-medium max-w-xs mx-auto italic">Ignite your nutritional engine. Create your first dietary protocol to start training.</p>
                    </div>
                )}
            </div>

            <AddDietPlanModal
                isOpen={isModalOpen}
                onClose={() => setIsModalOpen(false)}
                onSuccess={fetchPlans}
            />

            <EditDietPlanModal
                isOpen={isEditModalOpen}
                onClose={() => setIsEditModalOpen(false)}
                onSuccess={fetchPlans}
                plan={selectedPlan}
            />
        </div>
    );
};

export default DietPlans;
