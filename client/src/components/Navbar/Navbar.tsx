import { useState, useEffect } from 'react';
import { motion } from 'motion/react';
import { Menu, X, ArrowRight } from 'lucide-react';
import { navItems } from './navConfig';
import { NavDropdown } from './NavDropdown';
import { MobileMenu } from './MobileMenu';
import { logo } from '../../assets';

export function Navbar() {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 20);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav className={`fixed top-0 w-full z-100 transition-all duration-300 ${
      scrolled ? 'bg-black/90 backdrop-blur-xl border-b border-white/10 py-2 shadow-2xl' : 'bg-linear-to-b from-black/80 to-transparent py-4'
    }`}>
      <div className="max-w-[1600px] mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16 sm:h-20 gap-4">
          {/* Logo */}
          <motion.a 
            href="#home"
            initial={{ opacity: 0, x: -20 }}
            animate={{ opacity: 1, x: 0 }}
            className="flex items-center gap-2 sm:gap-3 shrink-0 relative z-10"
          >
            <img src={logo} alt="FCC Logo" className="h-10 w-10 sm:h-12 sm:w-12 shrink-0" />
            <div className="flex flex-col">
              <div className="text-sm sm:text-base xl:text-lg font-bold text-[#d4af37] leading-tight whitespace-nowrap">
                T Fight Club Championship
              </div>
            </div>
          </motion.a>

          {/* Desktop Navigation */}
          <div className="hidden xl:flex items-center gap-2 2xl:gap-6">
            {navItems.map((item) => (
              item.children ? (
                <NavDropdown key={item.label} item={item} />
              ) : (
                <a 
                  key={item.href}
                  href={item.href} 
                  className="text-white/90 hover:text-[#d4af37] transition-colors text-[11px] 2xl:text-sm font-medium relative group py-2 whitespace-nowrap px-2"
                >
                  {item.label}
                  <span className="absolute bottom-0 left-2 right-2 h-0.5 bg-[#d4af37] scale-x-0 transition-transform group-hover:scale-x-100 origin-left"></span>
                </a>
              )
            ))}
            
            {/* CTA Button */}
            <motion.a
              href="#contact"
              whileHover={{ scale: 1.05 }}
              whileTap={{ scale: 0.95 }}
              className="ml-2 px-4 2xl:px-6 py-2 2xl:py-2.5 bg-linear-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white text-[10px] 2xl:text-xs font-black rounded-lg transition-all shadow-lg shadow-[#c41e3a]/20 flex items-center gap-1.5 whitespace-nowrap uppercase tracking-wider"
            >
              Register
              <ArrowRight className="h-3 w-3 2xl:h-3.5 2xl:w-3.5" />
            </motion.a>
          </div>

          {/* Mobile Menu Button */}
          <div className="flex items-center xl:hidden">
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="text-white p-2 rounded-lg hover:bg-white/10 active:bg-white/20 transition-colors"
            >
              {mobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu Content */}
        <MobileMenu 
          isOpen={mobileMenuOpen} 
          onClose={() => setMobileMenuOpen(false)} 
          navItems={navItems}
        />
      </div>
    </nav>
  );
}
