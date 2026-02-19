import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    Activity,
    Users,
    Building2,
    ShieldCheck,
    LogOut,
    Trash2,
    MoreVertical,
    Search,
    Loader2,
    TrendingUp,
    MapPin,
    Mail
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

interface GymStats {
    totalGyms: number;
    totalMembers: number;
    activeGyms: number;
}

interface Gym {
    _id: string;
    gymName: string;
    ownerName: string;
    email: string;
    phone: string;
    address: string;
    memberCount: number;
    joinDate: string;
}

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState<GymStats | null>(null);
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            const [statsRes, gymsRes] = await Promise.all([
                axios.get('/api/admin/stats'),
                axios.get('/api/admin/gyms')
            ]);
            setStats(statsRes.data);
            setGyms(gymsRes.data);
        } catch (err) {
            console.error('Error fetching admin data', err);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const handleDeleteGym = async (id: string, name: string) => {
        if (!window.confirm(`CRITICAL: Are you sure you want to PERMANENTLY remove "${name}" and all its members from the system?`)) return;

        setIsDeleting(id);
        try {
            await axios.delete(`/api/admin/gyms/${id}`);
            setGyms(gyms.filter(g => g._id !== id));
            // Refresh stats
            const statsRes = await axios.get('/api/admin/stats');
            setStats(statsRes.data);
        } catch (err) {
            console.error('Error deleting gym', err);
            alert('Failed to terminate gym partnership.');
        } finally {
            setIsDeleting(null);
            setOpenMenuId(null);
        }
    };

    const filteredGyms = gyms.filter(g =>
        g.gymName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.ownerName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        g.email.toLowerCase().includes(searchTerm.toLowerCase())
    );

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#c41e3a] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c41e3a]/30">
            {/* Top Navigation */}
            <nav className="border-b border-white/5 bg-black/40 backdrop-blur-md sticky top-0 z-40">
                <div className="max-w-7xl mx-auto px-6 h-20 flex items-center justify-between">
                    <div className="flex items-center gap-4">
                        <div className="w-12 h-12 bg-gradient-to-br from-[#c41e3a] to-[#8a1529] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/20">
                            <ShieldCheck className="text-white" size={24} />
                        </div>
                        <div>
                            <h1 className="text-xl font-black uppercase tracking-tighter">FCC Admin</h1>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em] leading-none">Global Oversight Terminal</p>
                        </div>
                    </div>

                    <div className="flex items-center gap-6">
                        <div className="hidden md:block text-right">
                            <p className="text-xs font-black uppercase tracking-widest text-[#ffd700]">{user?.name}</p>
                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">System Overseer</p>
                        </div>
                        <button
                            onClick={logout}
                            className="p-3 bg-zinc-900/50 hover:bg-red-500/10 text-zinc-400 hover:text-red-500 rounded-2xl transition-all border border-white/5"
                        >
                            <LogOut size={20} />
                        </button>
                    </div>
                </div>
            </nav>

            <main className="max-w-7xl mx-auto px-6 py-12 space-y-12">
                {/* Stats Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-[#c41e3a]/30 transition-all"
                    >
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Partner Gyms</p>
                                <h3 className="text-4xl font-black">{stats?.totalGyms}</h3>
                                <div className="mt-4 flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-wider bg-green-500/10 py-1 px-2 rounded-lg w-fit">
                                    <TrendingUp size={12} /> +2 this week
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-[#c41e3a]/10 group-hover:text-[#c41e3a] transition-all">
                                <Building2 size={24} />
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                            <Building2 size={160} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.1 }}
                        className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-[#ffd700]/30 transition-all"
                    >
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Total Trainees</p>
                                <h3 className="text-4xl font-black">{stats?.totalMembers}</h3>
                                <div className="mt-4 flex items-center gap-2 text-[#ffd700] text-[10px] font-bold uppercase tracking-wider bg-[#ffd700]/10 py-1 px-2 rounded-lg w-fit">
                                    <Activity size={12} /> Real-time Sync
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-[#ffd700]/10 group-hover:text-[#ffd700] transition-all">
                                <Users size={24} />
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                            <Users size={160} />
                        </div>
                    </motion.div>

                    <motion.div
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ delay: 0.2 }}
                        className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-blue-500/30 transition-all"
                    >
                        <div className="relative z-10 flex justify-between items-start">
                            <div>
                                <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">System Health</p>
                                <h3 className="text-4xl font-black">99.9%</h3>
                                <div className="mt-4 flex items-center gap-2 text-blue-500 text-[10px] font-bold uppercase tracking-wider bg-blue-500/10 py-1 px-2 rounded-lg w-fit">
                                    <ShieldCheck size={12} /> Secure
                                </div>
                            </div>
                            <div className="w-12 h-12 bg-white/5 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-blue-500/10 group-hover:text-blue-500 transition-all">
                                <Activity size={24} />
                            </div>
                        </div>
                        <div className="absolute -right-8 -bottom-8 opacity-[0.02] group-hover:opacity-[0.05] transition-all">
                            <Activity size={160} />
                        </div>
                    </motion.div>
                </div>

                {/* Gym Directory */}
                <section className="space-y-6">
                    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
                        <div>
                            <h2 className="text-2xl font-black uppercase tracking-tight">Gym Directory</h2>
                            <p className="text-xs text-zinc-500 font-bold uppercase tracking-widest mt-1">Network Infrastructure Registry</p>
                        </div>

                        <div className="relative group">
                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#c41e3a] transition-colors" size={18} />
                            <input
                                type="text"
                                placeholder="Search by Gym, Owner or Email..."
                                value={searchTerm}
                                onChange={(e) => setSearchTerm(e.target.value)}
                                className="bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full md:w-96 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-sm placeholder-zinc-700"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 gap-4">
                        <AnimatePresence mode="popLayout">
                            {filteredGyms.length > 0 ? (
                                filteredGyms.map((gym, index) => (
                                    <motion.div
                                        key={gym._id}
                                        initial={{ opacity: 0, x: -20 }}
                                        animate={{ opacity: 1, x: 0 }}
                                        transition={{ delay: index * 0.05 }}
                                        className="group bg-zinc-900/30 border border-white/5 hover:border-white/10 rounded-[2rem] p-6 hover:bg-zinc-800/20 transition-all relative"
                                    >
                                        <div className="flex flex-col lg:flex-row lg:items-center gap-8">
                                            {/* Gym Identity */}
                                            <div className="flex items-center gap-5 lg:w-1/4">
                                                <div className="w-16 h-16 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-[#c41e3a] group-hover:text-white transition-all overflow-hidden shrink-0">
                                                    <Building2 size={28} />
                                                </div>
                                                <div className="min-w-0">
                                                    <h4 className="font-black text-lg uppercase truncate leading-tight">{gym.gymName}</h4>
                                                    <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest flex items-center gap-1.5 mt-1">
                                                        <Activity size={10} className="text-[#c41e3a]" />
                                                        {gym.memberCount} active trainees
                                                    </p>
                                                </div>
                                            </div>

                                            {/* Contact Info */}
                                            <div className="grid grid-cols-1 md:grid-cols-2 lg:w-2/3 gap-4">
                                                <div className="flex items-center gap-3 text-zinc-400">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-white transition-colors">
                                                        <Mail size={14} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 leading-none mb-1">Owner: {gym.ownerName}</p>
                                                        <p className="text-xs font-bold truncate">{gym.email}</p>
                                                    </div>
                                                </div>

                                                <div className="flex items-center gap-3 text-zinc-400">
                                                    <div className="w-8 h-8 rounded-lg bg-white/5 flex items-center justify-center group-hover:text-white transition-colors">
                                                        <MapPin size={14} />
                                                    </div>
                                                    <div className="min-w-0">
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-600 leading-none mb-1">Location</p>
                                                        <p className="text-xs font-bold truncate">{gym.address}</p>
                                                    </div>
                                                </div>
                                            </div>

                                            {/* Actions */}
                                            <div className="flex items-center justify-end gap-3 lg:w-1/12 ml-auto">
                                                <div className="relative">
                                                    <button
                                                        onClick={() => setOpenMenuId(openMenuId === gym._id ? null : gym._id)}
                                                        className={`p-3 rounded-xl transition-all ${openMenuId === gym._id ? 'bg-zinc-800 text-white' : 'text-zinc-500 hover:text-white hover:bg-zinc-800/50'}`}
                                                    >
                                                        <MoreVertical size={20} />
                                                    </button>

                                                    <AnimatePresence>
                                                        {openMenuId === gym._id && (
                                                            <>
                                                                <div className="fixed inset-0 z-10" onClick={() => setOpenMenuId(null)} />
                                                                <motion.div
                                                                    initial={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    animate={{ opacity: 1, scale: 1, y: 0 }}
                                                                    exit={{ opacity: 0, scale: 0.95, y: -10 }}
                                                                    className="absolute right-0 mt-3 w-48 bg-[#0a0a0a] border border-white/10 rounded-2xl shadow-2xl z-20 py-2.5 overflow-hidden"
                                                                >
                                                                    <button
                                                                        onClick={() => handleDeleteGym(gym._id, gym.gymName)}
                                                                        disabled={isDeleting === gym._id}
                                                                        className="w-full flex items-center gap-3 px-4 py-2.5 text-xs font-black uppercase tracking-widest text-red-500 hover:bg-red-500/10 transition-colors disabled:opacity-50"
                                                                    >
                                                                        {isDeleting === gym._id ? (
                                                                            <Loader2 size={16} className="animate-spin" />
                                                                        ) : (
                                                                            <Trash2 size={16} />
                                                                        )}
                                                                        Terminate Partnership
                                                                    </button>
                                                                </motion.div>
                                                            </>
                                                        )}
                                                    </AnimatePresence>
                                                </div>
                                            </div>
                                        </div>
                                    </motion.div>
                                ))
                            ) : (
                                <div className="text-center py-24 bg-zinc-900/20 border border-white/5 border-dashed rounded-[3rem] px-6">
                                    <div className="w-20 h-20 bg-zinc-900 rounded-full flex items-center justify-center mx-auto mb-6 text-zinc-700">
                                        <Building2 size={40} />
                                    </div>
                                    <h3 className="text-xl font-black uppercase tracking-tight text-zinc-400">No Partners Identified</h3>
                                    <p className="text-sm text-zinc-600 font-medium mt-2 max-w-sm mx-auto">
                                        {searchTerm ? `Zero results for "${searchTerm}". Verify connection strings.` : 'The registry is currently empty. Initialize partner onboarding.'}
                                    </p>
                                </div>
                            )}
                        </AnimatePresence>
                    </div>
                </section>
            </main>
        </div>
    );
};

export default AdminDashboard;
