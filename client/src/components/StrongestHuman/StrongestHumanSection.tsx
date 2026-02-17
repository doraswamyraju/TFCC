import { useState } from 'react';
import { motion } from 'motion/react';
import { GraduationCap, CheckCircle2 } from 'lucide-react';
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
    <section id="strongest-human" className="py-20 bg-linear-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
      {/* Background logo - lazy, smaller, no layout thrash */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none w-[600px] h-[600px]">
        <img src={logo} alt="" loading="lazy" decoding="async" width={600} height={600} className="w-full h-full object-contain rotate-12" />
      </div>

      {/* Side Background Asset - Left Side (Aligned with Title) */}
      <div className="absolute top-0 -left-20 md:-left-40 opacity-[0.06] pointer-events-none w-[400px] h-[400px] md:w-[600px] md:h-[600px] lg:w-[800px] lg:h-[800px]">
        <img
          src={strongestManAndWoman}
          alt=""
          loading="lazy"
          decoding="async"
          className="w-full h-full object-contain -rotate-12"
        />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <div className="text-center mb-16">
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
            className="mb-8"
          >
            <img
              src={strongestManAndWoman}
              alt="Strongest Man and Woman"
              className="w-full max-w-[80px] md:max-w-[120px] mx-auto drop-shadow-[0_0_15px_rgba(212,175,55,0.3)] opacity-80"
            />
          </motion.div>
          <h2 className="text-4xl md:text-5xl font-black mb-6 text-white uppercase tracking-tighter">
            Strongest <span className="text-[#d4af37]">Human</span>
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-4xl mx-auto leading-relaxed">
            The ultimate test of raw strength and mental toughness. From elite championships to university competitions, we define what it means to be the strongest.
          </p>
        </div>

        {/* Tab Switcher - Women first */}
        <div className="flex justify-center mb-12">
          <div className="inline-flex p-1 bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-xl">
            <button
              onClick={() => setActiveTab('woman')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'woman'
                ? 'bg-[#c41e3a] text-[#d4af37] shadow-lg shadow-[#c41e3a]/20'
                : 'text-[#d4af37] hover:text-white'
                }`}
            >
              Strongest Woman
            </button>
            <button
              onClick={() => setActiveTab('man')}
              className={`px-8 py-3 rounded-lg font-bold transition-all ${activeTab === 'man'
                ? 'bg-[#d4af37] text-[#c41e3a] shadow-lg shadow-[#d4af37]/20'
                : 'text-[#c41e3a] hover:text-white'
                }`}
            >
              Strongest Man
            </button>
          </div>
        </div>

        {/* Tab Content - simple opacity switch, no exit animation to reduce lag */}
        <motion.div
          key={activeTab}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.2 }}
        >
          <CompetitionTab
            type={activeTab}
            events={activeTab === 'man' ? menEvents : (womenEvents.length > 0 ? womenEvents : menEvents)}
            onSelectEvent={(idx) => onSelectEvent(idx, activeTab)}
          />
        </motion.div>

        {/* Why This Matters Section */}
        <div id="why-it-matters" className="mt-24">
          <div className="bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#c41e3a] rounded-2xl p-8 md:p-12 shadow-2xl">
            <div className="flex flex-col md:flex-row items-center gap-6 mb-10 text-center md:text-left">
              <GraduationCap className="w-16 h-16 text-[#d4af37]" />
              <h3 className="text-3xl font-black text-[#d4af37]">Why College / University-Level Championships Matter?</h3>
            </div>

            <div className="grid md:grid-cols-2 gap-8 text-[#b0b0b0]">
              {[
                { title: 'Student Development', desc: 'Build discipline, resilience, and competitive spirit that extends beyond the gym' },
                { title: 'Campus Culture', desc: 'Create vibrant sports culture and unite students around athletic excellence' },
                { title: 'Talent Pipeline', desc: "Discover and nurture India's next generation of strength athletes" },
                { title: 'National Platform', desc: 'Provide structured pathway from campus to state and national championships' }
              ].map((item, i) => (
                <div key={i} className="flex items-start gap-4">
                  <CheckCircle2 className="w-6 h-6 text-[#c41e3a] shrink-0 mt-1" />
                  <div>
                    <h4 className="text-white font-bold text-lg mb-2 underline decoration-[#c41e3a] decoration-2 underline-offset-2">{item.title}</h4>
                    <p className="text-sm leading-relaxed">{item.desc}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* What We Do Section - plain divs + CSS hover */}
        <div className="mt-24 grid md:grid-cols-2 gap-6">
          {[
            { img: featureImages.strongmanCompetition, title: 'Elite Strongman Events', desc: 'Professional-grade equipment and competition standards for campus championships' },
            { img: featureImages.universityChampionship, title: 'University-Level Excellence', desc: 'Building competitive sports culture on campuses with professional organization' },
            { img: featureImages.strengthTraining, title: 'Power & Performance', desc: "Training the next generation of India's strongest athletes with proper technique" },
            { img: featureImages.championshipTrophy, title: 'Champions & Glory', desc: 'Recognition, prizes, and pathway to state and national championships' }
          ].map((item, i) => (
            <div
              key={i}
              className="relative group overflow-hidden rounded-xl border-2 border-[#2a2a2a] hover:border-[#c41e3a] transition-colors"
            >
              <ImageWithFallback
                src={item.img}
                alt={item.title}
                className="w-full h-80 object-contain group-hover:scale-105 transition-transform duration-300"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/95 via-black/40 to-transparent" />
              <div className="absolute bottom-0 left-0 right-0 p-6">
                <h4 className="text-white font-bold text-xl mb-2">{item.title}</h4>
                <p className="text-[#b0b0b0] text-sm">{item.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
