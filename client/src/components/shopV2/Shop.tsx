import { motion } from 'motion/react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface ShopProps {
  /** Logo URL for watermark background */
  logo?: string;
}

/**
 * Shop Section Component
 * 
 * Simple "Coming Soon" banner for the shop.
 * 
 * TODO: Integrate Firebase for product catalog when shop goes live
 * TODO: Implement shopping cart context
 * TODO: Add checkout flow
 */
export function Shop({ logo }: ShopProps) {
  return (
    <section
      id="shop"
      className="py-24 md:py-32 bg-[#050505] relative overflow-hidden"
    >
      {/* Dynamic Grid Background */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      {/* Logo Watermark - Mobile Only (No Glows) */}
      {logo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.03] pointer-events-none flex items-center justify-center mix-blend-screen scale-125">
          <img src={logo} alt="Fight Club Championship Logo Watermark" loading="lazy" className="w-[400px] h-[400px] md:w-[600px] md:h-[600px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.3)]" />
        </div>
      )}

      {/* Animated Background Glows - Desktop Only */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.15, 0.25, 0.15],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="hidden md:block absolute top-0 left-0 w-[500px] h-[500px] bg-[#ffd700] rounded-full blur-[200px] pointer-events-none mix-blend-screen"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.1, 0.2, 0.1],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="hidden md:block absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#c41e3a] rounded-full blur-[200px] pointer-events-none mix-blend-screen"
      />

      <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Coming Soon Banner */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.6 }}
          className="text-center"
        >
          {/* Coming Soon Badge */}
          <motion.div
            initial={{ opacity: 0, scale: 0.8 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.5, type: 'spring' }}
            className="inline-flex items-center gap-2 mb-10 relative"
          >
            <div className="absolute inset-0 bg-[#c41e3a] blur-xl opacity-40 rounded-full" />
            <span className="relative bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white px-6 py-2.5 rounded-full text-sm font-black uppercase tracking-widest flex items-center gap-3 shadow-[0_0_20px_rgba(196,30,58,0.5)] border border-[#ff4d6d]/30">
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
              Coming Soon
              <Sparkles className="w-4 h-4 text-[#ffd700]" />
            </span>
          </motion.div>

          {/* Shop Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20, scale: 0.9 }}
            whileInView={{ opacity: 1, y: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1, type: 'spring' }}
            className="flex justify-center mb-10 relative"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#ffd700] to-[#c41e3a] blur-2xl opacity-30 rounded-full scale-110" />
            <div className="relative w-28 h-28 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-[2rem] flex items-center justify-center shadow-[0_0_40px_rgba(212,175,55,0.2)]">
              <ShoppingBag className="w-14 h-14 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-5xl md:text-6xl font-black mb-6 tracking-tight"
          >
            <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.3)]">Official</span> Merchandise
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-gray-400 mb-12 max-w-2xl mx-auto font-medium"
          >
            Strength you can wear.{' '}
            <span className="text-white font-black drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Get ready to rep the brand.</span>
          </motion.p>

          {/* Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="relative group rounded-3xl p-px overflow-hidden max-w-xl mx-auto shadow-[0_0_40px_rgba(212,175,55,0.1)] hover:shadow-[0_0_50px_rgba(212,175,55,0.2)] transition-shadow duration-500"
          >
            <div className="absolute inset-0 bg-gradient-to-r from-[#d4af37] via-[#c41e3a] to-[#d4af37] opacity-40 group-hover:opacity-100 transition duration-1000"></div>

            <div className="relative bg-[#0f0f0f]/90 backdrop-blur-xl rounded-3xl p-10 md:p-12">
              <p className="text-gray-300 text-lg mb-8 font-medium">
                We're preparing premium Strongman Championship merchandise just for you. Drop your email to get notified when we launch!
              </p>
              <div className="flex flex-wrap justify-center gap-6 text-sm font-black text-white uppercase tracking-widest">
                <span className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="w-2 h-2 bg-[#ffd700] rounded-full shadow-[0_0_10px_#ffd700]"></span>
                  Apparel
                </span>
                <span className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="w-2 h-2 bg-[#c41e3a] rounded-full shadow-[0_0_10px_#c41e3a]"></span>
                  Equipment
                </span>
                <span className="flex items-center gap-3 bg-white/5 px-4 py-2 rounded-full border border-white/10">
                  <span className="w-2 h-2 bg-[#ffd700] rounded-full shadow-[0_0_10px_#ffd700]"></span>
                  Accessories
                </span>
              </div>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
