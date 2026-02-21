import { motion } from 'motion/react';
import { ChevronRight, Play, Zap, Trophy } from 'lucide-react';
import { logo } from '../assets';

export function HeroV2() {
    return (
        <section className="relative min-h-[100svh] flex flex-col items-center justify-center overflow-hidden bg-[#050505] pt-32 pb-24 md:pt-40">
            {/* Dynamic Background Effects */}
            <div className="absolute inset-0 z-0 pointer-events-none">
                {/* Huge Watermark Logo */}
                <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] scale-150 md:scale-[2] blur-[2px]">
                    <img src={logo} alt="" className="w-full h-full object-cover" />
                </div>

                {/* Animated Glows */}
                <motion.div
                    animate={{ scale: [1, 1.2, 1], opacity: [0.15, 0.25, 0.15] }}
                    transition={{ duration: 8, repeat: Infinity, ease: "easeInOut" }}
                    className="absolute top-[10%] left-[20%] w-[500px] h-[500px] bg-[#c41e3a] rounded-full blur-[150px] mix-blend-screen"
                />
                <motion.div
                    animate={{ scale: [1, 1.3, 1], opacity: [0.1, 0.2, 0.1] }}
                    transition={{ duration: 10, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                    className="absolute bottom-[10%] right-[20%] w-[600px] h-[600px] bg-[#ffd700] rounded-full blur-[150px] mix-blend-screen"
                />

                {/* Grid Overlay */}
                <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-15 mix-blend-overlay" />
            </div>

            <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col items-center text-center">

                {/* Top Badge */}
                <motion.div
                    initial={{ opacity: 0, y: -20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, ease: "easeOut" }}
                    className="group relative inline-flex items-center gap-3 px-6 md:px-8 py-3 rounded-full bg-black/60 border border-[#ffd700]/40 backdrop-blur-xl mb-10 sm:mb-14 shadow-[0_0_30px_rgba(212,175,55,0.2)] hover:border-[#ffd700]/80 transition-colors cursor-default overflow-hidden"
                >
                    <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a]/20 to-[#ffd700]/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                    <Zap className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-[#ffd700]" />
                    <span className="relative z-10 text-white text-[10px] sm:text-xs md:text-sm font-black tracking-[0.2em] uppercase">
                        India's Premier University Strength Championship
                    </span>
                    <Zap className="relative z-10 w-4 h-4 md:w-5 md:h-5 text-[#ffd700]" />
                </motion.div>

                {/* Main Typography */}
                <div className="flex flex-col items-center gap-2 md:gap-4 mb-10 w-full">
                    <motion.h2
                        initial={{ opacity: 0, y: 20 }}
                        animate={{ opacity: 1, y: 0 }}
                        transition={{ duration: 0.8, delay: 0.2 }}
                        className="text-2xl sm:text-3xl md:text-5xl lg:text-5xl font-black text-white tracking-widest uppercase drop-shadow-lg"
                    >
                        Welcome To The
                    </motion.h2>

                    <motion.h1
                        initial={{ opacity: 0, scale: 0.95 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 1, delay: 0.4, type: "spring" }}
                        className="text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[7rem] font-black tracking-tighter leading-[1.1] uppercase w-full flex flex-col items-center"
                    >
                        <span className="relative inline-block px-4 mb-2 md:mb-4">
                            <span className="absolute -inset-4 bg-gradient-to-r from-[#ffd700]/20 via-[#d4af37]/20 to-[#ffd700]/20 blur-3xl rounded-full" />
                            <span className="relative text-transparent bg-clip-text bg-gradient-to-b from-[#ffd700] via-[#ffe55c] to-[#b8941f] drop-shadow-[0_0_25px_rgba(212,175,55,0.8)]">
                                Strongest Women & Men
                            </span>
                        </span>
                        <span className="text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 drop-shadow-[0_0_15px_rgba(255,255,255,0.3)]">
                            Competition
                        </span>
                    </motion.h1>
                </div>

                {/* Subtitles */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.6 }}
                    className="flex flex-col items-center gap-6 mb-14"
                >
                    <p className="text-base sm:text-xl md:text-2xl text-gray-300 font-medium max-w-4xl leading-relaxed">
                        Building Strength, Discipline, & Competitive Spirit In <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]">Indian Campuses</span>
                    </p>
                    <h3 className="text-2xl sm:text-3xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#ff4d6d] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)] uppercase tracking-wide">
                        Will You Rise To The Challenge?
                    </h3>
                </motion.div>

                {/* Feature Pills */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 0.8 }}
                    className="flex flex-col sm:flex-row flex-wrap justify-center gap-4 sm:gap-6 mb-16"
                >
                    <div className="flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#ffd700]/50 hover:border-[#ffd700] rounded-2xl shadow-[0_0_20px_rgba(212,175,55,0.15)] hover:shadow-[0_0_30px_rgba(212,175,55,0.3)] transform hover:-translate-y-1 transition-all duration-300">
                        <Zap className="w-5 h-5 md:w-6 md:h-6 text-[#ffd700]" />
                        <span className="text-white font-black text-sm md:text-xl tracking-widest uppercase">Up to 5 Workouts</span>
                    </div>
                    <div className="flex items-center justify-center gap-3 px-6 py-4 md:px-8 md:py-5 bg-[#0a0a0a]/80 backdrop-blur-md border border-[#c41e3a]/50 hover:border-[#c41e3a] rounded-2xl shadow-[0_0_20px_rgba(196,30,58,0.15)] hover:shadow-[0_0_30px_rgba(196,30,58,0.3)] transform hover:-translate-y-1 transition-all duration-300">
                        <Trophy className="w-5 h-5 md:w-6 md:h-6 text-[#c41e3a]" />
                        <span className="text-white font-black text-sm md:text-xl tracking-widest uppercase">Up to ₹1 Lakh Prize</span>
                    </div>
                </motion.div>

                {/* CTA Buttons */}
                <motion.div
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.8, delay: 1 }}
                    className="flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-6 w-full sm:w-auto px-4 sm:px-0"
                >
                    <a
                        href="#athletes"
                        className="group relative px-6 sm:px-12 py-5 sm:py-6 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#ff4d6d] hover:to-[#c41e3a] text-white font-black tracking-[0.2em] text-lg lg:text-xl rounded-2xl overflow-hidden shadow-[0_0_40px_rgba(196,30,58,0.4)] hover:shadow-[0_0_60px_rgba(196,30,58,0.7)] transform hover:scale-105 active:scale-95 transition-all duration-300 uppercase text-center flex items-center justify-center"
                    >
                        <span className="relative z-10 flex items-center justify-center gap-3 w-full">
                            REGISTER NOW <ChevronRight className="w-6 h-6 group-hover:translate-x-2 transition-transform" />
                        </span>
                    </a>

                    <a
                        href="#strongest-human"
                        className="group relative px-6 sm:px-12 py-5 sm:py-6 bg-[#050505] border-2 border-[#ffd700]/60 hover:border-[#ffd700] text-white font-black tracking-[0.2em] text-lg lg:text-xl rounded-2xl hover:bg-[#ffd700]/10 active:scale-95 transition-all duration-300 flex items-center justify-center gap-4 uppercase shadow-[0_0_20px_rgba(212,175,55,0.1)] hover:shadow-[0_0_40px_rgba(212,175,55,0.3)] text-center"
                    >
                        Explore Events
                        <div className="w-8 h-8 rounded-full bg-[#ffd700]/20 flex items-center justify-center group-hover:bg-[#ffd700] group-hover:text-black transition-colors shrink-0">
                            <Play className="w-4 h-4 fill-current ml-1" />
                        </div>
                    </a>
                </motion.div>

            </div>
        </section>
    );
}
