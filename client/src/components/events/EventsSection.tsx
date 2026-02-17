import { motion } from 'motion/react';
import { Trophy } from 'lucide-react';
import { EventTypeCard } from './EventTypeCard';
import { menEvents, womenEvents } from '../../content';

// Create a mixed list combining unique events from both men and women
// Map events by their base name and use men's images as primary, women's images as alternative
const createMixedEventsList = () => {
  const eventMap = new Map();
  
  // Add men's events first
  menEvents.forEach(event => {
    const baseName = event.id.split('-')[0];
    if (!eventMap.has(baseName)) {
      eventMap.set(baseName, {
        id: baseName,
        title: event.title,
        image: event.image,
        menImage: event.image,
        womenImage: undefined,
        menEvent: event,
        womenEvent: undefined
      });
    }
  });
  
  // Add women's events and store their images
  womenEvents.forEach(event => {
    const baseName = event.id.split('-')[0];
    if (eventMap.has(baseName)) {
      const existing = eventMap.get(baseName);
      existing.womenImage = event.image;
      existing.womenEvent = event;
    } else {
      eventMap.set(baseName, {
        id: baseName,
        title: event.title,
        image: event.image,
        menImage: undefined,
        womenImage: event.image,
        menEvent: undefined,
        womenEvent: event
      });
    }
  });
  
  return Array.from(eventMap.values());
};

const eventTypes = createMixedEventsList();

export function EventsSection() {
  return (
    <section id="events" className="py-24 bg-[#0a0a0a] relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <Trophy className="w-16 h-16 text-[#d4af37] mx-auto mb-6" />
          <h2 className="text-4xl md:text-5xl font-black text-white mb-6">Championship <span className="text-[#d4af37]">Events</span></h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
            Experience the ultimate test of strength across our diverse range of strongman competitions for both men and women.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-6">
          {eventTypes.map((event, index) => (
            <EventTypeCard
              key={event.id}
              id={event.id}
              title={event.title}
              image={event.image}
              index={index}
            />
          ))}
        </div>
      </div>

      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#c41e3a]/10 blur-[120px] rounded-full -translate-y-1/2 translate-x-1/2"></div>
      <div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#d4af37]/10 blur-[120px] rounded-full translate-y-1/2 -translate-x-1/2"></div>
    </section>
  );
}
