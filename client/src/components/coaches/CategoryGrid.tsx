import { motion } from 'motion/react';
import { CoachCard } from '../CoachCard';

interface CategoryGridProps {
  items: any[];
  type: 'athlete' | 'coach' | 'gym';
}

export function CategoryGrid({ items, type }: CategoryGridProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
      {items.map((item, index) => (
        <div key={index} className="flex justify-center">
          {type === 'gym' ? (
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: index * 0.1 }}
              className="w-full bg-[#1a1a1a] border-2 border-[#2a2a2a] rounded-xl overflow-hidden hover:border-[#d4af37] transition-all group"
            >
              <div className="h-48 overflow-hidden">
                <img 
                  src={item.image || 'https://images.unsplash.com/photo-1534438327276-14e5300c3a48?w=800&q=80'} 
                  alt={item.name} 
                  className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                />
              </div>
              <div className="p-6">
                <h4 className="text-white font-bold text-xl mb-2">{item.name}</h4>
                <p className="text-[#808080] text-sm mb-4">{item.location}</p>
                <div className="flex flex-wrap gap-2">
                  {item.facilities.map((fac: string, i: number) => (
                    <span key={i} className="text-[10px] uppercase font-bold px-2 py-1 bg-white/5 text-[#b0b0b0] rounded">
                      {fac}
                    </span>
                  ))}
                </div>
              </div>
            </motion.div>
          ) : (
            <CoachCard
              name={item.name}
              sport={item.sport || item.specialty}
              experience={item.experience}
              credentials={item.credentials || item.achievements}
              image={item.image}
              index={index}
            />
          )}
        </div>
      ))}
    </div>
  );
}
