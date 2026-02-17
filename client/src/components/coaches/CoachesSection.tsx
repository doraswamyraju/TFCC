import { motion } from 'motion/react';
import { Sparkles, Clock } from 'lucide-react';
import { logo } from '../../assets';

export function CoachesSection() {
  return (
    <section id="coaches" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none">
        <img src={logo} alt="" className="w-[600px] h-[600px] object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <div className="inline-flex items-center gap-2 mb-6">
            <span className="bg-[#c41e3a] text-white px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-widest flex items-center gap-2">
              <Sparkles className="w-3 h-3" />
              Our Community
              <Sparkles className="w-3 h-3" />
            </span>
          </div>
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Expert <span className="text-[#d4af37]">Network</span></h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto leading-relaxed">
            Connect with Elite athletes, world-class coaches, and premium training facilities across India.
          </p>
        </motion.div>

        {/* Coming Soon */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="flex flex-col items-center justify-center py-16 px-8 rounded-2xl border-2 border-dashed border-[#2a2a2a] bg-[#0f0f0f]/50"
        >
          <div className="bg-[#d4af37]/10 p-6 rounded-full mb-6">
            <Clock className="w-16 h-16 text-[#d4af37]" />
          </div>
          <h3 className="text-2xl md:text-3xl font-bold text-white mb-4">Coming Soon</h3>
          <p className="text-[#b0b0b0] text-center max-w-xl mb-2">
            Our Expert Network — Athletes, Coaches, and Gyms — will be available here soon.
          </p>
          <p className="text-[#808080] text-sm">
            Want to join when we launch? <a href="#contact" className="text-[#d4af37] hover:underline font-medium">Get in touch</a>.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
