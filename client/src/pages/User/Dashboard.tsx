
import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Activity,
    Utensils,
    Dumbbell,
    LogOut,
    Loader2,
    Calendar,
    MapPin,
    Phone,
    Clock,
    CheckCircle2,
    ChevronRight,
    Trophy
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

interface UserData {
    user: any;
    gym: any;
    dietPlan: any;
    workoutPlan: any;
}

const UserDashboard = () => {
    const { logout } = useAuth();
    const [data, setData] = useState<UserData | null>(null);
    const [loading, setLoading] = useState(true);
    const [activeTab, setActiveTab] = useState<'overview' | 'diet' | 'workout'>('overview');

    useEffect(() => {
        const fetchData = async () => {
            try {
                const res = await axios.get('/api/user/dashboard');
                setData(res.data);
            } catch (err) {
                console.error('Error fetching dashboard data', err);
            } finally {
                setLoading(false);
            }
        };
        fetchData();
    }, []);

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#c41e3a] animate-spin" />
            </div>
        );
    }

    const { user, gym, dietPlan, workoutPlan } = data || {};

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans pb-24">
            {/* Minimal Header */}
            <nav className="p-6 flex justify-between items-center border-b border-white/5 bg-black/50 backdrop-blur-lg sticky top-0 z-30">
                <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#c41e3a] rounded-xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/20">
                        <Activity className="text-white" size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black uppercase tracking-tighter">My FCC</h1>
                        <p className="text-[10px] text-[#ffd700] font-bold uppercase tracking-widest leading-none">Fitness Terminal</p>
                    </div>
                </div>
                <button
                    onClick={logout}
                    className="p-2.5 bg-zinc-900 rounded-xl text-zinc-500 hover:text-white transition-colors border border-white/5"
                >
                    <LogOut size={18} />
                </button>
            </nav>

            <main className="p-6 space-y-8 max-w-lg mx-auto">
                {/* Greeting Card */}
                <section>
                    <h2 className="text-2xl font-black uppercase tracking-tight mb-1">Welcome Back,</h2>
                    <p className="text-[#ffd700] text-lg font-black uppercase leading-tight">{user?.name}</p>
                    <p className="text-zinc-500 text-xs font-bold uppercase tracking-widest mt-2 flex items-center gap-2">
                        <Calendar size={14} className="text-[#c41e3a]" />
                        Joined {user?.joinDate ? new Date(user.joinDate).toLocaleDateString(undefined, { month: 'short', year: 'numeric' }) : 'Recently'}
                    </p>
                </section>

                {/* Tab Navigation (Mobile Bottom Style or Toggle) */}
                <div className="flex bg-zinc-900/50 p-1.5 rounded-2xl border border-white/5">
                    {(['overview', 'diet', 'workout'] as const).map((tab) => (
                        <button
                            key={tab}
                            onClick={() => setActiveTab(tab)}
                            className={`flex-1 flex flex-col items-center justify-center py-3 rounded-xl transition-all ${activeTab === tab
                                ? 'bg-[#c41e3a] text-white shadow-lg'
                                : 'text-zinc-500 hover:text-zinc-300'
                                }`}
                        >
                            {tab === 'overview' && <Activity size={20} />}
                            {tab === 'diet' && <Utensils size={20} />}
                            {tab === 'workout' && <Dumbbell size={20} />}
                            <span className="text-[9px] font-black uppercase tracking-widest mt-1.5">{tab}</span>
                        </button>
                    ))}
                </div>

                {/* Tab Content */}
                <AnimatePresence mode="wait">
                    {activeTab === 'overview' && (
                        <motion.div
                            key="overview"
                            initial={{ opacity: 0, y: 10 }}
                            animate={{ opacity: 1, y: 0 }}
                            exit={{ opacity: 0, y: -10 }}
                            className="space-y-6"
                        >
                            {/* Gym Partner Card */}
                            {gym && (
                                <div className="bg-zinc-900/40 border border-white/5 rounded-[2rem] p-6 relative overflow-hidden group">
                                    <div className="relative z-10">
                                        <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-4">Your Base Location</p>
                                        <h3 className="text-xl font-black uppercase tracking-tight text-white mb-4">{gym.gymName}</h3>
                                        <div className="space-y-3">
                                            <div className="flex items-center gap-3 text-zinc-400">
                                                <MapPin size={14} className="text-[#c41e3a]" />
                                                <span className="text-xs font-bold">{gym.address}</span>
                                            </div>
                                            <div className="flex items-center gap-3 text-zinc-400">
                                                <Phone size={14} className="text-[#c41e3a]" />
                                                <span className="text-xs font-bold">{gym.phone}</span>
                                            </div>
                                        </div>
                                    </div>
                                    <Trophy className="absolute -right-6 -bottom-6 text-white/[0.03] w-32 h-32" />
                                </div>
                            )}

                            {/* Plan Status Cards */}
                            <div className="grid grid-cols-1 gap-4">
                                <button
                                    onClick={() => setActiveTab('diet')}
                                    className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex items-center justify-between group hover:border-[#ffd700]/30 transition-all text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#ffd700]/10 rounded-2xl flex items-center justify-center text-[#ffd700]">
                                            <Utensils size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Dietary Status</p>
                                            <h4 className="font-black uppercase tracking-tight group-hover:text-[#ffd700] transition-colors">
                                                {dietPlan ? dietPlan.name : 'No Plan Assigned'}
                                            </h4>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-zinc-700 group-hover:text-[#ffd700] transition-all" />
                                </button>

                                <button
                                    onClick={() => setActiveTab('workout')}
                                    className="bg-zinc-900/40 border border-white/5 rounded-3xl p-5 flex items-center justify-between group hover:border-[#c41e3a]/30 transition-all text-left"
                                >
                                    <div className="flex items-center gap-4">
                                        <div className="w-12 h-12 bg-[#c41e3a]/10 rounded-2xl flex items-center justify-center text-[#c41e3a]">
                                            <Dumbbell size={24} />
                                        </div>
                                        <div>
                                            <p className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Workout Status</p>
                                            <h4 className="font-black uppercase tracking-tight group-hover:text-[#c41e3a] transition-colors">
                                                {workoutPlan ? workoutPlan.name : 'No Plan Assigned'}
                                            </h4>
                                        </div>
                                    </div>
                                    <ChevronRight size={20} className="text-zinc-700 group-hover:text-[#c41e3a] transition-all" />
                                </button>
                            </div>
                        </motion.div>
                    )}

                    {activeTab === 'diet' && (
                        <motion.div
                            key="diet"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            {dietPlan ? (
                                <>
                                    <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[2.5rem] p-8">
                                        <div className="w-16 h-16 bg-[#ffd700] rounded-2xl flex items-center justify-center shadow-lg shadow-[#ffd700]/20 mb-6">
                                            <Utensils className="text-black" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{dietPlan.name}</h3>
                                        <p className="text-zinc-400 text-sm font-medium leading-relaxed">{dietPlan.description}</p>
                                    </div>

                                    <div className="space-y-4">
                                        {dietPlan.meals.map((meal: any, idx: number) => (
                                            <div key={idx} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 flex gap-5">
                                                <div className="w-10 h-10 bg-zinc-800 rounded-xl flex flex-col items-center justify-center shrink-0">
                                                    <Clock size={16} className="text-[#ffd700]" />
                                                    <span className="text-[8px] font-bold mt-0.5 uppercase">{meal.time || 'N/A'}</span>
                                                </div>
                                                <div>
                                                    <h5 className="font-black uppercase tracking-tight text-[#ffd700] mb-1">{meal.type || meal.name}</h5>
                                                    <p className="text-sm text-zinc-400 font-bold">{meal.description || (meal.calories ? `${meal.calories} kcal` : '')}</p>
                                                    <div className="flex flex-wrap gap-2 mt-3">
                                                        {(meal.items || meal.foods)?.map((food: string, fIdx: number) => (
                                                            <span key={fIdx} className="text-[9px] font-black uppercase tracking-widest bg-white/5 py-1 px-2.5 rounded-lg border border-white/5">
                                                                {food}
                                                            </span>
                                                        ))}
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20 px-6">
                                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-800 border border-white/5 border-dashed">
                                        <Utensils size={40} />
                                    </div>
                                    <h4 className="font-black uppercase tracking-tight text-zinc-400">Dietary Registry Empty</h4>
                                    <p className="text-xs text-zinc-600 font-bold mt-2 uppercase tracking-widest">Consult your gym to assign a nutrition plan.</p>
                                </div>
                            )}
                        </motion.div>
                    )}

                    {activeTab === 'workout' && (
                        <motion.div
                            key="workout"
                            initial={{ opacity: 0, scale: 0.95 }}
                            animate={{ opacity: 1, scale: 1 }}
                            exit={{ opacity: 0, scale: 0.95 }}
                            className="space-y-6"
                        >
                            {workoutPlan ? (
                                <>
                                    <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[2.5rem] p-8">
                                        <div className="w-16 h-16 bg-[#c41e3a] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/20 mb-6">
                                            <Dumbbell className="text-white" size={32} />
                                        </div>
                                        <h3 className="text-2xl font-black uppercase tracking-tighter mb-2">{workoutPlan.name}</h3>
                                        <p className="text-zinc-400 text-sm font-medium leading-relaxed">{workoutPlan.description}</p>
                                    </div>

                                    <div className="space-y-4">
                                        {workoutPlan.days ? (
                                            workoutPlan.days.map((day: any, dIdx: number) => (
                                                <div key={dIdx} className="space-y-4">
                                                    <h4 className="text-[10px] font-black uppercase tracking-[0.3em] text-[#c41e3a] px-4 mt-6">{day.dayName}</h4>
                                                    {day.exercises.map((ex: any, idx: number) => (
                                                        <div key={idx} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                                                            <div className="flex gap-5 relative z-10">
                                                                <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                                                                    <Activity size={20} className="text-[#c41e3a]" />
                                                                </div>
                                                                <div className="flex-1">
                                                                    <h5 className="font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#c41e3a] transition-colors">{ex.name}</h5>
                                                                    <div className="flex items-center gap-4 mt-2">
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Sets</span>
                                                                            <span className="text-sm font-black text-[#ffd700]">{ex.sets}</span>
                                                                        </div>
                                                                        <div className="w-px h-6 bg-white/5" />
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Reps</span>
                                                                            <span className="text-sm font-black text-[#ffd700]">{ex.reps}</span>
                                                                        </div>
                                                                        {ex.weight && (
                                                                            <>
                                                                                <div className="w-px h-6 bg-white/5" />
                                                                                <div className="flex flex-col">
                                                                                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Load</span>
                                                                                    <span className="text-sm font-black text-[#ffd700]">{ex.weight}</span>
                                                                                </div>
                                                                            </>
                                                                        )}
                                                                    </div>
                                                                    {ex.notes && (
                                                                        <p className="text-[10px] text-zinc-500 font-bold mt-3 border-l-2 border-[#c41e3a] pl-3 py-1 italic">
                                                                            {ex.notes}
                                                                        </p>
                                                                    )}
                                                                </div>
                                                            </div>
                                                            <CheckCircle2 size={60} className="absolute -right-4 -bottom-4 text-green-500/[0.02] group-hover:text-green-500/[0.05] transition-all" />
                                                        </div>
                                                    ))}
                                                </div>
                                            ))
                                        ) : (
                                            workoutPlan.exercises?.map((ex: any, idx: number) => (
                                                <div key={idx} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 relative overflow-hidden group">
                                                    <div className="flex gap-5 relative z-10">
                                                        <div className="w-12 h-12 bg-zinc-800 rounded-2xl flex items-center justify-center shrink-0 border border-white/5">
                                                            <Activity size={20} className="text-[#c41e3a]" />
                                                        </div>
                                                        <div className="flex-1">
                                                            <h5 className="font-black uppercase tracking-tight text-white mb-1 group-hover:text-[#c41e3a] transition-colors">{ex.name}</h5>
                                                            <div className="flex items-center gap-4 mt-2">
                                                                <div className="flex flex-col">
                                                                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Sets</span>
                                                                    <span className="text-sm font-black text-[#ffd700]">{ex.sets}</span>
                                                                </div>
                                                                <div className="w-px h-6 bg-white/5" />
                                                                <div className="flex flex-col">
                                                                    <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Reps</span>
                                                                    <span className="text-sm font-black text-[#ffd700]">{ex.reps}</span>
                                                                </div>
                                                                {ex.weight && (
                                                                    <>
                                                                        <div className="w-px h-6 bg-white/5" />
                                                                        <div className="flex flex-col">
                                                                            <span className="text-[8px] font-black uppercase text-zinc-600 tracking-widest">Load</span>
                                                                            <span className="text-sm font-black text-[#ffd700]">{ex.weight}</span>
                                                                        </div>
                                                                    </>
                                                                )}
                                                            </div>
                                                        </div>
                                                    </div>
                                                </div>
                                            ))
                                        )}
                                    </div>
                                </>
                            ) : (
                                <div className="text-center py-20 px-6">
                                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-800 border border-white/5 border-dashed">
                                        <Dumbbell size={40} />
                                    </div>
                                    <h4 className="font-black uppercase tracking-tight text-zinc-400">Tactical Training Offline</h4>
                                    <p className="text-xs text-zinc-600 font-bold mt-2 uppercase tracking-widest">Consult your gym to assign a workout regimen.</p>
                                </div>
                            )}
                        </motion.div>
                    )}
                </AnimatePresence>
            </main>

            {/* Bottom Floating Nav for Quick Access (Alternative to tabs if needed) */}
            <div className="fixed bottom-6 left-1/2 -translate-x-1/2 w-[90%] max-w-sm bg-black/80 backdrop-blur-xl border border-white/10 rounded-3xl py-4 px-8 flex justify-between shadow-2xl z-40 md:hidden">
                <button onClick={() => setActiveTab('overview')} className={`transition-all ${activeTab === 'overview' ? 'text-[#c41e3a]' : 'text-zinc-600'}`}>
                    <Activity size={24} />
                </button>
                <button onClick={() => setActiveTab('diet')} className={`transition-all ${activeTab === 'diet' ? 'text-[#ffd700]' : 'text-zinc-600'}`}>
                    <Utensils size={24} />
                </button>
                <button onClick={() => setActiveTab('workout')} className={`transition-all ${activeTab === 'workout' ? 'text-[#c41e3a]' : 'text-zinc-600'}`}>
                    <Dumbbell size={24} />
                </button>
            </div>
        </div >
    );
};

export default UserDashboard;
