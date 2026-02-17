import { motion } from 'motion/react';
import { Trophy, Zap, ChevronRight, ArrowRight } from 'lucide-react';
import { logo } from '../assets';

export function Hero() {
  return (
    <section
      id="home"
      className="relative min-h-screen flex items-center justify-center overflow-hidden bg-black pt-20 pb-12 sm:pt-24 sm:pb-16"
    >
      {/* Static background orbs - no animation to avoid lag */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div
          className="hidden md:block absolute top-1/4 left-1/4 w-[500px] h-[500px] md:w-[600px] md:h-[600px] bg-[#c41e3a] rounded-full blur-[150px] md:blur-[180px] opacity-20"
          aria-hidden
        />
        <div
          className="hidden md:block absolute bottom-1/4 right-1/4 w-[600px] h-[600px] lg:w-[700px] lg:h-[700px] bg-[#d4af37] rounded-full blur-[150px] md:blur-[180px] opacity-15"
          aria-hidden
        />
      </div>

      {/* Energy Grid Pattern - Disabled on Mobile for Performance */}
      <div className="hidden md:block absolute inset-0 opacity-10">
        <div
          className="h-full w-full"
          style={{
            backgroundImage: `
              linear-gradient(rgba(212, 175, 55, 0.1) 1px, transparent 1px),
              linear-gradient(90deg, rgba(212, 175, 55, 0.1) 1px, transparent 1px)
            `,
            backgroundSize: '50px 50px',
          }}
        />
      </div>

      {/* Large Logo - Central Background (one-time fade-in, no continuous animation) */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ duration: 0.6 }}
        className="absolute inset-0 flex items-center justify-center pointer-events-none z-0"
      >
        <div className="relative w-full h-full flex items-center justify-center">
          <img
            src={logo}
            alt="FCC Logo"
            loading="eager"
            fetchPriority="high"
            width="1000"
            height="1000"
            className="relative w-[300px] h-[300px] xs:w-[400px] xs:h-[400px] sm:w-[500px] sm:h-[500px] md:w-[700px] md:h-[700px] lg:w-[800px] lg:h-[800px] xl:w-[1000px] xl:h-[1000px] object-contain opacity-[0.08] sm:opacity-[0.1] md:opacity-[0.15] mx-auto"
          />
        </div>
      </motion.div>

      {/* Main Content - Mobile Optimized Padding */}
      <div className="relative z-10 w-full max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 sm:py-12 md:py-20">
        <div className="text-center">
          {/* Badge - Responsive - No backdrop-blur on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="inline-flex items-center gap-1.5 sm:gap-2 mb-4 sm:mb-6 px-3 py-1.5 sm:px-5 sm:py-2.5 bg-gradient-to-r from-[#c41e3a]/95 to-[#8b1526]/95 md:backdrop-blur-md border-2 border-[#ffd700] rounded-full shadow-lg shadow-[#ffd700]/30"
          >
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700]" />
            <span className="text-xs sm:text-sm md:text-base font-black text-white tracking-wider uppercase">
              India's Premier University Strength Championship
            </span>
            <Zap className="h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700]" />
          </motion.div>

          {/* Main Headline - Simplified Shadows on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            className="space-y-2 sm:space-y-3 md:space-y-4 mb-6 sm:mb-8"
          >
            <h1 className="text-3xl xs:text-4xl sm:text-5xl md:text-6xl lg:text-7xl xl:text-8xl font-black leading-[1.1] sm:leading-tight">
              <span className="block text-white drop-shadow-[0_2px_4px_rgba(0,0,0,0.8)] md:drop-shadow-[0_0_20px_rgba(212,175,55,0.5),0_2px_4px_rgba(0,0,0,0.8)] px-2">
                Welcome to the
              </span>
              <span className="relative block mt-2 sm:mt-4 px-2">
                {/* High-Voltage Flicker Background */}
                <motion.span
                  animate={{
                    opacity: [0.2, 0.9, 0.1, 1, 0.2, 0.8, 0.1],
                    filter: [
                      "blur(15px) brightness(1)",
                      "blur(25px) brightness(2)",
                      "blur(15px) brightness(1)",
                      "blur(35px) brightness(2.5)",
                      "blur(15px) brightness(1.2)",
                      "blur(25px) brightness(2)",
                      "blur(15px) brightness(1)",
                    ]
                  }}
                  transition={{
                    duration: 1.5,
                    repeat: Infinity,
                    times: [0, 0.05, 0.1, 0.15, 0.2, 0.5, 1],
                    ease: "linear"
                  }}
                  className="absolute inset-0 text-[#ffd700] font-black pointer-events-none select-none"
                  aria-hidden
                >
                  <span className="text-[#d4af37]">STRONGEST WOMEN </span><span className="text-white">&</span><span className="text-[#d4af37]"> MEN</span>
                </motion.span>

                {/* Shimmering Text with "Voltage Glitch" movement */}
                <motion.span
                  className="relative inline-block bg-clip-text text-transparent bg-gradient-to-r from-[#bf953f] via-[#fff1a7] to-[#bf953f] drop-shadow-[0_4px_15px_rgba(0,0,0,0.6)]"
                  style={{ backgroundSize: '200% auto' }}
                  animate={{
                    backgroundPosition: ["0% center", "200% center"],
                    x: [0, -2, 2, -1, 1, 0],
                    filter: ["brightness(1)", "brightness(1.5)", "brightness(1)", "brightness(2)", "brightness(1)"],
                  }}
                  transition={{
                    backgroundPosition: { duration: 4, repeat: Infinity, ease: "linear" },
                    x: { duration: 0.1, repeat: Infinity, repeatDelay: 2.5, times: [0, 0.2, 0.4, 0.6, 0.8, 1] },
                    filter: { duration: 0.1, repeat: Infinity, repeatDelay: 2.5, times: [0, 0.2, 0.4, 0.6, 1] }
                  }}
                >
                  <span className="text-[#d4af37]">STRONGEST WOMEN </span><span className="text-white">&</span><span className="text-[#d4af37]"> MEN</span>
                </motion.span>
              </span>
              <span className="block text-white text-xl xs:text-2xl sm:text-3xl md:text-4xl lg:text-5xl xl:text-6xl font-bold mt-2 sm:mt-3 tracking-wider px-2">
                COMPETITION
              </span>
            </h1>
          </motion.div>

          {/* Challenge Message - Mobile Responsive */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, delay: 0.4 }}
            className="mb-6 sm:mb-8 md:mb-10 space-y-3 sm:space-y-4 px-2"
          >
            {/* Additional Message Line */}
            <motion.p
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1 }}
              className="text-base sm:text-lg md:text-xl lg:text-2xl text-white/90 mt-4 sm:mt-6 px-2 leading-relaxed"
            >
              Building Strength, Discipline, & Competitive Spirit<br className="hidden sm:block" /> In Indian Campuses
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ duration: 0.5, delay: 0.5 }}
              className="relative text-lg xs:text-xl sm:text-2xl md:text-3xl lg:text-4xl xl:text-5xl font-black mt-4 sm:mt-6 px-2"
            >
              <span className="hidden md:block absolute inset-0 text-[#d4af37] blur-[2px] opacity-70">Will You Rise To The Challenge?</span>
              <span className="relative text-[#ffd700] drop-shadow-[0_2px_8px_rgba(0,0,0,1)] md:drop-shadow-[0_0_25px_rgba(255,215,0,0.9),0_4px_12px_rgba(0,0,0,1),0_0_0_4px_rgba(0,0,0,0.9)]">
                Will You Rise To The Challenge?
              </span>
            </motion.p>


          </motion.div>

          {/* Key Stats - Bold Pills - No Backdrop Blur on Mobile */}
          <motion.div
            initial={{ opacity: 0, y: 10 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4, delay: 0.3 }}
            className="flex flex-wrap justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 md:mb-10 px-2"
          >
            <div className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-black/80 md:bg-black/70 md:backdrop-blur-md border-2 border-[#ffd700] rounded-lg shadow-lg md:shadow-[0_0_30px_rgba(255,215,0,0.4)]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Zap className="h-5 w-5 sm:h-6 sm:w-6 text-[#ffd700] md:group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg md:text-xl font-black text-white">Up to 5 Workouts</span>
              </div>
            </div>
            <div className="group relative px-4 py-2 sm:px-6 sm:py-3 bg-black/80 md:bg-black/70 md:backdrop-blur-md border-2 border-[#c41e3a] rounded-lg shadow-lg md:shadow-[0_0_30px_rgba(196,30,58,0.4)]">
              <div className="flex items-center gap-2 sm:gap-3">
                <Trophy className="h-5 w-5 sm:h-6 sm:w-6 text-[#c41e3a] md:group-hover:scale-110 transition-transform" />
                <span className="text-base sm:text-lg md:text-xl font-black text-white">Up to ₹1 Lakh Prize</span>
              </div>
            </div>
          </motion.div>

          {/* Primary CTA - Registration - Simplified Animations on Mobile */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.4, delay: 0.4 }}
            className="flex flex-col sm:flex-row gap-3 sm:gap-4 justify-center items-center px-2"
          >
            <a
              href="#athletes"
              className="group relative w-full sm:w-auto px-6 py-4 sm:px-10 sm:py-5 bg-gradient-to-r from-[#c41e3a] via-[#d4af37] to-[#c41e3a] text-base sm:text-xl md:text-2xl font-black text-white rounded-lg shadow-lg md:shadow-[0_0_60px_rgba(196,30,58,0.6)] transition-transform hover:scale-[1.02] active:scale-[0.98] border-2 border-white/20 overflow-hidden text-center"
            >
              <span className="relative z-10 flex items-center justify-center gap-2 sm:gap-3">
                REGISTER NOW
                <ArrowRight className="h-5 w-5 sm:h-6 sm:w-6 md:group-hover:translate-x-2 transition-transform" />
              </span>
            </a>
            <a
              href="#strongest-human"
              className="w-full sm:w-auto px-6 py-4 sm:px-8 sm:py-5 bg-black/90 md:bg-black/80 md:backdrop-blur-md border-2 border-[#ffd700] text-base sm:text-lg md:text-xl font-bold text-white rounded-lg md:hover:bg-[#ffd700]/10 transition-all shadow-lg md:shadow-[0_0_20px_rgba(255,215,0,0.3)] text-center active:scale-[0.98]"
            >
              Explore Events
              <ChevronRight className="inline-block ml-2 h-4 w-4 sm:h-5 sm:w-5 text-[#ffd700]" />
            </a>
          </motion.div>

          {/* Scroll Indicator - static to avoid layout thrash */}
          <div className="hidden xs:block absolute bottom-4 sm:bottom-8 left-1/2 -translate-x-1/2">
            <ChevronRight className="w-6 h-6 sm:w-8 sm:h-8 text-[#ffd700] rotate-90 opacity-60" />
          </div>
        </div>
      </div>

      {/* Corner Accents - Smaller on Mobile */}
      <div className="absolute top-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-2 sm:border-t-4 border-l-2 sm:border-l-4 border-[#c41e3a]/30" />
      <div className="absolute top-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-t-2 sm:border-t-4 border-r-2 sm:border-r-4 border-[#d4af37]/30" />
      <div className="absolute bottom-0 left-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-b-2 sm:border-b-4 border-l-2 sm:border-l-4 border-[#d4af37]/30" />
      <div className="absolute bottom-0 right-0 w-16 h-16 sm:w-24 sm:h-24 md:w-32 md:h-32 border-b-2 sm:border-b-4 border-r-2 sm:border-r-4 border-[#c41e3a]/30" />
    </section>
  );
}
