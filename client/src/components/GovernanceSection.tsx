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
    <section id="governance" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <Shield className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-[#d4af37]">Governance</span>{' '}
            <span className="text-white">&</span>{' '}
            <span className="text-[#d4af37]">Standards</span>
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto leading-relaxed">
            We follow governance standards aligned with the principles of the{' '}
            <br />
            <span className="text-[#c41e3a] font-semibold text-xl md:text-2xl">National Sports Governance Act, 2025</span>.
          </p>
        </motion.div>

        {/* Single Expandable Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-50px' }}
          className="rounded-xl bg-[#0f0f0f] border-2 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all overflow-hidden"
        >
          {/* Header Button */}
          <button
            onClick={() => setIsExpanded(!isExpanded)}
            className="w-full flex items-center gap-6 p-6 text-left transition-colors hover:bg-[#1a1a1a]/50"
          >
            <Shield className="w-12 h-12 text-[#d4af37] shrink-0" />
            <div className="flex-1">
              <h3 className="text-[#d4af37] font-bold text-xl mb-1">Governance Benchmarks</h3>
              <p className="text-[#808080] text-sm">Click to view all 6 benchmarks</p>
            </div>
            <motion.div
              animate={{ rotate: isExpanded ? 180 : 0 }}
              transition={{ duration: 0.3 }}
              className="shrink-0"
            >
              <ChevronDown className="w-8 h-8 text-[#d4af37]" />
            </motion.div>
          </button>

          {/* Expandable Content - All Benchmarks */}
          <AnimatePresence initial={false}>
            {isExpanded && (
              <motion.div
                initial={{ height: 0, opacity: 0 }}
                animate={{ height: 'auto', opacity: 1 }}
                exit={{ height: 0, opacity: 0 }}
                transition={{ duration: 0.4, ease: 'easeInOut' }}
                className="overflow-hidden border-t-2 border-[#2a2a2a]"
              >
                <div className="p-6 space-y-6">
                  {benchmarks.map((item, i) => (
                    <motion.div
                      key={item.num}
                      initial={{ opacity: 0, x: -20 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: i * 0.1 }}
                      className="flex gap-4 sm:gap-6"
                    >
                      <div className="shrink-0 w-10 h-10 rounded-full bg-[#d4af37]/20 flex items-center justify-center text-[#d4af37] font-black text-base">
                        {item.num}
                      </div>
                      <div className="flex-1">
                        <h4 className="text-white font-bold text-base mb-2">{item.title}</h4>
                        <p className="text-[#b0b0b0] text-sm leading-relaxed">
                          {item.desc}
                          {item.email && (
                            <a
                              href={`mailto:${item.email}`}
                              className="text-[#d4af37] hover:underline ml-1"
                            >
                              {item.email}
                            </a>
                          )}
                        </p>
                      </div>
                      <CheckCircle2 className="w-5 h-5 text-[#c41e3a] shrink-0 mt-1" />
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#c41e3a]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2" />
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#d4af37]/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2" />
    </section>
  );
}
