import { useEffect } from 'react';
import { createPortal } from 'react-dom';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronRight, X } from 'lucide-react';

interface EventDetail {
  label: string;
  value: string;
}

interface EventModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  image: string;
  details: EventDetail[];
  note: string;
  currentIndex: number;
  totalEvents: number;
  onPrev?: () => void;
  onNext?: () => void;
}

export function EventModal({
  isOpen,
  onClose,
  title,
  image,
  details,
  note,
  currentIndex,
  totalEvents,
  onPrev,
  onNext,
}: EventModalProps) {
  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      const originalOverflow = document.body.style.overflow;
      document.body.style.overflow = 'hidden';
      return () => {
        document.body.style.overflow = originalOverflow;
      };
    }
  }, [isOpen]);

  // Handle ESC key
  useEffect(() => {
    const handleEsc = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) onClose();
    };
    window.addEventListener('keydown', handleEsc);
    return () => window.removeEventListener('keydown', handleEsc);
  }, [isOpen, onClose]);

  const modal = (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          key="modal-backdrop"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          onClick={onClose}
          className="fixed inset-0 bg-black/95 flex items-center justify-center p-4 overflow-auto"
          style={{ zIndex: 99999 }}
        >
          {/* Previous Arrow */}
          {onPrev && (
            <motion.button
              initial={{ opacity: 0, x: -20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onPrev(); }}
              aria-label="Previous event"
              className="fixed left-2 sm:left-4 md:left-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#d4af37] rounded-full flex items-center justify-center text-[#d4af37] hover:text-white transition-colors shadow-xl"
              style={{ zIndex: 100001 }}
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10 rotate-180" />
            </motion.button>
          )}

          {/* Next Arrow */}
          {onNext && (
            <motion.button
              initial={{ opacity: 0, x: 20 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: 20 }}
              transition={{ duration: 0.2, delay: 0.1 }}
              whileHover={{ scale: 1.1 }}
              whileTap={{ scale: 0.95 }}
              onClick={(e) => { e.stopPropagation(); onNext(); }}
              aria-label="Next event"
              className="fixed right-2 sm:right-4 md:right-8 top-1/2 -translate-y-1/2 w-14 h-14 sm:w-16 sm:h-16 md:w-20 md:h-20 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#d4af37] rounded-full flex items-center justify-center text-[#d4af37] hover:text-white transition-colors shadow-xl"
              style={{ zIndex: 100001 }}
            >
              <ChevronRight className="w-7 h-7 sm:w-8 sm:h-8 md:w-10 md:h-10" />
            </motion.button>
          )}

          {/* Modal Content */}
          <motion.div
            key={title}
            initial={{ scale: 0.9, opacity: 0, y: 30 }}
            animate={{ scale: 1, opacity: 1, y: 0 }}
            exit={{ scale: 0.9, opacity: 0, y: 30 }}
            transition={{ type: "spring", duration: 0.4, bounce: 0.2 }}
            onClick={(e) => e.stopPropagation()}
            className="relative max-w-5xl w-full max-h-[90vh] overflow-y-auto bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-4 border-[#d4af37] rounded-2xl shadow-2xl shadow-[#d4af37]/20"
            style={{ zIndex: 100000 }}
          >
            {/* Close Button */}
            <motion.button
              initial={{ opacity: 0, rotate: -90 }}
              animate={{ opacity: 1, rotate: 0 }}
              transition={{ duration: 0.3, delay: 0.2 }}
              whileHover={{ scale: 1.1, rotate: 90 }}
              whileTap={{ scale: 0.9 }}
              onClick={(e) => { e.stopPropagation(); onClose(); }}
              aria-label="Close modal"
              className="sticky top-4 float-right m-4 w-12 h-12 bg-[#c41e3a] hover:bg-[#d4af37] rounded-full flex items-center justify-center text-white transition-colors z-10"
            >
              <X className="w-6 h-6" />
            </motion.button>

            <div className="p-6 md:p-8 pt-2">
              {/* Event Counter */}
              {totalEvents > 0 && (
                <motion.div 
                  initial={{ opacity: 0, y: -10 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.1 }}
                  className="text-center mb-4"
                >
                  <span className="text-[#808080] text-sm bg-black/30 px-4 py-1.5 rounded-full">
                    Event {currentIndex + 1} of {totalEvents}
                  </span>
                </motion.div>
              )}

              {/* Event Header */}
              <motion.h2 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.15 }}
                className="text-2xl md:text-3xl font-bold text-[#d4af37] mb-6 text-center"
              >
                {title}
              </motion.h2>

              {/* Layout: Image + Details */}
              <div className="grid lg:grid-cols-2 gap-6 mb-6">
                {/* Event Image */}
                <motion.div
                  initial={{ opacity: 0, x: -30 }}
                  animate={{ opacity: 1, x: 0 }}
                  transition={{ delay: 0.2 }}
                >
                  <img
                    src={image}
                    alt={title}
                    className="w-full max-h-[400px] object-contain rounded-lg border-2 border-[#c41e3a] bg-black/20"
                  />
                </motion.div>

                {/* Event Details */}
                <div className="space-y-3">
                  {details.map((detail, i) => (
                    <motion.div
                      key={i}
                      initial={{ opacity: 0, x: 30 }}
                      animate={{ opacity: 1, x: 0 }}
                      transition={{ delay: 0.2 + i * 0.05 }}
                      className="bg-black/50 border border-[#c41e3a]/30 rounded-lg p-3"
                    >
                      <div className="flex items-start gap-3">
                        <div className="w-2 h-2 bg-[#c41e3a] rounded-full mt-1.5 shrink-0"></div>
                        <div>
                          <p className="text-[#d4af37] font-bold text-sm">
                            {detail.label}
                          </p>
                          <p className="text-white text-sm leading-relaxed">
                            {detail.value}
                          </p>
                        </div>
                      </div>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Note Section */}
              <motion.div 
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="bg-gradient-to-r from-[#c41e3a]/20 to-[#d4af37]/20 border-l-4 border-[#d4af37] p-4 rounded"
              >
                <p className="text-[#b0b0b0] italic text-sm leading-relaxed">
                  {note}
                </p>
              </motion.div>

              {/* Navigation Hint */}
              <motion.div 
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.5 }}
                className="mt-4 text-center"
              >
                <p className="text-[#606060] text-xs">
                  Use arrows to navigate • Press ESC to close
                </p>
              </motion.div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  );

  return createPortal(modal, document.body);
}
