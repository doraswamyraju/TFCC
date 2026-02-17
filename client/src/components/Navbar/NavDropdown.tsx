import { useState } from 'react';
import { motion, AnimatePresence } from 'motion/react';
import { ChevronDown } from 'lucide-react';
import type { NavItem } from './navConfig';

interface NavDropdownProps {
  item: NavItem;
}

export function NavDropdown({ item }: NavDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div 
      className="relative group"
      onMouseEnter={() => setIsOpen(true)}
      onMouseLeave={() => setIsOpen(false)}
    >
      <a 
        href={item.href}
        className="flex items-center gap-1 text-white/90 hover:text-[#d4af37] transition-colors text-[11px] 2xl:text-sm font-medium py-2 whitespace-nowrap px-2"
      >
        {item.label}
        <ChevronDown className={`w-3 h-3 2xl:w-4 2xl:h-4 transition-transform duration-200 ${isOpen ? 'rotate-180' : ''}`} />
      </a>

      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, y: 10, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 10, scale: 0.95 }}
            transition={{ duration: 0.2 }}
            className="absolute left-0 mt-1 w-64 bg-black/95 backdrop-blur-md border border-[#2a2a2a] rounded-xl overflow-hidden shadow-2xl z-50"
          >
            <div className="py-2">
              {item.children?.map((child) => (
                <a
                  key={child.href}
                  href={child.href}
                  className="block px-4 py-2.5 text-sm text-[#b0b0b0] hover:text-[#d4af37] hover:bg-white/5 transition-all"
                >
                  {child.label}
                </a>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
