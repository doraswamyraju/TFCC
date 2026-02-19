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
    Mail,
    ArrowLeft,
    Calendar,
    UserCircle
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

interface User {
    _id: string;
    name: string;
    email: string;
    phone: string;
    gymId?: {
        _id: string;
        gymName: string;
    };
    joinDate: string;
}

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [stats, setStats] = useState<GymStats | null>(null);
    const [gyms, setGyms] = useState<Gym[]>([]);
    const [allUsers, setAllUsers] = useState<User[]>([]);
    const [loading, setLoading] = useState(true);
    const [searchTerm, setSearchTerm] = useState('');
    const [activeTab, setActiveTab] = useState<'gyms' | 'users'>('gyms');
    const [selectedGym, setSelectedGym] = useState<Gym | null>(null);
    const [gymMembers, setGymMembers] = useState<User[]>([]);
    const [loadingMembers, setLoadingMembers] = useState(false);

    const [openMenuId, setOpenMenuId] = useState<string | null>(null);
    const [isDeleting, setIsDeleting] = useState<string | null>(null);
    const [error, setError] = useState<string | null>(null);

    const fetchData = async () => {
        try {
            setLoading(true);
            setError(null);
            const [statsRes, gymsRes, usersRes] = await Promise.all([
                axios.get('/api/admin/stats'),
                axios.get('/api/admin/gyms'),
                axios.get('/api/admin/users')
            ]);
            setStats(statsRes.data);
            setGyms(gymsRes.data);
            setAllUsers(usersRes.data);
        } catch (err: any) {
            console.error('Error fetching admin data', err);
            setError(err.response?.data?.msg || 'System failure: Strategic reconnaissance data unavailable.');
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const fetchGymMembers = async (gym: Gym) => {
        setLoadingMembers(true);
        setSelectedGym(gym);
        try {
            const res = await axios.get(`/api/admin/gyms/${gym._id}/members`);
            setGymMembers(res.data);
        } catch (err) {
            console.error('Error fetching gym members', err);
        } finally {
            setLoadingMembers(false);
        }
    };

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

    const filteredUsers = allUsers.filter(u => {
        if (!u) return false;
        const searchTermLower = (searchTerm || '').toLowerCase();
        const nameMatch = (u.name || '').toLowerCase().includes(searchTermLower);
        const emailMatch = (u.email || '').toLowerCase().includes(searchTermLower);
        const gymMatch = (u.gymId?.gymName || '').toLowerCase().includes(searchTermLower);
        return nameMatch || emailMatch || gymMatch;
    });

    if (loading) {
        return (
            <div className="min-h-screen bg-[#0a0a0a] flex items-center justify-center">
                <Loader2 className="w-10 h-10 text-[#c41e3a] animate-spin" />
            </div>
        );
    }

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c41e3a]/30 pb-20">
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
                {error && (
                    <motion.div
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        className="bg-red-500/10 border border-red-500/20 p-8 rounded-[2rem] flex flex-col items-center text-center gap-6"
                    >
                        <div className="w-16 h-16 bg-red-500/20 rounded-full flex items-center justify-center text-red-500">
                            <Activity size={32} />
                        </div>
                        <div>
                            <h4 className="text-xl font-black uppercase text-white mb-2 italic">Strategic Communications Interrupted</h4>
                            <p className="text-zinc-500 text-sm font-bold uppercase tracking-widest max-w-md mx-auto">{error}</p>
                        </div>
                        <button
                            onClick={fetchData}
                            className="px-8 py-3 bg-[#c41e3a] text-white rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] hover:bg-[#a01830] transition-all shadow-xl shadow-[#c41e3a]/20 active:scale-95"
                        >
                            Re-initiate Handshake
                        </button>
                    </motion.div>
                )}

                {/* Stats Grid */}
                {!selectedGym && (
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                        <motion.div
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] relative overflow-hidden group hover:border-[#c41e3a]/30 transition-all"
                        >
                            <div className="relative z-10 flex justify-between items-start">
                                <div>
                                    <p className="text-[10px] font-black uppercase tracking-[0.2em] text-zinc-500 mb-2">Partner Gyms</p>
                                    <h3 className="text-4xl font-black">{stats?.totalGyms || 0}</h3>
                                    <div className="mt-4 flex items-center gap-2 text-green-500 text-[10px] font-bold uppercase tracking-wider bg-green-500/10 py-1 px-2 rounded-lg w-fit">
                                        <TrendingUp size={12} /> Live Sync
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
                                    <h3 className="text-4xl font-black">{stats?.totalMembers || 0}</h3>
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
                )}

                {/* Tab Controls & Search */}
                {
                    !selectedGym && (
                        <div className="flex flex-col md:flex-row md:items-center justify-between gap-8 border-b border-white/5 pb-8">
                            <div className="flex bg-zinc-900/50 p-1.5 rounded-[1.5rem] border border-white/5 w-fit">
                                <button
                                    onClick={() => setActiveTab('gyms')}
                                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'gyms' ? 'bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    Gym Registry
                                </button>
                                <button
                                    onClick={() => setActiveTab('users')}
                                    className={`px-8 py-3 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === 'users' ? 'bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/20' : 'text-zinc-500 hover:text-zinc-300'}`}
                                >
                                    User Directory
                                </button>
                            </div>

                            <div className="relative group flex-1 max-w-md">
                                <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#c41e3a] transition-colors" size={18} />
                                <input
                                    type="text"
                                    placeholder={activeTab === 'gyms' ? "Search Gyms, Owners..." : "Search Trainees, Emails, Gyms..."}
                                    value={searchTerm}
                                    onChange={(e) => setSearchTerm(e.target.value)}
                                    className="bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-6 w-full focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-sm placeholder-zinc-700"
                                />
                            </div>
                        </div>
                    )
                }

                {/* Gym Deep-Dive View */}
                {
                    selectedGym && (
                        <motion.div
                            initial={{ opacity: 0, x: 20 }}
                            animate={{ opacity: 1, x: 0 }}
                            className="space-y-8"
                        >
                            <button
                                onClick={() => setSelectedGym(null)}
                                className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors group"
                            >
                                <ArrowLeft size={20} className="group-hover:-translate-x-1 transition-transform" />
                                <span className="text-xs font-black uppercase tracking-widest">Back to Directory</span>
                            </button>

                            <div className="bg-gradient-to-br from-zinc-900 to-black border border-white/5 rounded-[2.5rem] p-10 flex flex-col md:flex-row justify-between items-start md:items-center gap-8">
                                <div className="flex items-center gap-6">
                                    <div className="w-24 h-24 bg-[#c41e3a] rounded-3xl flex items-center justify-center shadow-2xl shadow-[#c41e3a]/20">
                                        <Building2 size={48} className="text-white" />
                                    </div>
                                    <div>
                                        <p className="text-[10px] font-black uppercase tracking-[0.3em] text-[#ffd700] mb-2">Partner Analysis</p>
                                        <h2 className="text-4xl font-black uppercase tracking-tighter">{selectedGym.gymName}</h2>
                                        <div className="flex items-center gap-4 mt-4 text-zinc-500 text-xs font-bold uppercase tracking-widest">
                                            <span className="flex items-center gap-1.5"><MapPin size={14} className="text-[#c41e3a]" /> {selectedGym.address}</span>
                                            <span className="w-1 h-1 bg-zinc-800 rounded-full" />
                                            <span className="flex items-center gap-1.5"><Mail size={14} className="text-[#c41e3a]" /> {selectedGym.email}</span>
                                        </div>
                                    </div>
                                </div>
                                <div className="flex items-center gap-6">
                                    <div className="text-center md:text-right">
                                        <p className="text-[10px] font-black uppercase tracking-widest text-zinc-600 leading-none mb-1">Active Trainees</p>
                                        <p className="text-4xl font-black text-[#ffd700]">{selectedGym.memberCount}</p>
                                    </div>
                                    <div className="p-4 bg-white/5 rounded-2xl border border-white/5">
                                        <Users size={32} className="text-zinc-500" />
                                    </div>
                                </div>
                            </div>

                            <div className="space-y-6">
                                <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                    <Users size={20} className="text-[#c41e3a]" /> Registered Member Roster
                                </h3>
                                {loadingMembers ? (
                                    <div className="py-20 flex justify-center"><Loader2 className="animate-spin text-[#c41e3a]" /></div>
                                ) : (
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                                        {gymMembers.map((member) => (
                                            <div key={member._id} className="bg-zinc-900/30 border border-white/5 rounded-3xl p-6 hover:bg-zinc-800/20 transition-all">
                                                <div className="flex items-center gap-4 mb-4">
                                                    <div className="w-12 h-12 bg-zinc-800 rounded-xl flex items-center justify-center text-[#ffd700] font-black">
                                                        {member.name.charAt(0)}
                                                    </div>
                                                    <div>
                                                        <h5 className="font-black uppercase tracking-tight">{member.name}</h5>
                                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{member.email}</p>
                                                    </div>
                                                </div>
                                                <div className="grid grid-cols-2 gap-3 mt-6 pt-4 border-t border-white/5">
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Phone</p>
                                                        <p className="text-[10px] font-bold">{member.phone || 'N/A'}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[8px] font-black uppercase tracking-widest text-zinc-600 mb-1">Joined</p>
                                                        <p className="text-[10px] font-bold">
                                                            {member.joinDate ? new Date(member.joinDate).toLocaleDateString() : 'N/A'}
                                                        </p>
                                                    </div>
                                                </div>
                                            </div>
                                        ))}
                                        {gymMembers.length === 0 && (
                                            <div className="col-span-full py-12 text-center text-zinc-600 font-bold uppercase tracking-widest text-xs border border-white/5 border-dashed rounded-[2rem]">
                                                No members registered in this facility yet.
                                            </div>
                                        )}
                                    </div>
                                )}
                            </div>
                        </motion.div>
                    )
                }

                {/* Main Content Tabs */}
                {
                    !selectedGym && (
                        <AnimatePresence mode="wait">
                            {activeTab === 'gyms' ? (
                                <motion.section
                                    key="gyms"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 gap-4">
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

                                                        <div className="flex items-center justify-end gap-3 lg:w-1/12 ml-auto">
                                                            <button
                                                                onClick={() => fetchGymMembers(gym)}
                                                                className="p-3 bg-zinc-900 rounded-xl text-zinc-500 hover:text-[#ffd700] hover:bg-zinc-800 border border-white/5 transition-all"
                                                                title="Explore Roster"
                                                            >
                                                                <Users size={18} />
                                                            </button>
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
                                                <Building2 size={40} className="mx-auto text-zinc-800 mb-6" />
                                                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-400">No Partners Identified</h3>
                                            </div>
                                        )}
                                    </div>
                                </motion.section>
                            ) : (
                                <motion.section
                                    key="users"
                                    initial={{ opacity: 0, y: 10 }}
                                    animate={{ opacity: 1, y: 0 }}
                                    exit={{ opacity: 0, y: -10 }}
                                    className="space-y-6"
                                >
                                    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                                        {filteredUsers.length > 0 ? (
                                            filteredUsers.map((user, index) => (
                                                <motion.div
                                                    key={user._id}
                                                    initial={{ opacity: 0, scale: 0.95 }}
                                                    animate={{ opacity: 1, scale: 1 }}
                                                    transition={{ delay: index * 0.02 }}
                                                    className="bg-zinc-900/40 border border-white/5 rounded-3xl p-6 hover:border-[#ffd700]/30 transition-all group"
                                                >
                                                    <div className="flex justify-between items-start mb-6">
                                                        <div className="w-14 h-14 bg-zinc-800 rounded-2xl flex items-center justify-center text-zinc-400 group-hover:bg-[#ffd700] group-hover:text-black transition-all">
                                                            <UserCircle size={32} />
                                                        </div>
                                                        <div className="bg-zinc-800/50 px-3 py-1.5 rounded-xl border border-white/5">
                                                            <p className="text-[8px] font-black uppercase tracking-widest text-zinc-500 leading-none mb-1">Affiliation</p>
                                                            <p className="text-[10px] font-black text-[#c41e3a] truncate max-w-[100px]">{user.gymId?.gymName || 'Independant'}</p>
                                                        </div>
                                                    </div>
                                                    <h4 className="text-lg font-black uppercase tracking-tight mb-4 group-hover:text-[#ffd700] transition-colors">{user.name}</h4>
                                                    <div className="space-y-3">
                                                        <div className="flex items-center gap-3 text-zinc-500">
                                                            <Mail size={14} className="text-[#c41e3a]" />
                                                            <span className="text-xs font-bold truncate">{user.email}</span>
                                                        </div>
                                                        <div className="flex items-center gap-3 text-zinc-500">
                                                            <Calendar size={14} className="text-[#c41e3a]" />
                                                            <span className="text-xs font-bold">
                                                                Member Since {user.joinDate ? new Date(user.joinDate).toLocaleDateString() : 'System'}
                                                            </span>
                                                        </div>
                                                    </div>
                                                </motion.div>
                                            ))
                                        ) : (
                                            <div className="col-span-full text-center py-24 bg-zinc-900/20 border border-white/5 border-dashed rounded-[3rem]">
                                                <Users size={40} className="mx-auto text-zinc-800 mb-6" />
                                                <h3 className="text-xl font-black uppercase tracking-tight text-zinc-400">Zero Personnel Found</h3>
                                            </div>
                                        )}
                                    </div>
                                </motion.section>
                            )}
                        </AnimatePresence>
                    )
                }
            </main >
        </div >
    );
};

export default AdminDashboard;
