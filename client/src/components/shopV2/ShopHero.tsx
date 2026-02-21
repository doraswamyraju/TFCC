import { motion } from 'motion/react';
import { ShoppingBag, Sparkles } from 'lucide-react';

interface ShopHeroProps {
  isComingSoon?: boolean;
}

/**
 * ShopHero Component
 * Hero section for the shop page with title, subtitle, and CTA.
 * 
 * Displays "Coming Soon" state when shop is not yet live.
 * Clean, premium design with strong visual hierarchy.
 */
export function ShopHero({ isComingSoon = true }: ShopHeroProps) {
  return (
    <div className="text-center mb-16 md:mb-20">
      {/* Coming Soon Badge */}
      {isComingSoon && (
        <motion.div
          initial={{ opacity: 0, scale: 0.8 }}
          whileInView={{ opacity: 1, scale: 1 }}
          viewport={{ once: true }}
          transition={{ duration: 0.5 }}
          className="inline-flex items-center gap-2 mb-6"
        >
          <span className="bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white px-5 py-2 rounded-full text-sm font-bold uppercase tracking-wider flex items-center gap-2">
            <Sparkles className="w-4 h-4" />
            Coming Soon
            <Sparkles className="w-4 h-4" />
          </span>
        </motion.div>
      )}

      {/* Shop Icon */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.1 }}
        className="flex justify-center mb-6"
      >
        <div className="w-20 h-20 bg-gradient-to-br from-[#c41e3a] to-[#8b1526] rounded-2xl flex items-center justify-center shadow-lg shadow-[#c41e3a]/30">
          <ShoppingBag className="w-10 h-10 text-[#d4af37]" />
        </div>
      </motion.div>

      {/* Title */}
      <motion.h2
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.2 }}
        className="text-[#d4af37] mb-4"
      >
        Official Merchandise
      </motion.h2>

      {/* Subtitle */}
      <motion.p
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.3 }}
        className="text-xl md:text-2xl text-[#b0b0b0] mb-8 max-w-2xl mx-auto"
      >
        Strength you can wear.{' '}
        <span className="text-[#d4af37] font-semibold">Coming soon.</span>
      </motion.p>

      {/* CTA Button - Disabled state */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        transition={{ duration: 0.6, delay: 0.4 }}
        className="space-y-4"
      >
        <motion.button
          whileHover={!isComingSoon ? { scale: 1.05 } : {}}
          disabled={isComingSoon}
          className={`
            inline-flex items-center gap-3 px-8 py-4 rounded-lg font-bold text-lg
            transition-all duration-300 shadow-lg
            ${isComingSoon 
              ? 'bg-[#2a2a2a] text-[#606060] cursor-not-allowed opacity-60 shadow-none' 
              : 'bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white hover:text-black shadow-[#c41e3a]/30'
            }
          `}
        >
          <ShoppingBag className="w-5 h-5" />
          {isComingSoon ? 'Shop Coming Soon' : 'Browse Collection'}
        </motion.button>

        {/* Helper text */}
        {isComingSoon && (
          <motion.p
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6, delay: 0.5 }}
            className="text-sm text-[#808080] italic"
          >
            We're preparing official Strongman merchandise for you
          </motion.p>
        )}
      </motion.div>
    </div>
  );
}
