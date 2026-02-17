import { motion } from 'motion/react';
import { User } from 'lucide-react';

interface CoachCardProps {
  name: string;
  sport: string;
  experience: string;
  credentials: string;
  image?: string;
  index: number;
}

export function CoachCard({ name, sport, experience, credentials, image, index }: CoachCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.9 }}
      whileInView={{ opacity: 1, scale: 1 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ y: -10 }}
      className="bg-gradient-to-b from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] p-6 rounded-lg hover:border-[#d4af37] transition-all duration-300"
    >
      {/* Coach Image or Icon */}
      <div className="flex items-center justify-center w-20 h-20 bg-gradient-to-br from-[#c41e3a] to-[#8b1526] rounded-full mb-4 mx-auto overflow-hidden">
        {image ? (
          <img 
            src={image} 
            alt={name}
            className="w-full h-full object-cover"
            loading="lazy"
          />
        ) : (
          <User className="w-10 h-10 text-[#d4af37]" />
        )}
      </div>
      
      <h3 className="text-center mb-2 text-white">{name}</h3>
      <p className="text-center text-[#d4af37] font-semibold mb-3">{sport}</p>
      
      <div className="space-y-2 text-center">
        <p className="text-sm text-[#b0b0b0]">
          <span className="font-semibold text-white">{experience}</span> of experience
        </p>
        <p className="text-xs text-[#808080] leading-relaxed">{credentials}</p>
      </div>
    </motion.div>
  );
}
