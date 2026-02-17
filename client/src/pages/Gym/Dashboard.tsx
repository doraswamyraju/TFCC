import { useState, useEffect } from 'react';
import { useAuth } from '../../context/AuthContext';
import {
    Users,
    LayoutDashboard,
    LogOut,
    ChevronRight,
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
    <div className="space-y-6">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition-colors group"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider">Total Members</p>
                        <h3 className="text-4xl font-bold">{stats?.memberCount || 0}</h3>
                    </div>
                    <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600/20 transition-colors">
                        <Users className="text-red-500" size={24} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.1 }}
                className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition-colors group"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider">Diet Plans</p>
                        <h3 className="text-4xl font-bold">{stats?.dietPlanCount || 0}</h3>
                    </div>
                    <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600/20 transition-colors">
                        <Utensils className="text-red-500" size={24} />
                    </div>
                </div>
            </motion.div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800 hover:border-red-600 transition-colors group"
            >
                <div className="flex justify-between items-start">
                    <div>
                        <p className="text-zinc-400 text-sm mb-1 uppercase tracking-wider">Workout Plans</p>
                        <h3 className="text-4xl font-bold">{stats?.workoutPlanCount || 0}</h3>
                    </div>
                    <div className="p-3 bg-red-600/10 rounded-xl group-hover:bg-red-600/20 transition-colors">
                        <Dumbbell className="text-red-500" size={24} />
                    </div>
                </div>
            </motion.div>
        </div>

        <div className="bg-zinc-900 rounded-2xl border border-zinc-800 p-8 flex flex-col items-center justify-center min-h-[300px] text-center">
            <Activity className="text-zinc-700 mb-4" size={48} />
            <h4 className="text-xl font-semibold mb-2">Live Activity Tracking</h4>
            <p className="text-zinc-400 max-w-sm">
                Activity logs and member check-ins will appear here as your members start using the TFCC app.
            </p>
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
        <div className="min-h-screen bg-black text-white flex">
            {/* Sidebar */}
            <aside className="w-64 border-r border-zinc-900 p-6 flex flex-col fixed h-full">
                <div className="flex items-center gap-2 mb-10 px-2">
                    <div className="w-8 h-8 bg-red-600 rounded-lg flex items-center justify-center font-bold text-xl">F</div>
                    <span className="text-xl font-bold tracking-tighter">TFCC HUB</span>
                </div>

                <nav className="flex-1 space-y-2">
                    {tabs.map((tab) => (
                        <button
                            key={tab.id}
                            onClick={() => setActiveTab(tab.id)}
                            className={`w-full flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 group ${activeTab === tab.id
                                ? 'bg-red-600 text-white shadow-lg shadow-red-600/20'
                                : 'text-zinc-400 hover:text-white hover:bg-zinc-900'
                                }`}
                        >
                            <tab.icon size={20} className={activeTab === tab.id ? 'text-white' : 'group-hover:text-red-500'} />
                            <span className="font-medium">{tab.name}</span>
                            {activeTab === tab.id && <ChevronRight size={16} className="ml-auto" />}
                        </button>
                    ))}
                </nav>

                <div className="mt-auto border-t border-zinc-900 pt-6">
                    <div className="px-2 mb-4">
                        <p className="text-sm font-semibold truncate">{user?.name}</p>
                        <p className="text-xs text-zinc-500 truncate">{user?.email}</p>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-3 px-4 py-3 rounded-xl text-zinc-400 hover:text-red-500 hover:bg-red-500/5 transition-all text-sm font-medium"
                    >
                        <LogOut size={18} />
                        Logout
                    </button>
                </div>
            </aside>

            {/* Main Content */}
            <main className="flex-1 ml-64 p-8 lg:p-12 overflow-y-auto">
                <header className="mb-10 flex flex-col md:flex-row md:items-center justify-between gap-4">
                    <div>
                        <h2 className="text-3xl font-bold tracking-tight">
                            {tabs.find(t => t.id === activeTab)?.name}
                        </h2>
                        <p className="text-zinc-500 mt-1">
                            {activeTab === 'overview' ? 'Welcome back! Here is what is happening today.' : `Manage your ${activeTab.replace('-', ' ')} efficiently.`}
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

