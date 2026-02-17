import { motion } from 'motion/react';
import { Facebook, Instagram, Twitter } from 'lucide-react';

const socialLinks = [
  {
    href: 'https://www.facebook.com/profile.php?id=61584416764591',
    label: 'Facebook',
    icon: Facebook,
  },
  {
    href: 'https://www.instagram.com/thefightclubchampionship/',
    label: 'Instagram',
    icon: Instagram,
  },
  {
    href: 'https://x.com/the_fight8446',
    label: 'X (Twitter)',
    icon: Twitter,
  },
] as const;

export function SocialFab() {
  return (
    <div
      className="fixed right-4 top-1/2 -translate-y-1/2 z-[100] flex flex-col gap-3 pointer-events-none"
      aria-label="Social links"
    >
      <div className="flex flex-col gap-3 pointer-events-auto">
        {socialLinks.map(({ href, label, icon: Icon }) => (
          <motion.a
            key={label}
            href={href}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={label}
            whileHover={{ scale: 1.1, x: -4 }}
            whileTap={{ scale: 0.95 }}
            className="flex items-center justify-center w-12 h-12 rounded-full bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#d4af37] hover:from-[#c41e3a] hover:to-[#8b1526] text-white shadow-lg shadow-black/40 transition-colors"
          >
            <Icon className="w-5 h-5" />
          </motion.a>
        ))}
      </div>
    </div>
  );
}
