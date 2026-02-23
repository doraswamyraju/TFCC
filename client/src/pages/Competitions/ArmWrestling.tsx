import { motion } from 'motion/react';
import { Trophy, Users, Zap, Calendar, MapPin, ChevronRight, Award } from 'lucide-react';
import { Navbar } from '../../components/Navbar/Navbar';
import { ContactFooter } from '../../components/ContactFooterV2';
import { logo } from '../../assets';

// Placeholder data - in a real app, this might come from a CMS or API
const competitionDetails = {
    title: "Arm Wrestling Competition",
    description: "The ultimate test of grip strength, technique, and raw power. Join the most intense arm wrestling tournament in the Indian university circuit.",
    date: "Coming Soon",
    location: "Regional Qualifiers",
    prizePool: "Up to ₹50,000",
    categories: ["Lightweight (Under 75kg)", "Middleweight (75kg - 90kg)", "Heavyweight (Above 90kg)"],
    rules: [
        "Matches are best of 3 or best of 5 depending on the round.",
        "Professional referees will strictly enforce technique and safety.",
        "Standard arm wrestling table and regulations apply.",
        "Athletes must maintain grip throughout the match.",
    ]
};

export default function ArmWrestling() {
    return (
        <div className="bg-[#050505] min-h-screen text-white selection:bg-[#c41e3a]/30">
            <Navbar />

            <main>
                {/* Hero Section */}
                <section className="relative pt-32 pb-20 md:pt-48 md:pb-32 overflow-hidden">
                    {/* Background Glows */}
                    <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c41e3a]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
                    <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37]/10 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="grid lg:grid-cols-2 gap-12 items-center">
                            <motion.div
                                initial={{ opacity: 0, x: -30 }}
                                animate={{ opacity: 1, x: 0 }}
                                transition={{ duration: 0.8 }}
                            >
                                <div className="inline-flex items-center gap-2 px-4 py-2 rounded-full bg-[#c41e3a]/10 border border-[#c41e3a]/30 text-[#c41e3a] text-sm font-bold uppercase tracking-widest mb-6">
                                    <Zap className="w-4 h-4" />
                                    Elite Strength Event
                                </div>
                                <h1 className="text-5xl md:text-7xl font-black mb-6 leading-tight tracking-tight">
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">
                                        {competitionDetails.title.split(' ')[0]}
                                    </span>{' '}
                                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#c41e3a] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">
                                        {competitionDetails.title.split(' ').slice(1).join(' ')}
                                    </span>
                                </h1>
                                <p className="text-xl text-gray-400 mb-10 leading-relaxed max-w-xl">
                                    {competitionDetails.description}
                                </p>

                                <div className="flex flex-wrap gap-4 mb-12">
                                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                                        <Calendar className="w-5 h-5 text-[#ffd700]" />
                                        <span className="font-bold">{competitionDetails.date}</span>
                                    </div>
                                    <div className="flex items-center gap-2 px-4 py-3 bg-white/5 border border-white/10 rounded-xl">
                                        <MapPin className="w-5 h-5 text-[#c41e3a]" />
                                        <span className="font-bold">{competitionDetails.location}</span>
                                    </div>
                                </div>

                                <div className="flex flex-col sm:flex-row gap-4">
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white font-black rounded-xl shadow-[0_0_30px_rgba(196,30,58,0.4)] flex items-center justify-center gap-2 uppercase tracking-wider"
                                    >
                                        Register Now <ChevronRight className="w-5 h-5" />
                                    </motion.button>
                                    <motion.button
                                        whileHover={{ scale: 1.05 }}
                                        whileTap={{ scale: 0.95 }}
                                        className="px-8 py-4 bg-white/5 border border-white/10 text-white font-black rounded-xl hover:bg-white/10 transition-colors uppercase tracking-wider"
                                    >
                                        Download Rules
                                    </motion.button>
                                </div>
                            </motion.div>

                            <motion.div
                                initial={{ opacity: 0, scale: 0.9 }}
                                animate={{ opacity: 1, scale: 1 }}
                                transition={{ duration: 1 }}
                                className="relative"
                            >
                                <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/20 to-[#ffd700]/20 blur-3xl opacity-50" />
                                <div className="relative aspect-square rounded-3xl overflow-hidden border border-white/10 bg-zinc-900 shadow-2xl flex items-center justify-center p-12">
                                    <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent opacity-60" />
                                    <img src={logo} alt="Arm Wrestling" className="w-3/4 h-3/4 object-contain opacity-20 filter grayscale invert p-10" />
                                    <div className="relative z-10 text-center">
                                        <Trophy className="w-24 h-24 text-[#ffd700] mx-auto mb-6 drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                                        <h3 className="text-3xl font-black uppercase text-white tracking-widest leading-none mb-2">Championship</h3>
                                        <p className="text-[#ffd700] font-bold text-xl">{competitionDetails.prizePool} Prizes</p>
                                    </div>
                                </div>
                            </motion.div>
                        </div>
                    </div>
                </section>

                {/* Categories Section */}
                <section className="py-24 relative overflow-hidden bg-black/50">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="text-center mb-16">
                            <h2 className="text-4xl md:text-5xl font-black mb-4 uppercase tracking-tight">Weight Categories</h2>
                            <p className="text-gray-400 text-lg">Fair competition across multiple divisions</p>
                        </div>

                        <div className="grid md:grid-cols-3 gap-8">
                            {competitionDetails.categories.map((cat, index) => (
                                <motion.div
                                    key={cat}
                                    initial={{ opacity: 0, y: 20 }}
                                    whileInView={{ opacity: 1, y: 0 }}
                                    viewport={{ once: true }}
                                    transition={{ delay: index * 0.1 }}
                                    className="bg-zinc-900/50 backdrop-blur-xl border border-white/5 p-8 rounded-2xl hover:border-[#ffd700]/50 transition-all group"
                                >
                                    <Users className="w-12 h-12 text-[#ffd700] mb-6 transform group-hover:scale-110 transition-transform" />
                                    <h3 className="text-2xl font-black text-white mb-2">{cat.split(' (')[0]}</h3>
                                    <p className="text-gray-400 font-medium">{cat.match(/\((.*)\)/)?.[1]}</p>
                                </motion.div>
                            ))}
                        </div>
                    </div>
                </section>

                {/* Rules Section */}
                <section className="py-24 relative overflow-hidden">
                    <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
                        <div className="bg-gradient-to-br from-[#1a1a1a] to-[#050505] border border-white/10 rounded-[3rem] p-8 md:p-16 relative overflow-hidden">
                            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#c41e3a]/5 blur-[100px] pointer-events-none" />

                            <div className="grid lg:grid-cols-2 gap-16 items-center">
                                <div>
                                    <h2 className="text-4xl md:text-5xl font-black mb-8 uppercase tracking-tight leading-tight">
                                        Competition <br />
                                        <span className="text-[#ffd700]">Rules & Standards</span>
                                    </h2>
                                    <div className="space-y-6">
                                        {competitionDetails.rules.map((rule, index) => (
                                            <div key={index} className="flex gap-4 items-start">
                                                <div className="w-8 h-8 rounded-full bg-[#c41e3a]/20 flex items-center justify-center shrink-0 mt-1">
                                                    <span className="text-[#c41e3a] font-bold">{index + 1}</span>
                                                </div>
                                                <p className="text-gray-300 text-lg leading-relaxed">{rule}</p>
                                            </div>
                                        ))}
                                    </div>
                                </div>

                                <div className="bg-black/40 border border-white/10 rounded-2xl p-8 backdrop-blur-md">
                                    <Award className="w-16 h-16 text-[#ffd700] mb-6" />
                                    <h3 className="text-2xl font-black text-white mb-4 uppercase">Certification</h3>
                                    <p className="text-gray-400 mb-8 leading-relaxed">
                                        All regional winners receive official FCC certification and an invitation to the National Finals. Professional scouting available during matches.
                                    </p>
                                    <div className="p-6 bg-white/5 rounded-xl border border-dashed border-white/20">
                                        <p className="text-white font-bold italic">
                                            "Strength is not just about muscle; it's about the resolve to never back down."
                                        </p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </section>
            </main>

            <ContactFooter
                logo={logo}
                formData={{ name: '', email: '', phone: '', institution: '', category: 'athlete', message: 'Interested in Arm Wrestling Competition' }}
                formSubmitted={false}
                handleFormSubmit={() => { }}
                handleInputChange={() => { }}
            />
        </div>
    );
}
