import { motion } from 'motion/react';
import { Building2, Users, Trophy, Dumbbell, Star, Mail, Phone } from 'lucide-react';
import { logo } from '../assets';

export function UniversitySection() {
  return (
    <section id="university" className="py-24 bg-linear-to-b from-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Background decoration */}
      <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.05] pointer-events-none flex items-center justify-center rotate-12">
        <img src={logo} alt="" className="w-[700px] h-[700px] object-contain" />
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Building2 className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black mb-6">
            <span className="text-[#d4af37]">Universities</span>{' '}
            <span className="text-white">&</span>{' '}
            <span className="text-[#d4af37]">Colleges</span>
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
            Host a Fight Club Championship at your campus and become part of India's elite strength sports movement.
          </p>
        </motion.div>

        {/* Benefits Grid */}
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-6 mb-16">
          {[
            { icon: Users, title: 'Student Engagement', desc: 'Boost participation in sports and fitness activities across campus' },
            { icon: Trophy, title: 'Campus Prestige', desc: "Elevate your institution's reputation in competitive sports" },
            { icon: Dumbbell, title: 'Fitness Culture', desc: 'Inspire healthy lifestyle and athletic excellence' },
            { icon: Star, title: 'Media Exposure', desc: 'Gain visibility through professional coverage and promotion' }
          ].map((benefit, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: i * 0.1 }}
              className="bg-linear-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-8 rounded-2xl text-center transition-all group after:content-['']"
            >
              <benefit.icon className="w-12 h-12 text-[#c41e3a] mx-auto mb-4 group-hover:scale-110 transition-transform" />
              <h4 className="text-white font-bold text-lg mb-2">{benefit.title}</h4>
              <p className="text-sm text-[#b0b0b0]">{benefit.desc}</p>
            </motion.div>
          ))}
        </div>

        {/* Host Championship Form CTA */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="bg-linear-to-br from-[#c41e3a]/10 to-[#d4af37]/10 border-2 border-[#d4af37] rounded-3xl p-8 md:p-16 text-center shadow-2xl"
        >
          <h3 className="text-3xl font-black text-[#d4af37] mb-6">Host a Championship at Your Campus</h3>
          <p className="text-[#b0b0b0] mb-10 max-w-2xl mx-auto text-lg leading-relaxed">
            Interested in bringing the Strongest Women and Men Championship to your university? Get in touch with us to discuss hosting opportunities, logistics, and support.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <a
              href="mailto:thefightclubchampionship@gmail.com"
              className="inline-flex items-center justify-center gap-2 bg-linear-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all shadow-lg shadow-[#c41e3a]/30"
            >
              <Mail className="w-5 h-5" />
              Contact Us
            </a>
            <a
              href="tel:+919876543210"
              className="inline-flex items-center justify-center gap-2 bg-[#1a1a1a] hover:bg-[#2a2a2a] border-2 border-[#d4af37] text-white px-10 py-4 rounded-xl font-bold text-lg transition-all"
            >
              <Phone className="w-5 h-5" />
              Call Now
            </a>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
