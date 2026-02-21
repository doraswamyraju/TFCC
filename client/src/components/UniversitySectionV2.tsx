import { motion } from 'motion/react';
import { Building2, Users, Trophy, Dumbbell, Star, Mail, Phone } from 'lucide-react';
import { logo } from '../assets';

export function UniversitySection() {
  return (
    <section id="university" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Background decoration */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-gradient-to-bl from-[#ffd700]/10 to-transparent blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-gradient-to-tr from-[#c41e3a]/10 to-transparent blur-[150px] rounded-full pointer-events-none" />

      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none flex items-center justify-center rotate-12 mix-blend-screen scale-150">
        <img src={logo} alt="" className="w-[800px] h-[800px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, scale: 0.9, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          transition={{ type: "spring", stiffness: 100, damping: 20 }}
          className="text-center mb-24 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#ffd700]/20 blur-3xl rounded-full" />
          <div className="relative inline-flex items-center justify-center p-4 bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl mb-8 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
            <Building2 className="w-12 h-12 text-[#ffd700]" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Universities</span>{' '}
            <span className="text-white/50 font-light">&</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]">Colleges</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto font-medium">
            Host a Fight Club Championship at your campus and become part of India's elite strength sports movement.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-24">
          {[
            { icon: Users, title: 'Student Engagement', desc: 'Boost participation in sports and fitness activities across campus', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]', border: 'hover:border-[#ffd700]/50' },
            { icon: Trophy, title: 'Campus Prestige', desc: "Elevate your institution's reputation in competitive sports", glow: 'shadow-[0_0_30px_rgba(196,30,58,0.15)]', border: 'hover:border-[#c41e3a]/50' },
            { icon: Dumbbell, title: 'Fitness Culture', desc: 'Inspire healthy lifestyle and athletic excellence', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]', border: 'hover:border-[#ffd700]/50' },
            { icon: Star, title: 'Media Exposure', desc: 'Gain visibility through professional coverage and promotion', glow: 'shadow-[0_0_30px_rgba(196,30,58,0.15)]', border: 'hover:border-[#c41e3a]/50' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              className={`group relative bg-zinc-900/40 backdrop-blur-xl border border-white/10 ${benefit.border} p-10 rounded-3xl text-center transition-all duration-500 hover:-translate-y-2 ${benefit.glow} overflow-hidden`}
            >
              <div className="absolute inset-0 bg-gradient-to-br from-white/5 to-transparent opacity-0 group-hover:opacity-100 transition-opacity" />
              <div className="relative z-10">
                <div className="w-20 h-20 mx-auto bg-black/50 rounded-2xl flex items-center justify-center mb-6 border border-white/5 group-hover:scale-110 transition-transform duration-500">
                  <benefit.icon className="w-10 h-10 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
                <h4 className="text-white font-black text-xl mb-3">{benefit.title}</h4>
                <p className="text-base text-gray-400 font-medium leading-relaxed">{benefit.desc}</p>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Host Championship Form CTA */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="relative group rounded-[2.5rem] p-px overflow-hidden shadow-[0_0_50px_rgba(196,30,58,0.2)]"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] via-[#ffd700] to-[#c41e3a] opacity-50 block group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative bg-[#0a0a0a] rounded-[2.5rem] p-10 md:p-20 text-center backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffd700]/5 blur-[100px] rounded-full pointer-events-none" />

            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400 mb-6 drop-shadow-md">
              Host a Championship at Your Campus
            </h3>
            <p className="text-gray-400 font-medium mb-12 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed">
              Interested in bringing the Strongest Women and Men Championship to your university? Get in touch with us to discuss hosting opportunities, logistics, and support.
            </p>

            <div className="flex flex-col sm:flex-row gap-6 justify-center max-w-2xl mx-auto">
              <a
                href="mailto:thefightclubchampionship@gmail.com"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#ff4d6d] hover:to-[#c41e3a] text-white px-8 py-5 rounded-2xl font-black text-xl transition-all shadow-[0_0_30px_rgba(196,30,58,0.4)] hover:shadow-[0_0_50px_rgba(196,30,58,0.6)] hover:-translate-y-1"
              >
                <Mail className="w-6 h-6" />
                Contact Us
              </a>
              <a
                href="tel:+919876543210"
                className="flex-1 inline-flex items-center justify-center gap-3 bg-white/5 hover:bg-white/10 border border-white/20 hover:border-white/40 text-white px-8 py-5 rounded-2xl font-black text-xl transition-all backdrop-blur-md hover:-translate-y-1"
              >
                <Phone className="w-6 h-6" />
                Call Now
              </a>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
