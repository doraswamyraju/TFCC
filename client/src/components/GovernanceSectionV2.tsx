import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Shield, CheckCircle2, ChevronDown } from 'lucide-react';

const benchmarks = [
  {
    num: '1',
    title: 'Transparency Benchmarks (NON-NEGOTIABLE)',
    desc: 'Following rules & formats',
  },
  {
    num: '2',
    title: 'Athlete Welfare & Safety Benchmarks',
    desc: 'Taking reasonable care of the people who came to compete in the event.',
  },
  {
    num: '3',
    title: 'Fair Play & Anti-Bias Benchmarks',
    desc: 'No discrimination based on gender, religion, caste, region',
  },
  {
    num: '4',
    title: 'Grievance Redressal Mechanism',
    desc: 'A grievance email ID — ',
    email: 'thefightclubchampionship@gmail.com',
  },
  {
    num: '5',
    title: 'Conflict of Interest Disclosure',
    desc: 'Organisers cannot compete',
  },
  {
    num: '6',
    title: 'Financial Integrity',
    desc: 'No surprise deductions',
  },
];

export function GovernanceSection() {
  const [isExpanded, setIsExpanded] = useState(false);

  return (
    <section id="governance" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Intense Background Glows */}
      <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c41e3a]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16 relative"
        >
          <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#d4af37]/20 blur-3xl rounded-full" />
          <div className="relative inline-flex p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-2xl shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8">
            <Shield className="w-16 h-16 text-[#d4af37] drop-shadow-[0_0_10px_rgba(212,175,55,0.5)]" />
          </div>

          <h2 className="text-5xl md:text-6xl font-black mb-6 tracking-tight drop-shadow-2xl">
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Governance</span>{' '}
            <span className="text-white/50 font-light">&</span>{' '}
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d]">Standards</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
            We follow governance standards aligned with the principles of the{' '}
            <br />
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#c41e3a] to-[#ff4d6d] font-black text-2xl md:text-3xl drop-shadow-[0_0_10px_rgba(196,30,58,0.5)]">
              National Sports Governance Act, 2025
            </span>.
          </p>
        </motion.div>

        {/* Single Expandable Section */}
        <motion.div
          initial={{ opacity: 0, scale: 0.95, y: 20 }}
          whileInView={{ opacity: 1, scale: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="relative group rounded-[2rem] p-px overflow-hidden shadow-[0_0_40px_rgba(212,175,55,0.15)]"
        >
          {/* Animated Gradient Border */}
          <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] via-[#ffd700] to-[#c41e3a] opacity-50 group-hover:opacity-100 transition-opacity duration-1000" />

          <div className="relative bg-zinc-900/90 backdrop-blur-2xl rounded-[2rem] overflow-hidden">
            {/* Header Button */}
            <button
              onClick={() => setIsExpanded(!isExpanded)}
              className="w-full flex items-center gap-6 p-6 md:p-8 text-left transition-colors hover:bg-white/5 group/btn"
            >
              <div className="w-16 h-16 rounded-2xl bg-[#d4af37]/10 flex items-center justify-center border border-[#d4af37]/30 shrink-0 group-hover/btn:scale-110 transition-transform duration-500 shadow-[0_0_20px_rgba(212,175,55,0.2)]">
                <Shield className="w-8 h-8 text-[#ffd700]" />
              </div>

              <div className="flex-1">
                <h3 className="text-white font-black text-2xl md:text-3xl mb-2 group-hover/btn:text-transparent group-hover/btn:bg-clip-text group-hover/btn:bg-gradient-to-r group-hover/btn:from-[#ffd700] group-hover/btn:to-[#d4af37] transition-all">
                  Governance Benchmarks
                </h3>
                <p className="text-[#d4af37] font-bold text-sm uppercase tracking-widest">
                  {isExpanded ? 'Hide all benchmarks' : 'Click to view all 6 benchmarks'}
                </p>
              </div>

              <motion.div
                animate={{ rotate: isExpanded ? 180 : 0 }}
                transition={{ duration: 0.4, type: "spring", stiffness: 200 }}
                className="shrink-0 p-3 rounded-full bg-white/5 border border-white/10 group-hover/btn:bg-white/10 group-hover/btn:border-white/20 transition-all"
              >
                <ChevronDown className="w-8 h-8 text-[#ffd700]" />
              </motion.div>
            </button>

            {/* Expandable Content - All Benchmarks */}
            <AnimatePresence initial={false}>
              {isExpanded && (
                <motion.div
                  initial={{ height: 0, opacity: 0 }}
                  animate={{ height: 'auto', opacity: 1 }}
                  exit={{ height: 0, opacity: 0 }}
                  transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
                  className="overflow-hidden border-t border-white/10"
                >
                  <div className="p-6 md:p-8 space-y-4">
                    {benchmarks.map((item, i) => (
                      <motion.div
                        key={item.num}
                        initial={{ opacity: 0, x: -20, y: 10 }}
                        animate={{ opacity: 1, x: 0, y: 0 }}
                        transition={{ delay: i * 0.1, duration: 0.4 }}
                        className="flex gap-5 p-5 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 hover:border-white/10 transition-colors group/item"
                      >
                        <div className="shrink-0 w-12 h-12 rounded-xl bg-gradient-to-br from-[#c41e3a] to-[#8b1526] flex items-center justify-center text-white font-black text-xl shadow-[0_0_15px_rgba(196,30,58,0.4)] group-hover/item:scale-110 transition-transform duration-300">
                          {item.num}
                        </div>
                        <div className="flex-1">
                          <h4 className="text-white font-black text-lg mb-2">{item.title}</h4>
                          <p className="text-gray-400 font-medium leading-relaxed">
                            {item.desc}
                            {item.email && (
                              <a
                                href={`mailto:${item.email}`}
                                className="text-[#ffd700] hover:text-white underline decoration-dashed underline-offset-4 ml-1 transition-colors"
                              >
                                {item.email}
                              </a>
                            )}
                          </p>
                        </div>
                        <div className="shrink-0 flex items-start pt-1">
                          <CheckCircle2 className="w-6 h-6 text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                        </div>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
