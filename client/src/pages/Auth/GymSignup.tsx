import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { motion } from 'motion/react';
import { Dumbbell, Users, ClipboardList, Activity, Mail } from 'lucide-react';

const GymSignup = () => {
    const [email, setEmail] = useState('');
    const [subscribed, setSubscribed] = useState(false);

    const handleSubscribe = (e: React.FormEvent) => {
        e.preventDefault();
        // Mock subscription for now
        setSubscribed(true);
        setTimeout(() => setSubscribed(false), 3000);
        setEmail('');
    };

    const features = [
        {
            icon: <Users className="w-6 h-6 text-[#c41e3a]" />,
            title: "Manage Athletes",
            description: "Easily track and manage all your FCC registered athletes in one centralized dashboard."
        },
        {
            icon: <ClipboardList className="w-6 h-6 text-[#ffd700]" />,
            title: "Create Training Plans",
            description: "Design and assign custom workout programs tailored for upcoming FCC competitions."
        },
        {
            icon: <Activity className="w-6 h-6 text-[#c41e3a]" />,
            title: "Track Progress",
            description: "Monitor athlete performance metrics, personal records, and readiness for events."
        }
    ];

    return (
        <div className="min-h-screen bg-black text-white flex flex-col items-center justify-center p-4 relative overflow-hidden font-sans">
            {/* Background effects */}
            <div className="absolute inset-0 z-0">
                <div className="absolute top-1/4 right-1/4 w-[500px] h-[500px] bg-[#c41e3a] rounded-full blur-[150px] opacity-15 pointer-events-none" />
                <div className="absolute bottom-1/4 left-1/4 w-[500px] h-[500px] bg-[#ffd700] rounded-full blur-[150px] opacity-10 pointer-events-none" />
                <div className="absolute inset-0 bg-[radial-gradient(circle_at_center,rgba(255,255,255,0.05)_1px,transparent_1px)] bg-[length:24px_24px] pointer-events-none" />
            </div>

            <motion.div
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.6 }}
                className="w-full max-w-4xl relative z-10 text-center"
            >
                <Link to="/" className="inline-block mb-10">
                    <img src="/assets/logo.png" alt="FCC Logo" className="h-16 mx-auto drop-shadow-[0_0_15px_rgba(255,215,0,0.3)]" onError={(e) => e.currentTarget.style.display = 'none'} />
                </Link>

                <div className="inline-flex items-center gap-2 px-4 py-2 bg-[#ffd700]/10 border border-[#ffd700]/30 rounded-full mb-6">
                    <Dumbbell className="w-4 h-4 text-[#ffd700]" />
                    <span className="text-[#ffd700] text-sm font-bold uppercase tracking-wider">Gym Partner Portal</span>
                </div>

                <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-gray-200 to-gray-500">
                    Coming <span className="text-[#c41e3a]">Soon</span>
                </h1>

                <p className="text-xl md:text-2xl text-gray-400 mb-16 max-w-2xl mx-auto leading-relaxed">
                    We are building an exclusive, powerful dashboard for gym owners to dominate the fitness landscape.
                </p>

                {/* Features Grid */}
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    {features.map((feature, index) => (
                        <motion.div
                            key={index}
                            initial={{ opacity: 0, y: 20 }}
                            animate={{ opacity: 1, y: 0 }}
                            transition={{ delay: 0.1 * (index + 1), duration: 0.5 }}
                            className="bg-zinc-900/50 backdrop-blur-sm border border-white/5 p-8 rounded-2xl hover:bg-zinc-900/80 hover:border-white/10 transition-all group"
                        >
                            <div className="bg-black/50 w-14 h-14 rounded-xl flex items-center justify-center mb-6 mx-auto group-hover:scale-110 transition-transform">
                                {feature.icon}
                            </div>
                            <h3 className="text-xl font-bold mb-3 text-white">{feature.title}</h3>
                            <p className="text-gray-400 text-sm leading-relaxed">{feature.description}</p>
                        </motion.div>
                    ))}
                </div>

                {/* Notify Me Form */}
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ delay: 0.6, duration: 0.5 }}
                    className="max-w-md mx-auto"
                >
                    <div className="bg-zinc-900/80 backdrop-blur-md p-2 rounded-xl border border-white/10 flex items-center shadow-2xl">
                        <div className="pl-4 pr-2">
                            <Mail className="w-5 h-5 text-gray-500" />
                        </div>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            placeholder="Enter your email to get early access"
                            className="flex-1 bg-transparent border-none text-white focus:outline-none placeholder-gray-600 py-3"
                        />
                        <button
                            onClick={handleSubscribe}
                            disabled={!email || subscribed}
                            className="bg-[#c41e3a] hover:bg-[#a01830] disabled:bg-gray-700 text-white px-6 py-3 rounded-lg font-bold transition-colors flex items-center gap-2"
                        >
                            {subscribed ? 'Joined!' : 'Notify Me'}
                        </button>
                    </div>
                </motion.div>
            </motion.div>
        </div>
    );
};

export default GymSignup;
