import { useState, useEffect } from 'react';
import axios from 'axios';
import {
    X,
    User,
    Mail,
    Phone,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Save
} from 'lucide-react';
import { motion } from 'motion/react';

interface EditMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
    member: any;
}

const EditMemberModal = ({ isOpen, onClose, onSuccess, member }: EditMemberModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);

    useEffect(() => {
        if (member) {
            setFormData({
                name: member.name || '',
                email: member.email || '',
                phone: member.phone || ''
            });
        }
    }, [member]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.put(`/api/gym/members/${member._id}`, formData);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error updating member details.');
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
                        <h3 className="text-xl font-bold uppercase tracking-tight">Edit Profile</h3>
                        <p className="text-[10px] text-zinc-500 font-bold uppercase tracking-widest mt-0.5">Atlas Identity Management</p>
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
                            Records updated successfully!
                        </div>
                    )}

                    <div className="space-y-5">
                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest">Legal Name</label>
                            <div className="relative">
                                <User className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    required
                                    type="text"
                                    name="name"
                                    value={formData.name}
                                    onChange={handleChange}
                                    placeholder="Champion Name"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white placeholder-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest">Email Access</label>
                            <div className="relative">
                                <Mail className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    required
                                    type="email"
                                    name="email"
                                    value={formData.email}
                                    onChange={handleChange}
                                    placeholder="comm@link.com"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white placeholder-zinc-700"
                                />
                            </div>
                        </div>

                        <div className="space-y-1.5">
                            <label className="text-[10px] font-black text-zinc-500 ml-1 uppercase tracking-widest">Phone Frequency</label>
                            <div className="relative">
                                <Phone className="absolute left-4 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+100 000 0000"
                                    className="w-full bg-zinc-900/50 border border-white/5 rounded-2xl py-4 pl-12 pr-4 focus:outline-none focus:border-[#c41e3a] transition-all font-bold text-white placeholder-zinc-700"
                                />
                            </div>
                        </div>
                    </div>

                    <div className="pt-6 flex gap-4">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-4 bg-zinc-900 hover:bg-zinc-800 rounded-2xl font-black uppercase tracking-widest text-zinc-500 hover:text-white transition-all text-xs border border-white/5"
                        >
                            Abort
                        </button>
                        <button
                            disabled={loading || isSuccess}
                            className="flex-[2] py-4 bg-[#c41e3a] hover:bg-[#a01830] disabled:opacity-50 rounded-2xl font-black uppercase tracking-widest text-white transition-all shadow-xl shadow-[#c41e3a]/20 flex items-center justify-center gap-3 text-xs"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : (
                                <>
                                    <span>Sync Changes</span>
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

export default EditMemberModal;
