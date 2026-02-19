import { useState } from 'react';
import axios from 'axios';
import {
    X,
    User,
    Mail,
    Phone,
    Lock,
    Loader2,
    CheckCircle2,
    AlertCircle,
    Eye,
    EyeOff
} from 'lucide-react';
import { motion } from 'motion/react';

interface AddMemberModalProps {
    isOpen: boolean;
    onClose: () => void;
    onSuccess: () => void;
}

const AddMemberModal = ({ isOpen, onClose, onSuccess }: AddMemberModalProps) => {
    const [formData, setFormData] = useState({
        name: '',
        email: '',
        phone: '',
        password: ''
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const [isSuccess, setIsSuccess] = useState(false);
    const [showPassword, setShowPassword] = useState(false);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
        setError(null);
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        try {
            await axios.post('/api/gym/members', formData);
            setIsSuccess(true);
            setTimeout(() => {
                setIsSuccess(false);
                setFormData({ name: '', email: '', phone: '', password: '' });
                onSuccess();
                onClose();
            }, 1500);
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Error adding member. Please try again.');
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
                className="bg-zinc-900 border border-zinc-800 w-full max-w-lg rounded-2xl overflow-hidden shadow-2xl"
            >
                <div className="p-6 border-b border-zinc-800 flex justify-between items-center bg-zinc-950/50">
                    <h3 className="text-xl font-bold">Add New Member</h3>
                    <button onClick={onClose} className="p-2 hover:bg-zinc-800 rounded-lg transition-colors text-zinc-500">
                        <X size={20} />
                    </button>
                </div>

                <form onSubmit={handleSubmit} className="p-6 space-y-5">
                    {error && (
                        <div className="flex items-center gap-2 p-3 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl text-sm animate-pulse">
                            <AlertCircle size={18} />
                            {error}
                        </div>
                    )}

                    {isSuccess && (
                        <div className="flex items-center gap-2 p-3 bg-green-500/10 border border-green-500/20 text-green-500 rounded-xl text-sm">
                            <CheckCircle2 size={18} />
                            Member added successfully!
                        </div>
                    )}

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-400 ml-1">Full Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                            <input
                                required
                                type="text"
                                name="name"
                                value={formData.name}
                                onChange={handleChange}
                                placeholder="Joe Doe"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="space-y-1.5">
                        <label className="text-sm font-bold text-zinc-400 ml-1">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                            <input
                                required
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                placeholder="joe@example.com"
                                className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                            />
                        </div>
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-zinc-400 ml-1">Phone Number</label>
                            <div className="relative">
                                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    type="tel"
                                    name="phone"
                                    value={formData.phone}
                                    onChange={handleChange}
                                    placeholder="+1 234 567 890"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-4 focus:outline-none focus:border-red-600 transition-colors"
                                />
                            </div>
                        </div>
                        <div className="space-y-1.5">
                            <label className="text-sm font-bold text-zinc-400 ml-1">Default Password</label>
                            <div className="relative">
                                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-zinc-600" size={18} />
                                <input
                                    required
                                    type={showPassword ? "text" : "password"}
                                    name="password"
                                    value={formData.password}
                                    onChange={handleChange}
                                    placeholder="••••••••"
                                    className="w-full bg-zinc-950 border border-zinc-800 rounded-xl py-3 pl-10 pr-12 focus:outline-none focus:border-red-600 transition-colors"
                                />
                                <button
                                    type="button"
                                    onClick={() => setShowPassword(!showPassword)}
                                    className="absolute right-3 top-1/2 -translate-y-1/2 text-zinc-500 hover:text-red-600 transition-colors"
                                >
                                    {showPassword ? <EyeOff size={18} /> : <Eye size={18} />}
                                </button>
                            </div>
                        </div>
                    </div>

                    <div className="pt-4 flex gap-3">
                        <button
                            type="button"
                            onClick={onClose}
                            className="flex-1 py-3 border border-zinc-800 rounded-xl font-bold hover:bg-zinc-800 transition-colors"
                        >
                            Cancel
                        </button>
                        <button
                            disabled={loading || isSuccess}
                            className="flex-1 py-3 bg-red-600 hover:bg-red-700 disabled:opacity-50 rounded-xl font-bold transition-all shadow-lg shadow-red-600/20 flex items-center justify-center gap-2"
                        >
                            {loading ? <Loader2 className="animate-spin" size={20} /> : 'Create Account'}
                        </button>
                    </div>
                </form>
            </motion.div>
        </div>
    );
};

export default AddMemberModal;
