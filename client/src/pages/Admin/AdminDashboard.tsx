// Deployment Protocol: Resyncing CMS Hub
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import {
    LayoutDashboard,
    MessageSquare,
    Calendar,
    Zap,
    BookOpen,
    Image as ImageIcon,
    ShieldCheck,
    LogOut,
    Plus,
    Trash2,
    Edit,
    Search,
    TrendingUp,
    MapPin,
    Mail,
    ArrowRight,
    Menu,
    X,
    Clock,
    CheckCircle2,
    Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { useAuth } from '../../context/AuthContext';

// --- Sub-components for CMS ---

const SectionHeader = ({ title, subtitle, action }: { title: string; subtitle: string; action?: React.ReactNode }) => (
    <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-10">
        <div>
            <h2 className="text-4xl font-black uppercase tracking-tighter mb-2 italic">
                <span className="text-white">Strategic</span> <span className="text-[#c41e3a]">{title}</span>
            </h2>
            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.3em]">{subtitle}</p>
        </div>
        {action && <div>{action}</div>}
    </div>
);

const AdminDashboard = () => {
    const { user, logout } = useAuth();
    const [activeTab, setActiveTab] = useState<'overview' | 'enquiries' | 'events' | 'athletes' | 'blog' | 'gallery'>('overview');
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    const [error, setError] = useState<string | null>(null);

    // Data States
    const [stats, setStats] = useState({ enquiries: 0, events: 0, blogPosts: 0, athletes: 0 });
    const [enquiries, setEnquiries] = useState([]);
    const [events, setEvents] = useState([]);

    // Modal States
    const [isEventModalOpen, setIsEventModalOpen] = useState(false);
    const [eventForm, setEventForm] = useState({
        title: '',
        date: '',
        location: '',
        type: 'Competition',
        description: '',
        image: ''
    });

    const fetchData = async () => {
        try {
            const [enqRes, evRes] = await Promise.all([
                axios.get('/api/admin/cms/enquiries'),
                axios.get('/api/admin/cms/events')
            ]);
            setEnquiries(enqRes.data);
            setEvents(evRes.data);
            setStats({
                enquiries: enqRes.data.length,
                events: evRes.data.length,
                blogPosts: 0,
                athletes: 0
            });
        } catch (err: any) {
            setError('System Alert: Tactical data synchronization failed.');
        }
    };

    const handleEventSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        try {
            await axios.post('/api/admin/cms/events', eventForm);
            setIsEventModalOpen(false);
            fetchData();
            setEventForm({ title: '', date: '', location: '', type: 'Competition', description: '', image: '' });
        } catch (err) {
            setError('Strategic Error: Event deployment failed.');
        }
    };

    const handleStatusUpdate = async (id: string, status: string) => {
        try {
            await axios.put(`/api/admin/cms/enquiries/${id}`, { status });
            fetchData();
        } catch (err) {
            setError('Operational Error: Status update failed.');
        }
    };

    useEffect(() => {
        fetchData();
    }, []);

    const navItems = [
        { id: 'overview', label: 'Overview', icon: LayoutDashboard },
        { id: 'enquiries', label: 'Competition Inquiries', icon: MessageSquare },
        { id: 'events', label: 'Championships', icon: Calendar },
        { id: 'athletes', label: 'Strongest Human', icon: Zap },
        { id: 'blog', label: 'The Blog', icon: BookOpen },
        { id: 'gallery', label: 'Media Gallery', icon: ImageIcon },
    ];

    const Sidebar = () => (
        <div className={`fixed inset-y-0 left-0 z-50 w-72 bg-black border-r border-white/5 transform ${isSidebarOpen ? 'translate-x-0' : '-translate-x-full'} lg:translate-x-0 transition-transform duration-300 ease-in-out`}>
            <div className="h-full flex flex-col p-6">
                <div className="flex items-center gap-4 mb-12 px-2">
                    <div className="w-10 h-10 bg-gradient-to-br from-[#c41e3a] to-[#8a1529] rounded-xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/20">
                        <ShieldCheck className="text-white" size={20} />
                    </div>
                    <div>
                        <h1 className="text-lg font-black uppercase tracking-tighter text-white">FCC Terminal</h1>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Oversight</p>
                    </div>
                </div>

                <nav className="flex-1 space-y-2">
                    {navItems.map((item) => (
                        <button
                            key={item.id}
                            onClick={() => {
                                setActiveTab(item.id as any);
                                setIsSidebarOpen(false);
                            }}
                            className={`w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest transition-all ${activeTab === item.id ? 'bg-[#c41e3a] text-white shadow-lg shadow-[#c41e3a]/20' : 'text-zinc-500 hover:text-white hover:bg-white/5'}`}
                        >
                            <item.icon size={18} />
                            {item.label}
                        </button>
                    ))}
                </nav>

                <div className="pt-6 border-t border-white/5 space-y-4">
                    <div className="flex items-center gap-3 px-4 py-2">
                        <div className="w-8 h-8 rounded-full bg-zinc-800 flex items-center justify-center text-[10px] font-black">
                            {user?.name?.charAt(0)}
                        </div>
                        <div className="min-w-0">
                            <p className="text-[10px] font-black text-white truncate">{user?.name}</p>
                            <p className="text-[9px] text-zinc-500 font-bold uppercase">Overseer</p>
                        </div>
                    </div>
                    <button
                        onClick={logout}
                        className="w-full flex items-center gap-4 px-4 py-4 rounded-2xl text-xs font-black uppercase tracking-widest text-zinc-500 hover:text-[#c41e3a] hover:bg-red-500/5 transition-all"
                    >
                        <LogOut size={18} />
                        Detach
                    </button>
                </div>
            </div>
        </div>
    );

    return (
        <div className="min-h-screen bg-[#0a0a0a] text-white font-sans selection:bg-[#c41e3a]/30">
            <Sidebar />

            {/* Event Creation Modal */}
            <AnimatePresence>
                {isEventModalOpen && (
                    <div className="fixed inset-0 z-[60] flex items-center justify-center p-4">
                        <motion.div
                            initial={{ opacity: 0 }}
                            animate={{ opacity: 1 }}
                            exit={{ opacity: 0 }}
                            onClick={() => setIsEventModalOpen(false)}
                            className="absolute inset-0 bg-black/80 backdrop-blur-xl"
                        />
                        <motion.div
                            initial={{ scale: 0.9, opacity: 0, y: 20 }}
                            animate={{ scale: 1, opacity: 1, y: 0 }}
                            exit={{ scale: 0.9, opacity: 0, y: 20 }}
                            className="relative w-full max-w-2xl bg-zinc-900 border border-white/10 rounded-[2.5rem] p-10 overflow-hidden shadow-2xl"
                        >
                            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-[#c41e3a] via-[#ffd700] to-[#c41e3a]" />
                            <div className="flex justify-between items-center mb-8">
                                <h3 className="text-2xl font-black uppercase italic tracking-tighter">Initialize Championship</h3>
                                <button onClick={() => setIsEventModalOpen(false)} className="p-2 hover:bg-white/5 rounded-full transition-colors"><X size={20} /></button>
                            </div>

                            <form onSubmit={handleEventSubmit} className="space-y-6">
                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Operation Name</label>
                                        <input
                                            required
                                            value={eventForm.title}
                                            onChange={(e) => setEventForm({ ...eventForm, title: e.target.value })}
                                            placeholder="e.g. Hyderabad Strongman Open"
                                            className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#c41e3a] outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Deployment Type</label>
                                        <select
                                            value={eventForm.type}
                                            onChange={(e) => setEventForm({ ...eventForm, type: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#c41e3a] outline-none"
                                        >
                                            <option value="Competition">Competition</option>
                                            <option value="Seminar">Seminar</option>
                                            <option value="Training">Training</option>
                                        </select>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Coordinates (Location)</label>
                                        <input
                                            required
                                            value={eventForm.location}
                                            onChange={(e) => setEventForm({ ...eventForm, location: e.target.value })}
                                            placeholder="City, Venue..."
                                            className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#c41e3a] outline-none"
                                        />
                                    </div>
                                    <div className="space-y-2">
                                        <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Launch Date</label>
                                        <input
                                            required
                                            type="date"
                                            value={eventForm.date}
                                            onChange={(e) => setEventForm({ ...eventForm, date: e.target.value })}
                                            className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#c41e3a] outline-none"
                                        />
                                    </div>
                                </div>

                                <div className="space-y-2">
                                    <label className="text-[10px] font-black uppercase tracking-widest text-zinc-500">Strategic Brief (Description)</label>
                                    <textarea
                                        required
                                        rows={4}
                                        value={eventForm.description}
                                        onChange={(e) => setEventForm({ ...eventForm, description: e.target.value })}
                                        placeholder="Details about the championship..."
                                        className="w-full bg-black border border-white/5 rounded-xl py-3 px-4 text-sm font-bold focus:border-[#c41e3a] outline-none resize-none"
                                    />
                                </div>

                                <button
                                    type="submit"
                                    className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8a1529] py-4 rounded-xl text-xs font-black uppercase tracking-[0.3em] shadow-xl shadow-[#c41e3a]/20"
                                >
                                    Confirm Deployment
                                </button>
                            </form>
                        </motion.div>
                    </div>
                )}
            </AnimatePresence>

            {/* Main Content Area */}
            <div className="lg:ml-72 min-h-screen">
                {/* Mobile Header */}
                <header className="lg:hidden h-20 px-6 border-b border-white/5 bg-black/50 backdrop-blur-xl flex items-center justify-between sticky top-0 z-40">
                    <div className="flex items-center gap-3">
                        <div className="w-8 h-8 bg-[#c41e3a] rounded-lg flex items-center justify-center">
                            <ShieldCheck size={16} />
                        </div>
                        <h2 className="text-sm font-black uppercase tracking-tighter">FCC Admin</h2>
                    </div>
                    <button
                        onClick={() => setIsSidebarOpen(true)}
                        className="p-2 text-zinc-400 hover:text-white transition-colors"
                    >
                        <Menu size={24} />
                    </button>
                </header>

                <main className="p-6 md:p-12 max-w-7xl mx-auto">
                    {error && (
                        <div className="bg-red-500/10 border border-red-500/20 p-6 rounded-3xl mb-12 flex items-center justify-between text-red-500">
                            <p className="text-sm font-bold uppercase tracking-widest italic">{error}</p>
                            <button onClick={fetchData} className="px-4 py-2 bg-red-500/10 hover:bg-red-500/20 rounded-xl transition-all">
                                Retry Handshake
                            </button>
                        </div>
                    )}

                    <AnimatePresence mode="wait">
                        {activeTab === 'overview' && (
                            <motion.div
                                key="overview"
                                initial={{ opacity: 0, y: 20 }}
                                animate={{ opacity: 1, y: 0 }}
                                exit={{ opacity: 0, y: -20 }}
                                className="space-y-12"
                            >
                                <SectionHeader title="Dashboard" subtitle="Global Performance Overview" />

                                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
                                    {[
                                        { label: 'Total Inquiries', value: stats.enquiries, icon: MessageSquare, color: 'text-blue-500' },
                                        { label: 'Active Events', value: stats.events, icon: Calendar, color: 'text-[#ffd700]' },
                                        { label: 'Blog Posts', value: stats.blogPosts, icon: BookOpen, color: 'text-green-500' },
                                        { label: 'Athletes', value: stats.athletes, icon: Zap, color: 'text-[#c41e3a]' },
                                    ].map((stat) => (
                                        <div key={stat.label} className="bg-zinc-900/40 border border-white/5 p-8 rounded-[2rem] group hover:border-white/10 transition-all">
                                            <div className="flex justify-between items-start mb-4">
                                                <div className={`p-3 bg-white/5 rounded-2xl ${stat.color} group-hover:scale-110 transition-transform`}>
                                                    <stat.icon size={24} />
                                                </div>
                                                <TrendingUp size={16} className="text-zinc-600" />
                                            </div>
                                            <h4 className="text-4xl font-black mb-1">{stat.value}</h4>
                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-[0.2em]">{stat.label}</p>
                                        </div>
                                    ))}
                                </div>

                                {/* Quick Actions & Recent Enquiries */}
                                <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">
                                    <div className="lg:col-span-2 space-y-6">
                                        <h3 className="text-lg font-black uppercase tracking-tight flex items-center gap-3">
                                            <Clock size={20} className="text-[#c41e3a]" /> Recent Personnel Signals
                                        </h3>
                                        <div className="space-y-4">
                                            {enquiries.slice(0, 5).map((enq: any) => (
                                                <div key={enq._id} className="bg-zinc-900/20 border border-white/5 p-6 rounded-[2rem] flex flex-col md:flex-row md:items-center justify-between gap-4">
                                                    <div className="flex items-center gap-4">
                                                        <div className="w-10 h-10 rounded-full bg-white/5 flex items-center justify-center text-[#ffd700] font-black uppercase text-xs">
                                                            {enq.name?.charAt(0)}
                                                        </div>
                                                        <div>
                                                            <h5 className="font-black uppercase tracking-tight text-sm">{enq.name}</h5>
                                                            <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">{enq.category} · {enq.institution || 'Individual'}</p>
                                                        </div>
                                                    </div>
                                                    <div className="flex items-center gap-4">
                                                        <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${enq.status === 'pending' ? 'bg-orange-500/10 text-orange-500' : 'bg-green-500/10 text-green-500'}`}>
                                                            {enq.status}
                                                        </span>
                                                        <button className="p-2 text-zinc-600 hover:text-white transition-colors">
                                                            <ArrowRight size={18} />
                                                        </button>
                                                    </div>
                                                </div>
                                            ))}
                                            {enquiries.length === 0 && <div className="text-zinc-700 font-black uppercase text-xs py-10">Zero signals detected.</div>}
                                        </div>
                                    </div>

                                    <div className="space-y-6">
                                        <h3 className="text-lg font-black uppercase tracking-tight">System Actions</h3>
                                        <div className="grid grid-cols-1 gap-4">
                                            <button onClick={() => setActiveTab('events')} className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8a1529] p-6 rounded-[2rem] text-left group overflow-hidden relative shadow-lg shadow-[#c41e3a]/10">
                                                <Calendar className="absolute -right-4 -bottom-4 text-white/10 w-32 h-32 group-hover:scale-110 transition-transform" />
                                                <h4 className="text-sm font-black uppercase tracking-widest mb-1">New Championship</h4>
                                                <p className="text-[9px] font-bold text-white/50 uppercase">Initialize new event protocols</p>
                                            </button>
                                            <button onClick={() => setActiveTab('blog')} className="w-full bg-white/5 border border-white/10 p-6 rounded-[2rem] text-left group hover:bg-white/10 transition-all">
                                                <h4 className="text-sm font-black uppercase tracking-widest mb-1">Draft Article</h4>
                                                <p className="text-[9px] font-bold text-zinc-500 uppercase">Broadcast strategic communications</p>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'enquiries' && (
                            <motion.div
                                key="enquiries"
                                initial={{ opacity: 0, x: 20 }}
                                animate={{ opacity: 1, x: 0 }}
                                exit={{ opacity: 0, x: -20 }}
                                className="space-y-12"
                            >
                                <SectionHeader title="Inquiries" subtitle="Managed Personnel Communications" />

                                <div className="bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden">
                                    <div className="p-8 border-b border-white/5 flex flex-col md:flex-row md:items-center justify-between gap-6">
                                        <div className="relative flex-1 max-w-md group">
                                            <Search className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600 group-focus-within:text-[#c41e3a]" size={16} />
                                            <input
                                                type="text"
                                                placeholder="Intercept signal by name, email, or category..."
                                                className="w-full bg-black border border-white/5 rounded-2xl py-3 pl-12 pr-6 text-sm font-bold placeholder-zinc-700 focus:outline-none focus:border-[#c41e3a] transition-all"
                                            />
                                        </div>
                                        <button className="flex items-center gap-2 px-6 py-3 bg-white/5 hover:bg-white/10 rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all">
                                            <Filter size={14} /> Filter Logic
                                        </button>
                                    </div>

                                    <div className="overflow-x-auto">
                                        <table className="w-full">
                                            <thead>
                                                <tr className="border-b border-white/5">
                                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Subject</th>
                                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Contact</th>
                                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Category</th>
                                                    <th className="px-8 py-6 text-left text-[10px] font-black uppercase tracking-widest text-zinc-500">Status</th>
                                                    <th className="px-8 py-6 text-right text-[10px] font-black uppercase tracking-widest text-zinc-500">Action</th>
                                                </tr>
                                            </thead>
                                            <tbody className="divide-y divide-white/5">
                                                {enquiries.map((enq: any) => (
                                                    <tr key={enq._id} className="hover:bg-white/[0.02] transition-colors">
                                                        <td className="px-8 py-6">
                                                            <p className="font-black text-sm uppercase">{enq.name}</p>
                                                            <p className="text-[9px] text-zinc-500 font-bold uppercase truncate max-w-[200px]">{enq.institution || 'N/A'}</p>
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <p className="text-xs font-bold text-zinc-400">{enq.email}</p>
                                                            <p className="text-[10px] font-black text-[#ffd700]">{enq.phone}</p>
                                                        </td>
                                                        <td className="px-8 py-6 text-[10px] font-black uppercase tracking-widest text-zinc-400">
                                                            {enq.category}
                                                        </td>
                                                        <td className="px-8 py-6">
                                                            <span className={`px-4 py-1.5 rounded-full text-[9px] font-black uppercase tracking-widest ${enq.status === 'pending' ? 'bg-orange-500/10 text-orange-500 border border-orange-500/20' : 'bg-green-500/10 text-green-500 border border-green-500/20'}`}>
                                                                {enq.status}
                                                            </span>
                                                        </td>
                                                        <td className="px-8 py-6 text-right">
                                                            <div className="flex justify-end gap-2">
                                                                {enq.status === 'pending' && (
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(enq._id, 'contacted')}
                                                                        className="p-3 bg-white/5 hover:bg-white/10 text-[#ffd700] rounded-xl transition-all"
                                                                        title="Mark as Contacted"
                                                                    >
                                                                        <Mail size={16} />
                                                                    </button>
                                                                )}
                                                                {enq.status !== 'processed' && (
                                                                    <button
                                                                        onClick={() => handleStatusUpdate(enq._id, 'processed')}
                                                                        className="p-3 bg-white/5 hover:bg-white/10 text-green-500 rounded-xl transition-all"
                                                                        title="Resolution Successful"
                                                                    >
                                                                        <CheckCircle2 size={16} />
                                                                    </button>
                                                                )}
                                                            </div>
                                                        </td>
                                                    </tr>
                                                ))}
                                            </tbody>
                                        </table>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'events' && (
                            <motion.div
                                key="events"
                                initial={{ opacity: 0, scale: 0.95 }}
                                animate={{ opacity: 1, scale: 1 }}
                                exit={{ opacity: 0, scale: 0.95 }}
                                className="space-y-12"
                            >
                                <SectionHeader
                                    title="Championships"
                                    subtitle="Event Deployment Manifest"
                                    action={
                                        <button
                                            onClick={() => setIsEventModalOpen(true)}
                                            className="flex items-center gap-3 px-8 py-4 bg-[#c41e3a] hover:bg-[#a01830] rounded-2xl text-[10px] font-black uppercase tracking-[0.2em] transition-all shadow-xl shadow-[#c41e3a]/20"
                                        >
                                            <Plus size={16} /> Deploy New Event
                                        </button>
                                    }
                                />

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    {events.map((event: any) => (
                                        <div key={event._id} className="relative group bg-zinc-900/30 border border-white/5 rounded-[2.5rem] overflow-hidden hover:border-[#ffd700]/30 transition-all">
                                            <div className="h-48 overflow-hidden relative">
                                                <img src={event.image} alt={event.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 opacity-60" />
                                                <div className="absolute inset-0 bg-gradient-to-t from-black to-transparent" />
                                                <div className="absolute bottom-6 left-8">
                                                    <span className="px-3 py-1 bg-[#c41e3a] text-[8px] font-black uppercase tracking-[0.2em] rounded-lg mb-2 inline-block">
                                                        {event.type}
                                                    </span>
                                                    <h4 className="text-2xl font-black uppercase italic tracking-tighter">{event.title}</h4>
                                                </div>
                                            </div>
                                            <div className="p-8 space-y-6">
                                                <div className="grid grid-cols-2 gap-6">
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Location</p>
                                                        <p className="text-xs font-bold flex items-center gap-2"><MapPin size={12} className="text-[#c41e3a]" /> {event.location}</p>
                                                    </div>
                                                    <div>
                                                        <p className="text-[9px] font-black uppercase tracking-widest text-zinc-500 mb-2">Scheduled</p>
                                                        <p className="text-xs font-bold flex items-center gap-2"><Calendar size={12} className="text-[#c41e3a]" /> {new Date(event.date).toLocaleDateString()}</p>
                                                    </div>
                                                </div>
                                                <div className="pt-6 border-t border-white/5 flex justify-between items-center">
                                                    <button className="flex items-center gap-2 text-[10px] font-black uppercase tracking-widest text-[#ffd700] hover:text-white transition-colors">
                                                        <Edit size={14} /> Modify
                                                    </button>
                                                    <button className="p-3 bg-red-500/5 hover:bg-red-500/20 text-red-500 rounded-xl transition-all">
                                                        <Trash2 size={16} />
                                                    </button>
                                                </div>
                                            </div>
                                        </div>
                                    ))}
                                    {events.length === 0 && (
                                        <div className="col-span-full py-32 text-center bg-zinc-900/10 border border-white/10 border-dashed rounded-[3rem]">
                                            <h4 className="text-zinc-700 font-black uppercase tracking-widest text-sm">No Active Deployments Found</h4>
                                        </div>
                                    )}
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'athletes' && (
                            <motion.div key="athletes" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <SectionHeader title="Athletes" subtitle="Strongest Human Rankings Control" action={<button className="flex items-center gap-3 px-8 py-4 bg-[#c41e3a] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"><Plus size={16} /> Add Champion</button>} />
                                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                                    <div className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 text-center">
                                        <Zap className="mx-auto mb-4 text-[#ffd700]" size={40} />
                                        <h4 className="text-xl font-black uppercase mb-1 italic">Men's Division</h4>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Standings Management</p>
                                    </div>
                                    <div className="bg-zinc-900/40 p-10 rounded-[2.5rem] border border-white/5 text-center">
                                        <Zap className="mx-auto mb-4 text-[#c41e3a]" size={40} />
                                        <h4 className="text-xl font-black uppercase mb-1 italic">Women's Division</h4>
                                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest">Global Standings Management</p>
                                    </div>
                                </div>
                            </motion.div>
                        )}

                        {activeTab === 'blog' && (
                            <motion.div key="blog" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <SectionHeader title="Articles" subtitle="Strategic Communications Console" action={<button className="flex items-center gap-3 px-8 py-4 bg-[#c41e3a] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"><Plus size={16} /> New Article</button>} />
                                <div className="bg-zinc-900/10 border border-white/10 border-dashed rounded-[3rem] py-20 text-center">
                                    <p className="text-zinc-700 font-black uppercase text-xs tracking-[0.2em]">Article feed currently empty</p>
                                </div>
                            </motion.div>
                        )}
                        {activeTab === 'gallery' && (
                            <motion.div key="gallery" initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="space-y-12">
                                <SectionHeader title="Gallery" subtitle="Visual Asset Repository" action={<button className="flex items-center gap-3 px-8 py-4 bg-[#c41e3a] rounded-2xl text-[10px] font-black uppercase tracking-widest transition-all"><Plus size={16} /> Upload Media</button>} />
                                <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
                                    {[1, 2, 3, 4].map((i) => (
                                        <div key={i} className="aspect-square bg-zinc-900 border border-white/5 rounded-3xl overflow-hidden relative group">
                                            <div className="absolute inset-0 bg-black/40 group-hover:bg-transparent transition-all" />
                                            <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-all pointer-events-none">
                                                <ImageIcon size={32} className="text-white/20" />
                                            </div>
                                            <div className="absolute bottom-4 right-4 flex gap-2">
                                                <button className="p-2 bg-black/60 rounded-lg text-red-500 hover:bg-black transition-all">
                                                    <Trash2 size={14} />
                                                </button>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </motion.div>
                        )}
                    </AnimatePresence>
                </main>
            </div>
        </div>
    );
};

export default AdminDashboard;
