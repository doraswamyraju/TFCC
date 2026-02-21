import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, CheckCircle2, Zap } from 'lucide-react';
import { CompetitionTab } from './CompetitionTab';
import { logo, featureImages, strongestManAndWoman } from '../../assets';
import { ImageWithFallback } from '../figma/ImangeWithFallback';
import { menEvents, womenEvents } from '../../content';

interface StrongestHumanSectionProps {
  onSelectEvent: (index: number, type: 'man' | 'woman') => void;
}

export function StrongestHumanSection({ onSelectEvent }: StrongestHumanSectionProps) {
  const [activeTab, setActiveTab] = useState<'man' | 'woman'>('woman');

  return (
    <section id="strongest-human" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Dynamic Pulse Background */}
      <div className="absolute top-1/4 right-0 w-[600px] h-[600px] bg-[#d4af37]/10 blur-[200px] rounded-full mix-blend-screen pointer-events-none" />
      <div className="absolute bottom-1/4 left-0 w-[600px] h-[600px] bg-[#c41e3a]/15 blur-[200px] rounded-full mix-blend-screen pointer-events-none" />

      {/* Grid Overlay */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Background logo */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none flex items-center justify-center">
        <img src={logo} alt="" loading="lazy" width={800} height={800} className="object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.8, y: 20 }}
            whileInView={{ opacity: 1, scale: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.8, type: "spring" }}
            className="mb-6 relative inline-block"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#c41e3a] blur-2xl opacity-40 rounded-full" />
            <img
              src={strongestManAndWoman}
              alt="Strongest Man and Woman"
              className="relative w-full max-w-[100px] md:max-w-[140px] mx-auto drop-shadow-[0_0_20px_rgba(255,215,0,0.5)]"
            />
          </motion.div>
          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 text-white uppercase tracking-tighter drop-shadow-[0_0_15px_rgba(0,0,0,0.8)]">
            Strongest <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]">Human</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto font-medium leading-relaxed drop-shadow-md">
            The ultimate test of raw strength and mental toughness. From elite championships to university competitions, we define what it means to be the strongest.
          </p>
        </div>

        {/* Tab Switcher - Vibrant Glowing Version */}
        <div className="flex justify-center mb-16 relative">
          <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a]/20 via-[#ffd700]/10 to-[#c41e3a]/20 blur-xl rounded-full" />
          <div className="relative inline-flex p-1.5 bg-black/50 backdrop-blur-xl border border-white/10 rounded-2xl shadow-[0_0_30px_rgba(0,0,0,0.5)]">
            <button
              onClick={() => setActiveTab('woman')}
              className={`relative px-8 md:px-12 py-4 rounded-xl font-black text-lg md:text-xl transition-all duration-300 overflow-hidden ${activeTab === 'woman'
                ? 'text-white shadow-[0_0_30px_rgba(196,30,58,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {activeTab === 'woman' && <div className="absolute inset-0 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] z-0" />}
              <span className="relative z-10 flex items-center gap-2">STRONGEST WOMAN {activeTab === 'woman' && <Zap className="w-5 h-5 fill-current" />}</span>
            </button>
            <button
              onClick={() => setActiveTab('man')}
              className={`relative px-8 md:px-12 py-4 rounded-xl font-black text-lg md:text-xl transition-all duration-300 overflow-hidden ${activeTab === 'man'
                ? 'text-white shadow-[0_0_30px_rgba(212,175,55,0.4)]'
                : 'text-gray-400 hover:text-white hover:bg-white/5'
                }`}
            >
              {activeTab === 'man' && <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] to-[#b8860b] z-0" />}
              <span className="relative z-10 flex items-center gap-2">STRONGEST MAN {activeTab === 'man' && <Zap className="w-5 h-5 fill-current text-white" />}</span>
            </button>
          </div>
        </div>

        {/* Tab Content */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.4 }}
          className="relative z-20"
        >
          <CompetitionTab
            type={activeTab}
            events={activeTab === 'man' ? menEvents : (womenEvents.length > 0 ? womenEvents : menEvents)}
            onSelectEvent={(idx) => onSelectEvent(idx, activeTab)}
          />
        </motion.div>

        {/* Why This Matters Section */}
        <div id="why-it-matters" className="mt-32">
          <div className="relative group">
            <div className="absolute -inset-1 bg-gradient-to-r from-[#c41e3a] to-[#ffd700] rounded-3xl blur opacity-30 group-hover:opacity-50 transition duration-1000 group-hover:duration-200"></div>
            <div className="relative bg-zinc-900/90 backdrop-blur-2xl border border-white/10 rounded-3xl p-10 md:p-16 shadow-2xl overflow-hidden">
              <div className="absolute top-0 right-0 w-64 h-64 bg-[#ffd700]/5 blur-[100px] rounded-full pointer-events-none" />

              <div className="flex flex-col md:flex-row items-center gap-8 mb-12 text-center md:text-left relative z-10">
                <div className="p-5 bg-gradient-to-br from-[#d4af37]/20 to-[#c41e3a]/10 rounded-2xl border border-[#d4af37]/30 shadow-[0_0_30px_rgba(212,175,55,0.2)]">
                  <GraduationCap className="w-12 h-12 text-[#ffd700]" />
                </div>
                <h3 className="text-4xl md:text-5xl font-black text-white">Why University Championships <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Matter</span></h3>
              </div>

              <div className="grid md:grid-cols-2 gap-10 text-gray-300 relative z-10">
                {[
                  { title: 'Student Development', desc: 'Build discipline, resilience, and competitive spirit that extends beyond the gym' },
                  { title: 'Campus Culture', desc: 'Create vibrant sports culture and unite students around athletic excellence' },
                  { title: 'Talent Pipeline', desc: "Discover and nurture India's next generation of strength athletes" },
                  { title: 'National Platform', desc: 'Provide structured pathway from campus to state and national championships' }
                ].map((item, i) => (
                  <div key={i} className="flex items-start gap-5 p-6 rounded-2xl bg-white/5 border border-white/5 hover:bg-white/10 transition-colors">
                    <CheckCircle2 className="w-8 h-8 text-[#c41e3a] shrink-0 drop-shadow-[0_0_10px_rgba(196,30,58,0.5)]" />
                    <div>
                      <h4 className="text-white font-black text-xl mb-3">{item.title}</h4>
                      <p className="text-base font-medium leading-relaxed text-gray-400">{item.desc}</p>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>

        {/* What We Do Section */}
        <div className="mt-32 grid md:grid-cols-2 gap-8">
          {[
            { img: featureImages.strongmanCompetition, title: 'Elite Strongman Events', desc: 'Professional-grade equipment and competition standards for campus championships', gradient: 'from-[#c41e3a] to-transparent' },
            { img: featureImages.universityChampionship, title: 'University-Level Excellence', desc: 'Building competitive sports culture on campuses with professional organization', gradient: 'from-[#ffd700] to-transparent' },
            { img: featureImages.strengthTraining, title: 'Power & Performance', desc: "Training the next generation of India's strongest athletes with proper technique", gradient: 'from-[#c41e3a] to-transparent' },
            { img: featureImages.championshipTrophy, title: 'Champions & Glory', desc: 'Recognition, prizes, and pathway to state and national championships', gradient: 'from-[#ffd700] to-transparent' }
          ].map((item, i) => (
            <div
              key={i}
              className="group relative overflow-hidden rounded-3xl border border-white/10 hover:border-white/30 transition-all duration-500 shadow-xl hover:shadow-[0_0_40px_rgba(255,255,255,0.1)]"
            >
              <div className={`absolute inset-0 bg-gradient-to-t ${item.gradient} opacity-20 mix-blend-overlay z-10 group-hover:opacity-40 transition-opacity`} />
              <ImageWithFallback
                src={item.img}
                alt={item.title}
                className="w-full h-96 object-cover object-center group-hover:scale-110 transition-transform duration-700 ease-in-out"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/100 via-black/50 to-transparent z-20" />

              <div className="absolute bottom-0 left-0 right-0 p-8 z-30 transform translate-y-4 group-hover:translate-y-0 transition-transform duration-500">
                <h4 className="text-white font-black text-3xl mb-3 drop-shadow-lg">{item.title}</h4>
                <p className="text-gray-300 text-lg font-medium opacity-0 group-hover:opacity-100 transition-opacity duration-500 delay-100">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
