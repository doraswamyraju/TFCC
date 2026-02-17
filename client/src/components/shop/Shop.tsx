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
      className="py-20 md:py-28 bg-gradient-to-b from-[#0a0a0a] via-[#0f0f0f] to-[#1a1a1a] relative overflow-hidden"
    >
      {/* Logo Watermark - Mobile Only (No Glows) */}
      {logo && (
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.08] md:opacity-[0.02] pointer-events-none flex items-center justify-center">
          <img src={logo} alt="Fight Club Championship Logo Watermark" loading="lazy" className="w-[350px] h-[350px] sm:w-[400px] sm:h-[400px] md:w-[500px] md:h-[500px] object-contain" />
        </div>
      )}

      {/* Animated Background Glows - Desktop Only */}
      <motion.div
        animate={{
          scale: [1, 1.2, 1],
          opacity: [0.08, 0.15, 0.08],
        }}
        transition={{
          duration: 8,
          repeat: Infinity,
          ease: "easeInOut"
        }}
        className="hidden md:block absolute top-1/4 left-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[160px] pointer-events-none"
      />
      <motion.div
        animate={{
          scale: [1, 1.3, 1],
          opacity: [0.05, 0.12, 0.05],
        }}
        transition={{
          duration: 10,
          repeat: Infinity,
          ease: "easeInOut",
          delay: 2
        }}
        className="hidden md:block absolute bottom-1/4 right-0 w-96 h-96 bg-[#c41e3a] rounded-full blur-[160px] pointer-events-none"
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
            transition={{ duration: 0.5 }}
            className="inline-flex items-center gap-2 mb-8"
          >
            <span className="bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
              <Sparkles className="w-4 h-4" />
              Coming Soon
              <Sparkles className="w-4 h-4" />
            </span>
          </motion.div>

          {/* Shop Icon */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="flex justify-center mb-8"
          >
            <div className="w-24 h-24 bg-gradient-to-br from-[#c41e3a] to-[#8b1526] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/30">
              <ShoppingBag className="w-12 h-12 text-[#d4af37]" />
            </div>
          </motion.div>

          {/* Title */}
          <motion.h2
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="text-[#d4af37] mb-6"
          >
            Official Merchandise
          </motion.h2>

          {/* Subtitle */}
          <motion.p
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.3 }}
            className="text-xl md:text-2xl text-[#b0b0b0] mb-10 max-w-2xl mx-auto"
          >
            Strength you can wear.{' '}
            <span className="text-[#d4af37] font-semibold">Coming soon.</span>
          </motion.p>

          {/* Banner Card */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.4 }}
            className="max-w-xl mx-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#d4af37]/30 rounded-xl p-8 md:p-10"
          >
            <p className="text-[#808080] text-lg mb-6">
              We're preparing official Strongman Championship merchandise for you.
            </p>
            <div className="flex flex-wrap justify-center gap-4 text-sm text-[#606060]">
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full"></span>
                Apparel
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full"></span>
                Equipment
              </span>
              <span className="flex items-center gap-2">
                <span className="w-2 h-2 bg-[#d4af37] rounded-full"></span>
                Accessories
              </span>
            </div>
          </motion.div>
        </motion.div>
      </div>
    </section>
  );
}
