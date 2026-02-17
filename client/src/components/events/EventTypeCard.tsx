import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface EventTypeCardProps {
  id: string;
  title: string;
  image: string;
  index: number;
}

export function EventTypeCard({ id, title, image, index }: EventTypeCardProps) {
  return (
    <motion.a
      href={`#events-${id}`}
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, margin: "-100px" }}
      transition={{ delay: index * 0.1 }}
      whileHover={{ y: -4, scale: 1.02 }}
      whileTap={{ scale: 0.98 }}
      className="group bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl overflow-hidden border-2 border-[#2a2a2a] hover:border-[#d4af37] transition-all shadow-lg hover:shadow-xl hover:shadow-[#d4af37]/20"
    >
      <div className="relative h-48 sm:h-56 overflow-hidden">
        <img 
          src={image} 
          alt={title}
          loading="lazy"
          className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
        />
        <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/40 to-transparent"></div>
        <div className="absolute bottom-4 left-4 right-4">
          <h4 className="text-white font-bold text-lg mb-1">{title}</h4>
          <p className="text-[#d4af37] text-sm flex items-center gap-2">
            View Details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </p>
        </div>
      </div>
    </motion.a>
  );
}
