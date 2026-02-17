import React, { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import { Lock, Mail, ArrowRight, Loader } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);
    const { login } = useAuth();
    const navigate = useNavigate();

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsLoading(true);
        setError('');

        try {
            // Use proxy or relative path if configured
            const res = await axios.post('/api/auth/login', formData);

            login(res.data.token, res.data.role, res.data.user);

            if (res.data.role === 'gym') {
                navigate('/gym/dashboard');
            } else {
                navigate('/user/dashboard');
            }
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Login failed. Please check your credentials.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background effects similar to Hero */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 left-1/4 w-[300px] h-[300px] bg-[#c41e3a] rounded-full blur-[120px] opacity-20 pointer-events-none" />
                <div className="absolute bottom-1/4 right-1/4 w-[300px] h-[300px] bg-[#d4af37] rounded-full blur-[120px] opacity-15 pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-full max-w-md relative z-10 shadow-2xl"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <img src="/assets/logo.png" alt="FCC Logo" className="h-12 mx-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </Link>
                    <h2 className="text-3xl font-black mb-2 text-white">Sign In</h2>
                    <p className="text-gray-400">Select your role to access the dashboard</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="space-y-5">
                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Email Address</label>
                        <div className="relative">
                            <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                                placeholder="you@example.com"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Password</label>
                        <div className="relative">
                            <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#d4af37] focus:ring-1 focus:ring-[#d4af37] transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <button
                        type="submit"
                        disabled={isLoading}
                        className="w-full bg-gradient-to-r from-[#c41e3a] to-[#d4af37] text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-[#c41e3a]/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                    >
                        {isLoading ? (
                            <Loader className="w-5 h-5 animate-spin" />
                        ) : (
                            <>
                                Access Dashboard <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                            </>
                        )}
                    </button>
                </form>

                <div className="mt-8 pt-6 border-t border-white/10 text-center">

                    <p className="text-gray-400 text-sm mb-2">New Gym Partner?</p>
                    <Link to="/register-gym" className="text-[#ffd700] hover:text-[#d4af37] font-bold text-sm uppercase tracking-wide transition-colors">
                        Apply for Partnership
                    </Link>

                </div>
            </motion.div>
        </div>
    );
};

export default Login;
