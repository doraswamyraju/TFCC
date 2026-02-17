import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown, ArrowRight } from 'lucide-react';
import type { NavItem } from './navConfig';

interface MobileMenuProps {
  isOpen: boolean;
  onClose: () => void;
  navItems: NavItem[];
}

export function MobileMenu({ isOpen, onClose, navItems }: MobileMenuProps) {
  const [expandedItem, setExpandedItem] = useState<string | null>(null);

  const toggleExpand = (label: string) => {
    setExpandedItem(expandedItem === label ? null : label);
  };

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0, height: 0 }}
          animate={{ opacity: 1, height: 'auto' }}
          exit={{ opacity: 0, height: 0 }}
          className="xl:hidden pb-6 border-t border-[#2a2a2a] mt-2 pt-4 bg-black/95 overflow-hidden"
        >
          <div className="flex flex-col px-4 gap-1">
            {navItems.map((item) => (
              <div key={item.label} className="flex flex-col">
                {item.children ? (
                  <>
                    <button
                      onClick={() => toggleExpand(item.label)}
                      className="flex items-center justify-between text-white hover:text-[#d4af37] py-3 px-4 rounded-lg transition-colors text-base font-medium text-left w-full"
                    >
                      {item.label}
                      <ChevronDown className={`w-5 h-5 transition-transform duration-200 ${expandedItem === item.label ? 'rotate-180' : ''}`} />
                    </button>
                    <AnimatePresence>
                      {expandedItem === item.label && (
                        <motion.div
                          initial={{ height: 0, opacity: 0 }}
                          animate={{ height: 'auto', opacity: 1 }}
                          exit={{ height: 0, opacity: 0 }}
                          className="overflow-hidden bg-white/5 rounded-lg mx-2 mb-2"
                        >
                          <div className="flex flex-col py-1">
                            {item.children.map((child) => (
                              <a
                                key={child.href}
                                href={child.href}
                                onClick={onClose}
                                className="text-[#b0b0b0] hover:text-[#d4af37] py-2.5 px-6 text-sm transition-colors border-l-2 border-transparent hover:border-[#d4af37]"
                              >
                                {child.label}
                              </a>
                            ))}
                          </div>
                        </motion.div>
                      )}
                    </AnimatePresence>
                  </>
                ) : (
                  <a
                    href={item.href}
                    onClick={onClose}
                    className="text-white hover:text-[#d4af37] py-3 px-4 rounded-lg transition-colors text-base font-medium"
                  >
                    {item.label}
                  </a>
                )}
              </div>
            ))}

            {/* Mobile CTA Button */}
            <motion.a
              href="#contact"
              whileTap={{ scale: 0.98 }}
              onClick={onClose}
              className="mt-4 px-6 py-3.5 bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white text-base font-bold rounded-lg transition-all shadow-lg shadow-[#c41e3a]/30 flex items-center justify-center gap-2"
            >
              Register Now
              <ArrowRight className="h-5 w-5" />
            </motion.a>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
