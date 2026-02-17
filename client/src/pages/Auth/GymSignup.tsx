import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';
import { motion } from 'motion/react';
import { Dumbbell, User, Mail, Lock, Phone, MapPin, ArrowRight, Loader } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';

const GymSignup = () => {
    const [formData, setFormData] = useState({
        gymName: '',
        ownerName: '',
        email: '',
        password: '',
        phone: '',
        address: ''
    });
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
            const res = await axios.post('/api/auth/register-gym', formData);
            login(res.data.token, res.data.role, res.data.user);
            navigate('/gym/dashboard');
        } catch (err: any) {
            setError(err.response?.data?.msg || 'Registration failed. Please try again.');
        } finally {
            setIsLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-black text-white flex items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 right-1/4 w-[400px] h-[400px] bg-[#c41e3a] rounded-full blur-[150px] opacity-15 pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[400px] h-[400px] bg-[#ffd700] rounded-full blur-[150px] opacity-10 pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="bg-zinc-900/80 backdrop-blur-md p-8 rounded-2xl border border-white/10 w-full max-w-2xl relative z-10 shadow-2xl my-10"
            >
                <div className="text-center mb-8">
                    <Link to="/" className="inline-block mb-4">
                        <img src="/assets/logo.png" alt="FCC Logo" className="h-12 mx-auto" onError={(e) => e.currentTarget.style.display = 'none'} />
                    </Link>
                    <h2 className="text-3xl font-black mb-2 text-white">Partner Registration</h2>
                    <p className="text-gray-400">Join the FCC Network as a Gym Partner</p>
                </div>

                {error && (
                    <div className="bg-red-500/10 border border-red-500/50 text-red-500 p-3 rounded-lg mb-6 text-sm text-center">
                        {error}
                    </div>
                )}

                <form onSubmit={handleSubmit} className="grid grid-cols-1 md:grid-cols-2 gap-5">
                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Gym Name</label>
                        <div className="relative">
                            <Dumbbell className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="gymName"
                                value={formData.gymName}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="Iron Pump Gym"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Owner Name</label>
                        <div className="relative">
                            <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="ownerName"
                                value={formData.ownerName}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="John Doe"
                            />
                        </div>
                    </div>

                    <div>
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Phone Number</label>
                        <div className="relative">
                            <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="tel"
                                name="phone"
                                value={formData.phone}
                                onChange={handleChange}
                                required
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="+91 98765 43210"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2">
                        <label className="block text-sm font-medium text-gray-400 mb-1.5">Address</label>
                        <div className="relative">
                            <MapPin className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-gray-500" />
                            <input
                                type="text"
                                name="address"
                                value={formData.address}
                                onChange={handleChange}
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="Street, City, Zip Code"
                            />
                        </div>
                    </div>

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
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="gym@example.com"
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
                                className="w-full bg-black/50 border border-white/10 rounded-lg py-3 pl-10 pr-4 text-white placeholder-gray-600 focus:outline-none focus:border-[#c41e3a] focus:ring-1 focus:ring-[#c41e3a] transition-all"
                                placeholder="••••••••"
                            />
                        </div>
                    </div>

                    <div className="col-span-1 md:col-span-2 mt-4">
                        <button
                            type="submit"
                            disabled={isLoading}
                            className="w-full bg-gradient-to-r from-[#c41e3a] to-[#d4af37] text-white font-bold py-3.5 rounded-lg shadow-lg hover:shadow-[#c41e3a]/40 transition-all flex items-center justify-center gap-2 group disabled:opacity-70 disabled:cursor-not-allowed uppercase tracking-wide"
                        >
                            {isLoading ? (
                                <Loader className="w-5 h-5 animate-spin" />
                            ) : (
                                <>
                                    Register Gym <ArrowRight className="w-5 h-5 group-hover:translate-x-1 transition-transform" />
                                </>
                            )}
                        </button>
                    </div>
                </form>

                <div className="mt-6 text-center text-sm text-gray-500">
                    <p>Already a partner?</p>
                    <Link to="/login" className="text-[#ffd700] hover:text-[#d4af37] font-semibold transition-colors">
                        Sign In here
                    </Link>
                </div>
            </motion.div>
        </div>
    );
};

export default GymSignup;
