import { motion } from 'motion/react';
import { Sparkles, Clock, Users, Star } from 'lucide-react';
import { logo } from '../../assets';

export function CoachesSection() {
  return (
    <section id="coaches" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background Glows */}
      <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#c41e3a]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#d4af37]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Grid Texture Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none flex items-center justify-center mix-blend-screen scale-150">
        <img src={logo} alt="" className="w-[800px] h-[800px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-20 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#c41e3a]/20 blur-3xl rounded-full" />

          <div className="inline-flex items-center gap-2 mb-8 relative">
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#c41e3a] blur-lg opacity-40 rounded-full" />
            <span className="relative bg-gradient-to-r from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              Our Community
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
            </span>
          </div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Expert</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">Network</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed">
            Connect with <span className="text-white font-bold drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Elite athletes</span>, world-class coaches, and premium training facilities across India.
          </p>
        </motion.div>

        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group rounded-[2.5rem] p-px overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-shadow duration-500 max-w-4xl mx-auto"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] via-[#ffd700] to-[#c41e3a] opacity-50 block group-hover:opacity-100 transition duration-1000" />

          <div className="relative bg-[#0f0f0f]/90 backdrop-blur-2xl rounded-[2.5rem] py-16 px-8 md:px-16 text-center overflow-hidden">
            {/* Inner Glows */}
            <div className="absolute top-0 right-0 w-[400px] h-[400px] bg-[#ffd700]/5 blur-[100px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[400px] h-[400px] bg-[#c41e3a]/5 blur-[100px] rounded-full pointer-events-none" />

            <div className="relative inline-flex items-center justify-center p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-[2rem] shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8 group-hover:-translate-y-2 transition-transform duration-500">
              <Clock className="w-16 h-16 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>

            <h3 className="text-4xl md:text-5xl font-black text-white mb-6 tracking-tight">Access <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Coming Soon</span></h3>
            <p className="text-gray-400 text-xl md:text-2xl max-w-2xl mx-auto mb-10 font-medium leading-relaxed">
              Our Expert Network comprising <span className="text-white">Athletes, Coaches, and Gyms</span> is currently being curated.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-6 mb-12">
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-white font-black tracking-widest text-sm uppercase shadow-md">
                <Users className="w-4 h-4 text-[#ffd700]" />
                Top Coaches
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-6 py-3 rounded-full text-white font-black tracking-widest text-sm uppercase shadow-md">
                <Star className="w-4 h-4 text-[#c41e3a]" />
                Elite Gyms
              </div>
            </div>

            <p className="text-gray-500 font-medium">
              Want to join when we launch? <a href="#contact" className="text-[#ffd700] hover:text-white font-black underline decoration-dashed underline-offset-4 ml-1 transition-colors">Get in touch</a>.
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
