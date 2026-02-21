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
    <section id="vision" className="py-32 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Vibrant Ambient Glows */}
      <div className="absolute top-1/4 left-1/4 w-[600px] h-[600px] bg-[#d4af37]/10 blur-[200px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 right-1/4 w-[600px] h-[600px] bg-[#c41e3a]/15 blur-[200px] rounded-full mix-blend-screen pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-24 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-40 h-40 bg-[#d4af37]/20 blur-3xl rounded-full" />
          <div className="relative inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8">
            <TrendingUp className="w-16 h-16 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
          </div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Our Vision</span>{' '}
            <span className="text-white/50 font-light">&</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]">Roadmap</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-400 max-w-4xl mx-auto font-medium leading-relaxed">
            Our journey to build India's most comprehensive strength sports ecosystem, rooted in excellence and discipline.
          </p>
        </motion.div>

        {/* Mission, Goals, Philosophy Grid */}
        <div className="grid md:grid-cols-3 gap-8 mb-32">
          {[
            { icon: Target, title: 'Our Mission', desc: 'To provide a professional platform for Indian university students to showcase their strength and athletic prowess.', accent: 'from-[#ffd700]', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]' },
            { icon: Sparkles, title: 'Long-term Goals', desc: 'Establishing India as a global powerhouse in strength sports and creating a sustainable career path for athletes.', accent: 'from-[#c41e3a]', glow: 'shadow-[0_0_30px_rgba(196,30,58,0.15)]' },
            { icon: Shield, title: 'Our Philosophy', desc: 'Strength is not just about muscle; it is about character, resilience, and the relentless pursuit of excellence.', accent: 'from-[#ffd700]', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]' }
          ].map((item, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              transition={{ delay: i * 0.15, type: 'spring' }}
              className={`group relative overflow-hidden rounded-[2rem] p-8 md:p-10 border border-white/5 hover:border-white/20 transition-all duration-500 hover:-translate-y-2 ${item.glow} bg-zinc-900/40 backdrop-blur-xl`}
            >
              <div className={`absolute top-0 right-0 w-32 h-32 bg-gradient-to-bl ${item.accent} to-transparent opacity-20 blur-2xl group-hover:opacity-40 transition-opacity duration-500`} />

              <div className="relative z-10">
                <div className="w-16 h-16 rounded-2xl bg-black/50 flex items-center justify-center border border-white/10 mb-8 group-hover:scale-110 transition-transform duration-500">
                  <item.icon className="w-8 h-8 text-white drop-shadow-[0_0_10px_rgba(255,255,255,0.5)]" />
                </div>
                <h3 className="text-3xl font-black text-white mb-4">{item.title}</h3>
                <p className="text-gray-400 font-medium leading-relaxed">{item.desc}</p>
              </div>
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
                className="absolute left-0 top-0 bottom-0 w-1 bg-gradient-to-b from-[#ffd700] to-[#c41e3a] shadow-[0_0_20px_rgba(212,175,55,0.5)] -translate-x-1/2"
              />
              {/* Lead dot - moves along the line */}
              <motion.div
                style={{
                  top: dotTop,
                  opacity: dotOpacity
                }}
                className="absolute left-0 top-0 -translate-x-1/2 w-4 h-4 rounded-full bg-[#ffd700] shadow-[0_0_20px_#ffd700] ring-4 ring-black"
              />
            </div>

            {/* Content layer - milestone cards (z-20) */}
            <div className="relative z-20 space-y-12">

              {[
                { phase: '01', title: 'University Championships', status: 'CURRENT', desc: 'Establishing championships at individual universities across India.', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]', borderColor: 'border-[#ffd700]/30', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]' },
                { phase: '02', title: 'Inter-University Meets', status: 'PLANNED', desc: 'Regional championships bringing together top athletes.', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]', borderColor: 'border-[#c41e3a]/30', glow: 'shadow-[0_0_30px_rgba(196,30,58,0.15)]' },
                { phase: '03', title: 'State-Level Championships', status: 'VISION', desc: 'Crowning the strongest athletes from each state.', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]', borderColor: 'border-[#ffd700]/30', glow: 'shadow-[0_0_30px_rgba(212,175,55,0.15)]' },
                { phase: '04', title: 'National Platform', status: 'LONG-TERM', desc: 'National championships and international representation.', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]', borderColor: 'border-[#c41e3a]/30', glow: 'shadow-[0_0_30px_rgba(196,30,58,0.15)]' }
              ].map((item, i) => (
                <motion.div
                  key={i}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: false }}
                  className="relative pl-12 group z-10"
                >
                  <motion.div
                    initial={{ borderColor: 'rgba(255,255,255,0.1)', backgroundColor: 'rgb(10, 10, 10)', color: 'rgba(255,255,255,0.3)' }}
                    whileInView={{
                      borderColor: 'rgba(212,175,55,0.5)',
                      backgroundColor: 'rgb(26, 26, 26)',
                      boxShadow: '0 0 25px rgba(212, 175, 55, 0.4)',
                      color: 'rgba(255,255,255,1)'
                    }}
                    viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                    className="absolute left-0 top-0 -translate-x-1/2 w-10 h-10 rounded-xl border-2 flex items-center justify-center text-sm font-black transition-all duration-300 bg-[#1a1a1a] z-30 ring-4 ring-black"
                  >
                    {item.phase}
                  </motion.div>
                  <motion.div
                    initial={{ opacity: 0.4, y: 10 }}
                    whileInView={{ opacity: 1, y: 0, borderColor: 'rgba(255,255,255,0.2)' }}
                    viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                    className={`bg-zinc-900/60 p-6 rounded-2xl border ${item.borderColor} backdrop-blur-md transition-all duration-500 ${item.glow}`}
                  >
                    <div className="flex flex-col gap-2 mb-3">
                      <span className="self-start text-[10px] font-black tracking-widest px-3 py-1 rounded-full bg-white/5 border border-white/10 text-white uppercase">{item.status}</span>
                      <h4 className={`font-black text-xl ${item.titleColor} drop-shadow-md`}>{item.title}</h4>
                    </div>
                    <p className="text-sm font-medium text-gray-400">{item.desc}</p>
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
              <div className="absolute left-0 top-0 bottom-0 w-1.5 bg-white/5 -translate-x-1/2 rounded-full" />
              {/* Animated progress line */}
              <motion.div
                style={{ scaleY: springProgress, originY: 0 }}
                className="absolute left-0 top-0 bottom-0 w-1.5 bg-gradient-to-b from-[#ffd700] via-[#c41e3a] to-[#ffd700] shadow-[0_0_20px_rgba(212,175,55,0.5)] -translate-x-1/2 rounded-full"
              />
              {/* Lead dot - moves along the line */}
              <motion.div
                style={{
                  top: dotTopDesktop,
                  opacity: dotOpacity
                }}
                className="absolute left-0 top-0 -translate-x-1/2 w-5 h-5 rounded-full bg-[#ffd700] shadow-[0_0_25px_#ffd700] ring-4 ring-[#050505]"
              />
            </div>

            {/* Content layer - milestone cards (z-20) */}
            <div className="relative z-20">

              {[
                { phase: '01', title: 'University Championships', status: 'CURRENT', desc: 'Establishing championships at individual universities across India. Building campus-level strength sports culture.', side: 'left', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]', borderColor: 'border-[#ffd700]/30', glow: 'group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]' },
                { phase: '02', title: 'Inter-University Meets', status: 'PLANNED', desc: 'Regional championships bringing together top athletes from multiple universities. Raising competitive standards.', side: 'right', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]', borderColor: 'border-[#c41e3a]/30', glow: 'group-hover:shadow-[0_0_40px_rgba(196,30,58,0.15)]' },
                { phase: '03', title: 'State-Level Championships', status: 'VISION', desc: 'State championships crowning the strongest athletes from each region. Building pathway to professional sports.', side: 'left', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]', borderColor: 'border-[#ffd700]/30', glow: 'group-hover:shadow-[0_0_40px_rgba(212,175,55,0.15)]' },
                { phase: '04', title: 'National Platform', status: 'LONG-TERM', desc: 'National Championships and international representation. Establishing India as a powerhouse in strength sports.', side: 'right', titleColor: 'text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]', borderColor: 'border-[#c41e3a]/30', glow: 'group-hover:shadow-[0_0_40px_rgba(196,30,58,0.15)]' }
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
                      whileInView={{ opacity: 1, scale: 1, x: 0, borderColor: 'rgba(255, 255, 255, 0.2)' }}
                      viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                      className={`bg-zinc-900/60 backdrop-blur-xl border border-white/5 ${item.glow} p-10 rounded-3xl transition-all duration-700 inline-block max-w-[500px] shadow-2xl relative overflow-hidden group hover:border-white/20`}
                    >
                      <div className={`flex items-center gap-4 mb-6 ${item.side === 'left' ? 'justify-end' : 'justify-start'}`}>
                        {item.side === 'right' && <div className="bg-white/5 text-white border border-white/10 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md">{item.status}</div>}
                        <h3 className={`text-3xl font-black ${item.titleColor} drop-shadow-md`}>{item.title}</h3>
                        {item.side === 'left' && <div className="bg-white/5 text-white border border-white/10 px-4 py-1.5 rounded-full text-xs font-black tracking-widest uppercase shadow-md">{item.status}</div>}
                      </div>
                      <p className="text-gray-400 text-lg leading-relaxed font-medium">{item.desc}</p>

                      {/* Decorative corner accent */}
                      <div className={`absolute top-0 ${item.side === 'left' ? 'right-0' : 'left-0'} w-32 h-32 bg-gradient-to-bl from-white/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700 rounded-full blur-xl`} />
                    </motion.div>
                  </div>

                  {/* Glowing Square Milestone - above line */}
                  <motion.div
                    initial={{
                      borderColor: 'rgba(255,255,255,0.1)',
                      backgroundColor: 'rgb(10, 10, 10)',
                      color: 'rgba(255,255,255,0.2)',
                      scale: 0.9
                    }}
                    whileInView={{
                      borderColor: 'rgba(212,175,55,0.6)',
                      backgroundColor: 'rgb(26, 26, 26)',
                      color: 'rgba(255,255,255,1)',
                      scale: 1.1,
                      boxShadow: '0 0 40px rgba(212, 175, 55, 0.4)'
                    }}
                    viewport={{ once: false, margin: "100% 0px -50% 0px" }}
                    className="absolute left-1/2 top-10 -translate-x-1/2 w-16 h-16 rounded-2xl bg-[#0a0a0a] border-2 z-30 flex items-center justify-center transition-all duration-500 text-xl font-black ring-8 ring-[#050505]"
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
          initial={{ opacity: 0, scale: 0.95, y: 30 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true }}
          className="mt-32 relative group rounded-[3rem] p-px overflow-hidden shadow-[0_0_50px_rgba(212,175,55,0.1)] hover:shadow-[0_0_60px_rgba(212,175,55,0.2)] transition-shadow duration-500"
        >
          <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#c41e3a] to-[#d4af37] opacity-60 group-hover:opacity-100 transition duration-1000"></div>

          <div className="relative bg-[#0a0a0a] rounded-[3rem] p-12 md:p-20 text-center backdrop-blur-3xl">
            <div className="absolute top-0 right-0 w-[500px] h-[500px] bg-[#ffd700]/10 blur-[150px] rounded-full pointer-events-none" />
            <div className="absolute bottom-0 left-0 w-[500px] h-[500px] bg-[#c41e3a]/10 blur-[150px] rounded-full pointer-events-none" />

            <div className="relative inline-flex items-center justify-center p-6 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-[2rem] shadow-[0_0_40px_rgba(212,175,55,0.3)] mb-10 group-hover:scale-110 transition-transform duration-500">
              <Trophy className="w-16 h-16 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>

            <h3 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-8 drop-shadow-md">
              Beyond Strongest Women and Men
            </h3>
            <p className="text-gray-400 max-w-3xl mx-auto text-xl md:text-2xl leading-relaxed mb-12 font-medium">
              Our vision extends beyond strength sports, creating a comprehensive athletic ecosystem in India 🇮🇳!
            </p>
            <div className="bg-white/5 border border-white/10 rounded-3xl p-8 md:p-10 max-w-3xl mx-auto backdrop-blur-xl shadow-xl hover:bg-white/10 transition-colors duration-500">
              <p className="text-white font-black text-2xl md:text-3xl leading-relaxed drop-shadow-md">
                We plan to introduce <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#b8860b]">Wrestling</span>, <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#e8a317] to-[#d4af37]">Arm Wrestling</span>, and <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]">MMA (Mixed Martial Arts)</span>
              </p>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
