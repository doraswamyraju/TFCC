import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    Users,
    LayoutDashboard,
    LogOut,
    Utensils,
    Dumbbell,
    Activity
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import axios from 'axios';
import MemberList from './components/MemberList';
import AddMemberModal from './components/AddMemberModal';
import DietPlans from './components/DietPlans';
import WorkoutPlans from './components/WorkoutPlans';

// Placeholder sub-components (will move to separate files later)
const Overview = ({ stats }: { stats: any }) => (
    <div className="space-y-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/40 backdrop-blur-sm p-7 rounded-2xl border border-white/5 hover:border-[#c41e3a]/50 transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c41e3a]/5 blur-3xl rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-[#c41e3a]/10" />
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <p className="text-zinc-500 text-xs font-black mb-2 uppercase tracking-[0.2em]">Total Members</p>
                        <h3 className="text-5xl font-black tracking-tighter text-white">{stats?.memberCount || 0}</h3>
                    </div>
                    <div className="p-4 bg-[#c41e3a]/10 rounded-2xl border border-[#c41e3a]/20 group-hover:bg-[#c41e3a] group-hover:scale-110 transition-all duration-300">
                        <Users className="text-[#c41e3a] group-hover:text-white" size={26} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900/40 backdrop-blur-sm p-7 rounded-2xl border border-white/5 hover:border-[#ffd700]/50 transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#ffd700]/5 blur-3xl rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-[#ffd700]/10" />
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <p className="text-zinc-500 text-xs font-black mb-2 uppercase tracking-[0.2em]">Diet Plans</p>
                        <h3 className="text-5xl font-black tracking-tighter text-white">{stats?.dietPlanCount || 0}</h3>
                    </div>
                    <div className="p-4 bg-[#ffd700]/10 rounded-2xl border border-[#ffd700]/20 group-hover:bg-[#ffd700] group-hover:scale-110 transition-all duration-300 text-[#ffd700] group-hover:text-black">
                        <Utensils size={26} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900/40 backdrop-blur-sm p-7 rounded-2xl border border-white/5 hover:border-[#c41e3a]/50 transition-all duration-300 group relative overflow-hidden"
            >
                <div className="absolute top-0 right-0 w-24 h-24 bg-[#c41e3a]/5 blur-3xl rounded-full -mr-12 -mt-12 transition-all duration-500 group-hover:bg-[#c41e3a]/10" />
                <div className="relative z-10 flex justify-between items-start">
                    <div>
                        <p className="text-zinc-500 text-xs font-black mb-2 uppercase tracking-[0.2em]">Workout Plans</p>
                        <h3 className="text-5xl font-black tracking-tighter text-white">{stats?.workoutPlanCount || 0}</h3>
                    </div>
                    <div className="p-4 bg-[#c41e3a]/10 rounded-2xl border border-[#c41e3a]/20 group-hover:bg-[#c41e3a] group-hover:scale-110 transition-all duration-300">
                        <Dumbbell className="text-[#c41e3a] group-hover:text-white" size={26} />
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="bg-zinc-900/20 rounded-3xl border border-white/5 p-12 flex flex-col items-center justify-center min-h-[400px] text-center relative overflow-hidden">
            <div className="absolute inset-0 bg-gradient-to-tr from-[#c41e3a]/5 via-transparent to-[#ffd700]/5" />
            <div className="relative z-10">
                <div className="w-20 h-20 bg-zinc-800/50 rounded-full flex items-center justify-center mb-6 mx-auto">
                    <Activity className="text-zinc-600" size={40} />
                </div>
                <h4 className="text-2xl font-black mb-3 text-white uppercase tracking-tight">Live Activity Tracking</h4>
                <p className="text-zinc-500 max-w-sm mx-auto leading-relaxed">
                    Real-time member check-ins and activity logs will populate this area as your athletes start using the FCC training app.
                </p>
            </div>
        </div>
    </div>
);

const GymDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState('overview');
    const [stats, setStats] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [isAddMemberModalOpen, setIsAddMemberModalOpen] = useState(false);

    const fetchStats = async () => {
        try {
            const res = await axios.get('/api/gym/dashboard');
            setStats(res.data.stats);
        } catch (err) {
            console.error('Error fetching dashboard stats', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStats();
    }, []);

    const tabs = [
        { id: 'overview', name: 'Overview', icon: LayoutDashboard },
        { id: 'members', name: 'Members', icon: Users },
        { id: 'diet-plans', name: 'Diet Plans', icon: Utensils },
        { id: 'workout-plans', name: 'Workout Plans', icon: Dumbbell },
    ];

    if (loading) {
        return (
            <div className="min-h-screen bg-black flex items-center justify-center">
                <div className="animate-spin rounded-full h-12 w-12 border-t-2 border-red-600"></div>
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white flex font-sans selection:bg-[#c41e3a] selection:text-white">
            {/* Sidebar */}
            <aside className="w-64 border-r border-white/5 p-6 flex flex-col fixed h-full bg-[#0a0a0a] z-40">
                <div className="flex items-center gap-3 mb-10 px-2 group cursor-pointer">
                    <div className="w-10 h-10 bg-[#c41e3a] rounded-xl flex items-center justify-center font-black text-2xl shadow-lg shadow-[#c41e3a]/20 group-hover:scale-110 transition-transform">F</div>
                    <div className="flex flex-col">
                        <span className="text-lg font-black tracking-tight leading-none">TFCC HUB</span>
                        <span className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-1">Management</span>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3.5 rounded-xl transition-all duration-300 group relative overflow-hidden ${activeTab === tab.id
                                ? 'bg-gradient-to-r from-[#c41e3a] to-[#a01830] text-white shadow-xl shadow-[#c41e3a]/20'
                                : 'text-zinc-500 hover:text-white hover:bg-white/5'
                                }`}
                        >
                            <tab.icon size={18} className={activeTab === tab.id ? 'text-white' : 'group-hover:text-[#c41e3a] transition-colors'} />
                            <span className={`text-sm font-black uppercase tracking-wider ${activeTab === tab.id ? 'opacity-100' : 'opacity-70 group-hover:opacity-100'}`}>
                                {tab.name}
                            </span>
                            {activeTab === tab.id && (
                                <motion.div
                                    layoutId="activeTabGlow"
                                    className="absolute right-0 w-1 h-6 bg-[#ffd700] rounded-l-full shadow-[0_0_10px_#ffd700]"
                                />
                            )}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto pt-6 border-t border-white/5">
                    <div className="px-3 mb-6 flex items-center gap-3">
                        <div className="w-10 h-10 bg-gradient-to-br from-zinc-800 to-zinc-900 rounded-full border border-white/10 flex items-center justify-center font-bold text-[#ffd700]">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="flex-1 min-w-0">
                            <p className="text-sm font-black truncate text-white">{user?.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest truncate">{user?.email}</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3.5 rounded-xl text-zinc-500 hover:text-white hover:bg-white/5 transition-all text-sm font-black uppercase tracking-widest group"
                    >
                        <LogOut size={18} className="group-hover:text-[#c41e3a] transition-colors" />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12 min-h-screen bg-[#0a0a0a]">
                <header className="mb-12 flex flex-col md:flex-row md:items-center justify-between gap-6">
                    <div>
                        <div className="flex items-center gap-2 mb-2">
                            <div className="w-2 h-2 bg-[#c41e3a] rounded-full animate-pulse" />
                            <span className="text-[10px] text-zinc-500 font-black uppercase tracking-[0.3em]">Live Console</span>
                        </div>
                        <h2 className="text-5xl font-black tracking-tighter text-white uppercase italic">
                            {tabs.find(t => t.id === activeTab)?.name}
                        </h2>
                        <p className="text-zinc-500 mt-2 font-medium tracking-tight">
                            {activeTab === 'overview' ? 'Welcome back, Champion. Here is your gym performance.' : `Streamline your ${activeTab.replace('-', ' ')} protocol.`}
                        </p>
                    </div>
                </header>

                <AnimatePresence mode="wait">
                    <motion.div
                        key={activeTab}
                        initial={{ opacity: 0, x: 20 }}
                        animate={{ opacity: 1, x: 0 }}
                        exit={{ opacity: 0, x: -20 }}
                        transition={{ duration: 0.2 }}
                    >
                        {activeTab === 'overview' && <Overview stats={stats} />}
                        {activeTab === 'members' && (
                            <MemberList onAddMember={() => setIsAddMemberModalOpen(true)} />
                        )}
                        {activeTab === 'diet-plans' && <DietPlans />}
                        {activeTab === 'workout-plans' && <WorkoutPlans />}
                    </motion.div>
                </AnimatePresence>

                <AddMemberModal
                    isOpen={isAddMemberModalOpen}
                    onClose={() => setIsAddMemberModalOpen(false)}
                    onSuccess={fetchStats}
                />
            </main>
        </div>
    );
};

export default GymDashboard;

