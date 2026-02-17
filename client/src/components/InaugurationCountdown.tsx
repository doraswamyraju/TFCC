import { useState, useEffect } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { Star, Calendar, Clock, MapPin } from 'lucide-react';

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
    <div className="relative min-h-screen w-full overflow-hidden bg-[var(--color-primary-black)] text-[var(--color-light-grey)] flex flex-col items-center justify-center p-4">
      {/* Background Effects */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] bg-[var(--color-red)] rounded-full blur-[150px] opacity-10" />
        <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] bg-[var(--color-gold)] rounded-full blur-[150px] opacity-10" />
      </div>

      <div className="relative z-10 max-w-5xl w-full mx-auto grid lg:grid-cols-2 gap-12 items-center">
        {/* Left Column: Content */}
        <motion.div 
          initial={{ opacity: 0, x: -50 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8, ease: "easeOut" }}
          className="text-center lg:text-left space-y-8"
        >
          {/* Header */}
          <div className="space-y-2">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center gap-2 px-3 py-1 rounded-full border border-[var(--color-gold)]/30 bg-[var(--color-gold)]/10 text-[var(--color-gold)] text-sm font-medium uppercase tracking-wider"
            >
              <Star size={14} />
              <span>{isLive ? "Happening Now" : "Official Inauguration"}</span>
            </motion.div>
            
            <motion.h1 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight text-white leading-tight"
            >
              {isLive ? (
                 <>
                   The Legacy <br />
                   <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-red)] to-[var(--color-gold)]">
                     Is Here
                   </span>
                 </>
              ) : (
                <>
                  The Grand Launch <br />
                  <span className="text-transparent bg-clip-text bg-gradient-to-r from-[var(--color-red)] to-[var(--color-gold)]">
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
                className="grid grid-cols-4 gap-4 max-w-lg mx-auto lg:mx-0"
              >
                {Object.entries(timeLeft).map(([unit, value], index) => (
                  <motion.div 
                    key={unit}
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ delay: 0.4 + index * 0.1 }}
                    className="flex flex-col items-center"
                  >
                    <div className="w-full aspect-square flex items-center justify-center bg-white/5 backdrop-blur-md border border-white/10 rounded-xl mb-2 group hover:border-[var(--color-gold)]/50 transition-colors duration-300">
                      <span className="text-3xl md:text-4xl lg:text-5xl font-bold font-mono text-white group-hover:text-[var(--color-gold)] transition-colors duration-300">
                        {value.toString().padStart(2, '0')}
                      </span>
                    </div>
                    <span className="text-xs uppercase tracking-widest text-white/50">{unit}</span>
                  </motion.div>
                ))}
              </motion.div>
            ) : (
              <motion.div
                key="live-message"
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                className="py-4"
              >
                <p className="text-xl text-[var(--color-light-grey)] mb-6">
                  The moment has arrived. Join us as we make history.
                </p>
                 <button 
                  onClick={onComplete}
                  className="px-8 py-4 bg-[var(--color-red)] hover:bg-[var(--color-red)]/90 text-white font-bold rounded-full shadow-[0_0_20px_rgba(196,30,58,0.5)] hover:shadow-[0_0_30px_rgba(196,30,58,0.7)] transition-all duration-300 transform hover:scale-105"
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
              className="flex flex-col sm:flex-row gap-6 justify-center lg:justify-start pt-4 text-sm text-white/70"
            >
              <div className="flex items-center gap-2">
                <Calendar size={16} className="text-[var(--color-red)]" />
                <span>{new Date(targetDate).toLocaleDateString('en-US', { weekday: 'long', month: 'long', day: 'numeric' })}</span>
              </div>
              <div className="flex items-center gap-2">
                <Clock size={16} className="text-[var(--color-gold)]" />
                <span>{new Date(targetDate).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit' })}</span>
              </div>
              <div className="flex items-center gap-2">
                 <MapPin size={16} className="text-[var(--color-light-grey)]" />
                 <span>Main Auditorium</span>
              </div>
            </motion.div>
          )}

          {/* Live State Button - Removed from here as it is now in the conditional block above */}
        </motion.div>

        {/* Right Column: Guest Image */}
        <motion.div 
          initial={{ opacity: 0, scale: 0.95 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 1, ease: "easeOut" }}
          className="relative mx-auto lg:mx-0 w-full max-w-md aspect-[3/4]"
        >
           {/* Image Container with Framing */}
           <div className="absolute inset-0 bg-gradient-to-tr from-[var(--color-red)] to-[var(--color-gold)] rounded-2xl opacity-20 blur-xl transform rotate-3" />
           <div className="absolute inset-0 bg-[var(--color-charcoal)] rounded-2xl border border-white/10 overflow-hidden shadow-2xl">
              <div className="absolute inset-0 bg-gradient-to-t from-black via-transparent to-transparent z-10 opacity-80" />
              
              <img 
                src={guestImage} 
                alt={guestName}
                className="w-full h-full object-cover object-top filter grayscale-[20%] hover:grayscale-0 transition-all duration-700"
              />
              
              {/* Guest Info Overlay */}
              <div className="absolute bottom-0 left-0 right-0 p-8 z-20 text-left">
                <div className="inline-block px-3 py-1 mb-3 rounded-full bg-[var(--color-red)]/20 border border-[var(--color-red)]/50 text-[var(--color-red)] text-xs font-bold uppercase tracking-wider backdrop-blur-sm">
                  Inaugurated By
                </div>
                <h3 className="text-3xl font-bold text-white mb-1">{guestName}</h3>
                <p className="text-[var(--color-gold)] font-medium tracking-wide">{guestDesignation}</p>
              </div>
           </div>
        </motion.div>
      </div>
    </div>
  );
};
