import { motion } from 'motion/react';
import { Calendar, Clock, MapPin, Sparkles } from 'lucide-react';

const upcomingEvents = [
  {
    id: 1,
    title: 'Strongest Women Competition',
    date: 'March 15, 2025',
    time: '9:00 AM - 6:00 PM',
    venue: 'National Sports Complex, Hyderabad',
    categories: ['woman'],
  },
  {
    id: 2,
    title: 'Strongest Men Competition',
    date: 'March 15, 2025',
    time: '9:00 AM - 6:00 PM',
    venue: 'National Sports Complex, Hyderabad',
    categories: ['man'],
  },
];

export function UpcomingEvents() {
  return (
    <section id="upcoming-events" className="py-20 bg-gradient-to-b from-[#0a0a0a] via-[#1a1a1a] to-[#0a0a0a] relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 left-1/2 -translate-x-1/2 w-[800px] h-[400px] bg-[#d4af37]/10 blur-[150px] rounded-full" />
      <div className="absolute bottom-0 right-0 w-[600px] h-[300px] bg-[#c41e3a]/10 blur-[120px] rounded-full" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-16"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37]/20 to-[#c41e3a]/20 border-2 border-[#d4af37] px-6 py-2 rounded-full mb-6"
          >
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-[#d4af37] font-bold text-sm uppercase tracking-wider">
              Don't Miss Out
            </span>
          </motion.div>

          <h2 className="text-4xl md:text-5xl lg:text-6xl font-black text-white mb-6">
            Upcoming <span className="text-[#d4af37]">Events</span>
          </h2>
          <p className="text-lg text-[#b0b0b0] max-w-3xl mx-auto">
            Mark your calendar and join us for India's most prestigious strength sports competitions
          </p>
        </motion.div>

        {/* Events Grid - centered */}
        <div className="flex flex-wrap justify-center gap-6">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15 }}
              className="relative group w-full max-w-[400px]"
            >
              <div className="relative bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-2xl overflow-hidden border-2 border-[#2a2a2a] hover:border-[#d4af37]/50 transition-all duration-300 p-6">
                {/* Content */}
                <h3 className="font-black text-white mb-3 text-xl md:text-2xl">
                  {event.title}
                </h3>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-2 mb-6">
                  {event.categories.map((category) => (
                    <span
                      key={category}
                      className={`inline-flex items-center px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider ${
                        category === 'woman'
                          ? 'bg-[#c41e3a]/20 text-[#c41e3a] border border-[#c41e3a]/30'
                          : 'bg-[#d4af37]/20 text-[#d4af37] border border-[#d4af37]/30'
                      }`}
                    >
                      {category === 'woman' ? 'Strongest Woman' : 'Strongest Man'}
                    </span>
                  ))}
                </div>

                <div className="space-y-4">
                  {/* Date */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center">
                      <Calendar className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-[#808080] text-xs font-semibold uppercase tracking-wider mb-1">
                        Date
                      </p>
                      <p className="text-white font-bold">{event.date}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-[#c41e3a]/20 rounded-lg flex items-center justify-center">
                      <Clock className="w-5 h-5 text-[#c41e3a]" />
                    </div>
                    <div>
                      <p className="text-[#808080] text-xs font-semibold uppercase tracking-wider mb-1">
                        Time
                      </p>
                      <p className="text-white font-bold">{event.time}</p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-start gap-3">
                    <div className="shrink-0 w-10 h-10 bg-[#d4af37]/20 rounded-lg flex items-center justify-center">
                      <MapPin className="w-5 h-5 text-[#d4af37]" />
                    </div>
                    <div>
                      <p className="text-[#808080] text-xs font-semibold uppercase tracking-wider mb-1">
                        Venue
                      </p>
                      <p className="text-white font-bold">{event.venue}</p>
                    </div>
                  </div>
                </div>

                {/* Decorative corner glow */}
                <div className="absolute -top-20 -right-20 w-40 h-40 bg-[#d4af37]/10 blur-[60px] rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
