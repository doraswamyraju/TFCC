import { useState, useEffect, useRef, useCallback } from 'react';
import { motion } from 'motion/react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { CoachCard } from './CoachCard';

interface Coach {
  name: string;
  sport: string;
  experience: string;
  credentials: string;
  image?: string;
}

interface CoachesCarouselProps {
  coaches: Coach[];
  autoScrollInterval?: number;
}

export function CoachesCarousel({ coaches, autoScrollInterval = 3000 }: CoachesCarouselProps) {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [touchStart, setTouchStart] = useState<number | null>(null);
  const [touchEnd, setTouchEnd] = useState<number | null>(null);
  const intervalRef = useRef<number | null>(null);
  const containerRef = useRef<HTMLDivElement>(null);

  const totalCoaches = coaches.length;

  // Normalize index to handle infinite loop
  const normalizedIndex = ((currentIndex % totalCoaches) + totalCoaches) % totalCoaches;

  // Auto-scroll functionality
  useEffect(() => {
    if (isPaused || totalCoaches === 0) return;

    intervalRef.current = window.setInterval(() => {
      setCurrentIndex((prev) => prev + 1);
    }, autoScrollInterval);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, autoScrollInterval, totalCoaches]);

  // Navigation functions
  const goToNext = useCallback(() => {
    setCurrentIndex((prev) => prev + 1);
  }, []);

  const goToPrev = useCallback(() => {
    setCurrentIndex((prev) => prev - 1);
  }, []);

  // Touch handlers for mobile swipe
  const minSwipeDistance = 50;

  const onTouchStart = (e: React.TouchEvent) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e: React.TouchEvent) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > minSwipeDistance;
    const isRightSwipe = distance < -minSwipeDistance;

    if (isLeftSwipe) {
      goToNext();
    }
    if (isRightSwipe) {
      goToPrev();
    }
  };

  // Calculate visible cards based on screen size
  const getCardsPerView = () => {
    if (typeof window === 'undefined') return 1;
    const width = window.innerWidth;
    if (width >= 1280) return 4; // xl
    if (width >= 1024) return 3; // lg
    if (width >= 640) return 2;  // sm
    return 1; // mobile
  };

  const [cardsPerView, setCardsPerView] = useState(getCardsPerView());

  useEffect(() => {
    const handleResize = () => {
      setCardsPerView(getCardsPerView());
    };

    window.addEventListener('resize', handleResize);
    return () => window.removeEventListener('resize', handleResize);
  }, []);

  // Calculate transform based on cards per view
  const getTransform = () => {
    // Calculate percentage per card based on visible cards
    const percentagePerCard = 100 / cardsPerView;
    // Use normalized index for infinite loop
    return `-${normalizedIndex * percentagePerCard}%`;
  };

  // Calculate card width dynamically
  const getCardWidth = () => {
    const gap = cardsPerView === 1 ? 0 : 1.5; // 1.5rem gap
    const totalGaps = (cardsPerView - 1) * gap;
    return `calc((100% - ${totalGaps}rem) / ${cardsPerView})`;
  };

  return (
    <div
      ref={containerRef}
      className="relative w-full"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      {/* Carousel Container */}
      <div className="overflow-hidden relative">
        <motion.div
          className="flex gap-4 sm:gap-6"
          animate={{
            x: getTransform()
          }}
          transition={{
            type: "spring",
            stiffness: 300,
            damping: 30,
            mass: 0.8
          }}
        >
          {coaches.map((coach, idx) => (
            <div
              key={`coach-${idx}`}
              className="flex-shrink-0"
              style={{
                width: getCardWidth(),
                minWidth: cardsPerView === 1 ? '100%' : '280px'
              }}
            >
              <CoachCard
                name={coach.name}
                sport={coach.sport}
                experience={coach.experience}
                credentials={coach.credentials}
                image={coach.image}
                index={idx}
              />
            </div>
          ))}
        </motion.div>
      </div>

      {/* Navigation Arrows - Hidden on mobile, visible on tablet+ */}
      <button
        onClick={goToPrev}
        className="hidden sm:flex absolute left-0 top-1/2 -translate-y-1/2 -translate-x-4 md:-translate-x-6 lg:-translate-x-8 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#d4af37] rounded-full items-center justify-center text-[#d4af37] hover:text-white transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 z-20"
        aria-label="Previous coaches"
      >
        <ChevronLeft className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
      </button>

      <button
        onClick={goToNext}
        className="hidden sm:flex absolute right-0 top-1/2 -translate-y-1/2 translate-x-4 md:translate-x-6 lg:translate-x-8 w-10 h-10 md:w-12 md:h-12 lg:w-14 lg:h-14 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#d4af37] rounded-full items-center justify-center text-[#d4af37] hover:text-white transition-all duration-300 shadow-lg hover:scale-110 active:scale-95 z-20"
        aria-label="Next coaches"
      >
        <ChevronRight className="w-5 h-5 md:w-6 md:h-6 lg:w-7 lg:h-7" />
      </button>

      {/* Mobile Swipe Indicator */}
      <div className="sm:hidden flex justify-center gap-2 mt-4">
        {coaches.slice(0, Math.min(5, coaches.length)).map((_, idx) => (
          <div
            key={idx}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              normalizedIndex === idx
                ? 'w-6 bg-[#d4af37]'
                : 'w-1.5 bg-[#2a2a2a]'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
