import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

interface InaugurationCountdownProps {
  guestName: string;
  guestDesignation: string;
  guestImage: string;
  targetDate: string; // ISO format
  onComplete?: () => void;
}

export const InaugurationCountdown = ({
  guestName,
  guestDesignation,
  guestImage,
  targetDate,
  onComplete
}: InaugurationCountdownProps) => {
  const [timeLeft, setTimeLeft] = useState(calculateTimeLeft());
  const [isLive, setIsLive] = useState(false);

  function calculateTimeLeft() {
    const difference = +new Date(targetDate) - +new Date();

    if (difference <= 0) {
      return { days: 0, hours: 0, minutes: 0, seconds: 0 };
    }

    return {
      days: Math.floor(difference / (1000 * 60 * 60 * 24)),
      hours: Math.floor((difference / (1000 * 60 * 60)) % 24),
      minutes: Math.floor((difference / 1000 / 60) % 60),
      seconds: Math.floor((difference / 1000) % 60),
    };
  }

  useEffect(() => {
    const timer = setInterval(() => {
      const remaining = calculateTimeLeft();
      setTimeLeft(remaining);

      if (remaining.days === 0 && remaining.hours === 0 && remaining.minutes === 0 && remaining.seconds === 0) {
        setIsLive(true);
        if (onComplete) onComplete();
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, [targetDate, onComplete]);

  return (
    <div className="relative min-h-screen w-full overflow-hidden bg-[#050505] text-white flex flex-col items-center justify-center p-4 py-24">
      {/* Intense Background Glows */}
      <div className="absolute top-0 right-0 w-[800px] h-[800px] bg-[#c41e3a]/15 blur-[200px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
      <div className="absolute bottom-0 left-0 w-[800px] h-[800px] bg-[#d4af37]/15 blur-[200px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

      {/* Grid Texture */}
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

      <div className="relative z-10 max-w-7xl w-full mx-auto grid lg:grid-cols-2 gap-16 lg:gap-24 items-center">
        {/* Left Column: Content */}
        <motion.div
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, type: "spring", bounce: 0.4 }}
          className="text-center lg:text-left space-y-10"
        >
          {/* Header */}
          <div className="space-y-6">
            <motion.div
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-3 px-6 py-2.5 rounded-full bg-gradient-to-r from-[#ffd700] to-[#d4af37] text-black font-black uppercase tracking-widest shadow-[0_0_20px_rgba(212,175,55,0.4)]"
            >
              <Sparkles className="w-5 h-5" />
              <span>{isLive ? "Happening Now" : "Official Inauguration"}</span>
              <Sparkles className="w-5 h-5" />
            </motion.div>

            <motion.h1
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl lg:text-8xl font-black tracking-tight text-white leading-tight drop-shadow-2xl"
            >
              {isLive ? (
                <>
                  The Legacy <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#c41e3a] drop-shadow-[0_0_15px_rgba(196,30,58,0.5)]">
                    Is Here
                  </span>
                </>
              ) : (
                <>
                  The Grand Launch <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#c41e3a] drop-shadow-[0_0_30px_rgba(196,30,58,0.4)]">
                    Begins In
                  </span>
                </>
              )}
            </motion.h1>
          </div>

          {/* Countdown Timer or Live Message */}
          <AnimatePresence mode="wait">
            {!isLive ? (
              <motion.div
                key="timer"
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                exit={{ opacity: 0, y: -20 }}
                className="grid grid-cols-4 gap-4 md:gap-6 max-w-2xl mx-auto lg:mx-0"
              >
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <motion.div
                    key={unit}
                    initial={{ opacity: 0, y: 30 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1, type: "spring", stiffness: 100 }}
                    className="flex flex-col items-center"
                  >
                    <div className="relative group w-full aspect-square flex items-center justify-center bg-zinc-900/60 backdrop-blur-xl border-2 border-white/10 rounded-3xl mb-4 hover:border-[#ffd700]/50 transition-all duration-300 shadow-[0_0_30px_rgba(0,0,0,0.5)] overflow-hidden hover:-translate-y-2">
                      <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/20 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                      <span className="relative z-10 text-4xl md:text-5xl lg:text-6xl font-black tabular-nums text-transparent bg-clip-text bg-gradient-to-b from-white to-gray-500 group-hover:from-[#ffd700] group-hover:to-[#d4af37] transition-all duration-300 drop-shadow-lg">
                        {value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-sm font-bold uppercase tracking-widest text-[#d4af37]">{unit}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="live-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-6"
              >
                <p className="text-2xl md:text-3xl text-gray-300 mb-10 font-medium leading-relaxed max-w-xl mx-auto lg:mx-0">
                  The moment has arrived. <span className="text-white font-black">Join us as we make history.</span>
                </p>
                <button
                  onClick={onComplete}
                  className="px-10 py-5 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#ff4d6d] hover:to-[#c41e3a] text-white font-black text-xl rounded-full shadow-[0_0_30px_rgba(196,30,58,0.6)] hover:shadow-[0_0_50px_rgba(196,30,58,0.8)] transition-all duration-300 transform hover:scale-105 uppercase tracking-widest"
                >
                  Enter Experience
                </button>
              </motion.div>
            )}
          </AnimatePresence>

          {/* Launch Details - Only show if not live */}
          {!isLive && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              transition={{ delay: 0.8 }}
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-8"
            >
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
                <Calendar size={20} className="text-[#c41e3a]" />
                <span className="font-medium text-gray-300">{new Date(targetDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
                <Clock size={20} className="text-[#ffd700]" />
                <span className="font-medium text-gray-300">{new Date(targetDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-3 bg-white/5 border border-white/10 px-5 py-3 rounded-2xl backdrop-blur-md">
                <MapPin size={20} className="text-[#ff4d6d]" />
                <span className="font-medium text-gray-300">Main Auditorium</span>
              </div>
            </motion.div>
          )}

        </motion.div>

        {/* Right Column: Guest Image */}
        <motion.div
          initial={{ opacity: 0, scale: 0.9, rotate: -5 }}
          animate={{ opacity: 1, scale: 1, rotate: 0 }}
          transition={{ duration: 1, type: "spring", bounce: 0.3 }}
          className="relative mx-auto w-full max-w-[500px]"
        >
          {/* Image Container with Framing */}
          <div className="absolute inset-0 bg-gradient-to-tr from-[#c41e3a] via-[#ffd700] to-[#c41e3a] rounded-[3rem] opacity-50 blur-2xl transform rotate-3" />
          <div className="relative aspect-[3/4] bg-zinc-900 rounded-[3rem] border border-[#d4af37]/30 overflow-hidden shadow-[0_0_50px_rgba(0,0,0,0.8)] group">
            <div className="absolute inset-0 bg-gradient-to-t from-black via-black/40 to-transparent z-10" />

            <img
              src={guestImage}
              alt={guestName}
              className="w-full h-full object-cover object-top filter grayscale-[30%] group-hover:grayscale-0 group-hover:scale-105 transition-all duration-1000"
            />

            {/* Guest Info Overlay */}
            <div className="absolute bottom-0 left-0 right-0 p-10 z-20 text-center transform group-hover:-translate-y-2 transition-transform duration-500">
              <div className="inline-block px-4 py-2 mb-4 rounded-full bg-gradient-to-r from-[#c41e3a]/80 to-[#8b1526]/80 text-[#ffd700] border border-[#ff4d6d] text-sm font-black uppercase tracking-widest backdrop-blur-md shadow-[0_0_20px_rgba(196,30,58,0.5)]">
                Inaugurated By
              </div>
              <h3 className="text-4xl md:text-5xl font-black text-white mb-2 drop-shadow-lg">{guestName}</h3>
              <p className="text-[#d4af37] font-bold text-lg md:text-xl tracking-widest uppercase">{guestDesignation}</p>
            </div>
          </div>

          {/* Sparkle details */}
          <Star className="absolute top-10 right-10 w-8 h-8 text-[#ffd700] animate-pulse" />
          <Star className="absolute bottom-32 left-0 w-6 h-6 text-[#c41e3a] animate-bounce" />
        </motion.div>
      </div>
    </div>
  );
};
