import { motion } from 'motion/react';
import { ChevronRight } from 'lucide-react';

interface CategoryCardProps {
  title: string;
  description: string;
  index: number;
}

export function CategoryCard({ title, description, index }: CategoryCardProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      whileHover={{ scale: 1.03, y: -5 }}
      className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] p-6 rounded-lg hover:border-[#c41e3a] transition-all duration-300 cursor-pointer group"
    >
      <h3 className="mb-3 text-white group-hover:text-[#d4af37] transition-colors">{title}</h3>
      <p className="text-[#b0b0b0] mb-4 leading-relaxed">{description}</p>
      <button className="flex items-center gap-2 text-[#c41e3a] font-semibold group-hover:gap-3 transition-all">
        Register Now
        <ChevronRight className="w-5 h-5" />
      </button>
    </motion.div>
  );
}
