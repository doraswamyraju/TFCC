import { motion } from 'motion/react';
import { Calendar, MapPin, Users } from 'lucide-react';

interface EventCardProps {
  date: string;
  city: string;
  venue: string;
  participants: string;
  featured?: boolean;
  index: number;
}

export function EventCard({ date, city, venue, participants, featured, index }: EventCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, x: -20 }}
      whileInView={{ opacity: 1, x: 0 }}
      transition={{ delay: index * 0.15 }}
      viewport={{ once: true }}
      className={`relative overflow-hidden rounded-lg border-2 p-6 transition-all duration-300 ${
        featured
          ? 'bg-gradient-to-br from-[#c41e3a] to-[#8b1526] border-[#d4af37] shadow-lg shadow-[#c41e3a]/20'
          : 'bg-[#1a1a1a] border-[#2a2a2a] hover:border-[#c41e3a]'
      }`}
    >
      {featured && (
        <div className="absolute top-4 right-4 bg-[#d4af37] text-black px-3 py-1 rounded-full text-xs font-bold">
          NEXT EVENT
        </div>
      )}
      
      <div className="flex items-center gap-3 mb-4">
        <div className="p-3 bg-black/30 rounded-lg">
          <Calendar className="w-6 h-6 text-[#d4af37]" />
        </div>
        <div>
          <p className="text-sm text-[#b0b0b0]">Event Date</p>
          <p className="text-white font-bold">{date}</p>
        </div>
      </div>

      <div className="space-y-3 mb-6">
        <div className="flex items-center gap-3">
          <MapPin className="w-5 h-5 text-[#c41e3a]" />
          <div>
            <p className="text-white font-semibold">{city}</p>
            <p className="text-sm text-[#b0b0b0]">{venue}</p>
          </div>
        </div>
        
        <div className="flex items-center gap-3">
          <Users className="w-5 h-5 text-[#c41e3a]" />
          <p className="text-[#b0b0b0]">{participants}</p>
        </div>
      </div>

      <button className="w-full py-3 bg-[#c41e3a] hover:bg-[#d4af37] hover:text-black text-white font-bold rounded-lg transition-all duration-300 transform hover:scale-105">
        REGISTER FOR THIS EVENT
      </button>
    </motion.div>
  );
}
