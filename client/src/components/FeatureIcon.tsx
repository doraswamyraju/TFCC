import { motion } from 'motion/react';
import type { LucideIcon } from 'lucide-react';

interface FeatureIconProps {
  icon: LucideIcon;
  title: string;
  description: string;
  index: number;
}

export function FeatureIcon({ icon: Icon, title, description, index }: FeatureIconProps) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 20 }}
      whileInView={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      viewport={{ once: true }}
      className="flex flex-col items-center text-center"
    >
      <motion.div
        whileHover={{ scale: 1.1, rotate: 5 }}
        className="w-16 h-16 bg-gradient-to-br from-[#c41e3a] to-[#8b1526] rounded-lg flex items-center justify-center mb-4"
      >
        <Icon className="w-8 h-8 text-[#d4af37]" />
      </motion.div>
      <h4 className="font-bold text-white mb-2">{title}</h4>
      <p className="text-sm text-[#b0b0b0]">{description}</p>
    </motion.div>
  );
}
