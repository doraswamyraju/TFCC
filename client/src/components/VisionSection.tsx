import { useRef } from 'react';
import { motion, useScroll, useSpring, useTransform } from 'motion/react';
import { TrendingUp, Trophy, Target, Sparkles, Shield } from 'lucide-react';

export function VisionSection() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start center", "end center"]
  });

  const springProgress = useSpring(scrollYProgress, {
    stiffness: 100,
    damping: 30,
    restDelta: 0.001
  });

  const dotTop = useTransform(springProgress, [0, 1], ["0%", "calc(100% - 12px)"]);
  const dotTopDesktop = useTransform(springProgress, [0, 1], ["0%", "calc(100% - 16px)"]);
  const dotOpacity = useTransform(scrollYProgress, [0, 0.05], [0, 1]);

  return (
    <section id="vision" className="py-24 bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="text-center mb-20"
        >
          <TrendingUp className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-[#d4af37]">Our Vision</span>{' '}
            <span className="text-white">&</span>{' '}
            <span className="text-[#d4af37]">Roadmap</span>
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
            Our journey to build India's most comprehensive strength sports ecosystem, rooted in excellence and discipline.
          </p>
        </motion.div>

        {/* Mission, Goals, Philosophy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-24">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide a professional platform for Indian university students to showcase their strength and athletic prowess.' },
            { icon: Sparkles, title: 'Long-term Goals', desc: 'Establishing India as a global powerhouse in strength sports and creating a sustainable career path for athletes.' },
            { icon: Shield, title: 'Our Philosophy', desc: 'Strength is not just about muscle; it is about character, resilience, and the relentless pursuit of excellence.' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: i * 0.1 }}
              className="bg-[#1a1a1a] border-2 border-[#2a2a2a] p-8 rounded-2xl hover:border-[#d4af37] transition-all"
            >
              <item.icon className="w-12 h-12 text-[#c41e3a] mb-6" />
              <h3 className="text-2xl font-bold text-white mb-4">{item.title}</h3>
              <p className="text-[#b0b0b0] leading-relaxed">{item.desc}</p>
            </motion.div>
          ))}
        </div>

        <div ref={containerRef} className="relative">
          {/* Roadmap Timeline (Mobile) */}
          <div className="md:hidden relative">
            {/* Timeline track - line + dot (z-10) */}
            <div className="absolute left-0 top-0 bottom-0 z-10 pointer-events-none">
              {/* Background line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/10 -translate-x-1/2" />
              {/* Animated progress line */}
              <motion.div
                style={{ scaleY: springProgress, originY: 0 }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] -translate-x-1/2"
              />
              {/* Lead dot - moves along the line */}
              <motion.div
                style={{
                  top: dotTop,
                  opacity: dotOpacity
                }}
                className="absolute left-0 top-0 -translate-x-1/2 w-3 h-3 rounded-full bg-[#d4af37] shadow-[0_0_15px_#d4af37]"
              />
            </div>

            {/* Content layer - milestone cards (z-20) */}
            <div className="relative z-20 space-y-12">

            {[
              { phase: '01', title: 'University Championships', status: 'CURRENT', desc: 'Establishing championships at individual universities across India.', titleColor: '#d4af37' },
              { phase: '02', title: 'Inter-University Meets', status: 'PLANNED', desc: 'Regional championships bringing together top athletes.', titleColor: '#c41e3a' },
              { phase: '03', title: 'State-Level Championships', status: 'VISION', desc: 'Crowning the strongest athletes from each state.', titleColor: '#d4af37' },
              { phase: '04', title: 'National Platform', status: 'LONG-TERM', desc: 'National championships and international representation.', titleColor: '#c41e3a' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: -20 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className="relative pl-12 group z-10"
              >
                <motion.div
                  initial={{ borderColor: 'rgb(42, 42, 42)', backgroundColor: 'rgb(26, 26, 26)', color: 'rgba(255,255,255,0.3)' }}
                  whileInView={{
                    borderColor: '#d4af37',
                    backgroundColor: 'rgb(26, 26, 26)',
                    boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
                    color: 'rgba(255,255,255,1)'
                  }}
                  viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                  className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm font-black transition-all duration-300 bg-[#1a1a1a] z-30"
                >
                  {item.phase}
                </motion.div>
                <motion.div 
                  initial={{ opacity: 0.4, y: 10 }}
                  whileInView={{ opacity: 1, y: 0, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                  className="bg-[#1a1a1a] p-6 rounded-xl border border-white/5 shadow-xl transition-all duration-500"
                >
                  <div className="flex items-center gap-2 mb-2">
                    <span className="text-[10px] font-bold px-2 py-0.5 rounded bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/20">{item.status}</span>
                    <h4 className="font-bold" style={{ color: item.titleColor }}>{item.title}</h4>
                  </div>
                  <p className="text-sm text-[#808080]">{item.desc}</p>
                </motion.div>
              </motion.div>
            ))}
            </div>
          </div>

          {/* Roadmap Timeline (Desktop) */}
          <div className="hidden md:block relative pt-20">
            {/* Timeline track - line + dot (z-10) */}
            <div className="absolute left-1/2 top-0 bottom-0 z-10 pointer-events-none">
              {/* Background line */}
              <div className="absolute left-0 top-0 bottom-0 w-1 bg-white/5 -translate-x-1/2" />
              {/* Animated progress line */}
              <motion.div
                style={{ scaleY: springProgress, originY: 0 }}
                className="absolute left-0 top-0 bottom-0 w-1 bg-[#d4af37] -translate-x-1/2"
              />
              {/* Lead dot - moves along the line */}
              <motion.div
                style={{
                  top: dotTopDesktop,
                  opacity: dotOpacity
                }}
                className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#d4af37] shadow-[0_0_20px_#d4af37]"
              />
            </div>

            {/* Content layer - milestone cards (z-20) */}
            <div className="relative z-20">

            {[
              { phase: '01', title: 'University Championships', status: 'CURRENT', desc: 'Establishing championships at individual universities across India. Building campus-level strength sports culture.', side: 'left', titleColor: '#d4af37' },
              { phase: '02', title: 'Inter-University Meets', status: 'PLANNED', desc: 'Regional championships bringing together top athletes from multiple universities. Raising competitive standards.', side: 'right', titleColor: '#c41e3a' },
              { phase: '03', title: 'State-Level Championships', status: 'VISION', desc: 'State championships crowning the strongest athletes from each region. Building pathway to professional sports.', side: 'left', titleColor: '#d4af37' },
              { phase: '04', title: 'National Platform', status: 'LONG-TERM', desc: 'National Championships and international representation. Establishing India as a powerhouse in strength sports.', side: 'right', titleColor: '#c41e3a' }
            ].map((item, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, x: item.side === 'left' ? -50 : 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: false }}
                className={`relative z-10 mb-32 flex ${item.side === 'left' ? 'justify-start' : 'justify-end'}`}
              >
              <div className={`w-[45%] ${item.side === 'left' ? 'text-right pr-16' : 'text-left pl-16'}`}>
                <motion.div 
                  initial={{ opacity: 0.4, scale: 0.95, x: item.side === 'left' ? 20 : -20 }}
                  whileInView={{ opacity: 1, scale: 1, x: 0, borderColor: 'rgba(212, 175, 55, 0.3)' }}
                  viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                  className="bg-[#1a1a1a] border-2 border-[#2a2a2a] p-8 rounded-2xl transition-all duration-500 inline-block max-w-lg shadow-2xl relative overflow-hidden group"
                >
                  <div className={`flex items-center gap-3 mb-4 ${item.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                    {item.side === 'right' && <div className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">{item.status}</div>}
                    <h3 className="text-xl font-black" style={{ color: item.titleColor }}>{item.title}</h3>
                    {item.side === 'left' && <div className="bg-[#d4af37]/10 text-[#d4af37] border border-[#d4af37]/30 px-3 py-1 rounded-full text-[10px] font-black tracking-widest uppercase">{item.status}</div>}
                  </div>
                  <p className="text-[#b0b0b0] text-sm leading-relaxed font-medium">{item.desc}</p>
                  
                  {/* Decorative corner accent */}
                  <div className={`absolute top-0 ${item.side === 'left' ? 'right-0' : 'left-0'} w-16 h-16 bg-linear-to-br from-[#d4af37]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500`} />
                </motion.div>
              </div>

              {/* Glowing Square Milestone - above line */}
              <motion.div
                initial={{
                  borderColor: 'rgb(42, 42, 42)',
                  backgroundColor: 'rgb(26, 26, 26)',
                  color: 'rgba(255,255,255,0.2)',
                  scale: 0.9
                }}
                whileInView={{
                  borderColor: '#d4af37',
                  backgroundColor: 'rgb(26, 26, 26)',
                  color: 'rgba(255,255,255,1)',
                  scale: 1.1,
                  boxShadow: '0 0 35px rgba(212, 175, 55, 0.5)'
                }}
                viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                className="absolute left-1/2 top-10 -translate-x-1/2 w-14 h-14 rounded-2xl bg-[#1a1a1a] border-2 z-30 flex items-center justify-center transition-all duration-300 text-lg font-black"
              >
                {item.phase}
              </motion.div>
              </motion.div>
            ))}
            </div>
          </div>
        </div>

        {/* Future Expansion Note */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-24 text-center bg-linear-to-r from-[#c41e3a]/10 to-[#d4af37]/10 border-2 border-[#d4af37] rounded-3xl p-10 md:p-16 shadow-2xl"
        >
          <Trophy className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h3 className="text-3xl font-black text-[#d4af37] mb-6">Beyond Strongest Women and Men</h3>
          <p className="text-[#b0b0b0] max-w-3xl mx-auto text-lg leading-relaxed mb-8">
            Our vision extends beyond strength sports, creating a comprehensive athletic ecosystem in India 🇮🇳!
          </p>
          <div className="bg-black/40 border border-[#d4af37]/20 rounded-2xl p-8 max-w-2xl mx-auto backdrop-blur-sm">
            <p className="text-white font-bold text-xl md:text-2xl leading-relaxed">
              We plan to introduce – <span className="text-[#d4af37]">Wrestling</span>, <span className="text-[#e8a317]">Arm wrestling</span>, and combat sports especially – <span className="text-[#c41e3a]">MMA (Mixed Martial Arts)</span>
            </p>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
