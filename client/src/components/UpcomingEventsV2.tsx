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
    accent: 'from-[#ffd700] to-[#c41e3a]'
  },
  {
    id: 2,
    title: 'Strongest Men Competition',
    date: 'March 15, 2025',
    time: '9:00 AM - 6:00 PM',
    venue: 'National Sports Complex, Hyderabad',
    categories: ['man'],
    accent: 'from-[#c41e3a] to-[#ffd700]'
  },
];

export function UpcomingEvents() {
  return (
    <section id="upcoming-events" className="py-24 bg-[#050505] relative overflow-hidden">
      {/* Background Deep Accents */}
      <div className="absolute top-0 left-0 w-[500px] h-[500px] bg-[#c41e3a]/20 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute bottom-0 right-0 w-[500px] h-[500px] bg-[#ffd700]/15 blur-[150px] rounded-full pointer-events-none" />
      <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 pointer-events-none" />

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
        {/* Section Header */}
        <motion.div
          initial={{ opacity: 0, y: 30 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: '-100px' }}
          className="text-center mb-20"
        >
          <motion.div
            initial={{ scale: 0 }}
            whileInView={{ scale: 1 }}
            viewport={{ once: true }}
            transition={{ type: 'spring', duration: 0.6 }}
            className="inline-flex items-center gap-2 bg-gradient-to-r from-[#d4af37]/20 to-[#c41e3a]/20 border border-[#d4af37]/50 shadow-[0_0_20px_rgba(212,175,55,0.3)] px-6 py-2 rounded-full mb-6 backdrop-blur-md"
          >
            <Sparkles className="w-5 h-5 text-[#d4af37]" />
            <span className="text-white font-black text-sm uppercase tracking-widest text-shadow-sm">
              Don't Miss Out
            </span>
          </motion.div>

          <h2 className="text-5xl md:text-6xl lg:text-7xl font-black text-white mb-6 tracking-tight drop-shadow-[0_0_15px_rgba(255,255,255,0.2)]">
            Upcoming <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#c41e3a]">Events</span>
          </h2>
          <p className="text-xl md:text-2xl text-gray-300 max-w-3xl mx-auto font-medium">
            Mark your calendar and join us for India's most prestigious strength sports competitions
          </p>
        </motion.div>

        {/* Events Grid - centered */}
        <div className="flex flex-wrap justify-center gap-8 md:gap-12">
          {upcomingEvents.map((event, index) => (
            <motion.div
              key={event.id}
              initial={{ opacity: 0, scale: 0.95, y: 30 }}
              whileInView={{ opacity: 1, scale: 1, y: 0 }}
              viewport={{ once: true, margin: '-50px' }}
              transition={{ delay: index * 0.15, type: 'spring', stiffness: 100 }}
              className="group relative w-full w-[450px]"
            >
              {/* Glowing Border Background */}
              <div className={`absolute -inset-1 bg-gradient-to-r ${event.accent} rounded-[2rem] blur opacity-30 group-hover:opacity-100 transition duration-500`}></div>

              {/* Card Content Surface */}
              <div className="relative h-full bg-zinc-900/80 backdrop-blur-xl rounded-[2rem] overflow-hidden border border-white/10 p-8 sm:p-10 transition-transform duration-500 group-hover:-translate-y-2">

                {/* Content Header */}
                <h3 className="font-black text-white mb-4 text-3xl md:text-4xl leading-tight">
                  {event.title}
                </h3>

                {/* Category Tags */}
                <div className="flex flex-wrap gap-3 mb-8">
                  {event.categories.map((category) => (
                    <span
                      key={category}
                      className={`inline-flex items-center px-4 py-1.5 rounded-full text-sm font-black uppercase tracking-widest shadow-lg ${category === 'woman'
                          ? 'bg-gradient-to-r from-[#c41e3a] to-[#8b1526] text-white shadow-[#c41e3a]/40'
                          : 'bg-gradient-to-r from-[#d4af37] to-[#b8860b] text-white shadow-[#d4af37]/40'
                        }`}
                    >
                      {category === 'woman' ? 'Strongest Woman' : 'Strongest Man'}
                    </span>
                  ))}
                </div>

                <div className="space-y-6">
                  {/* Date */}
                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 group-hover:bg-white/5 transition-colors">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/30">
                      <Calendar className="w-6 h-6 text-[#ffd700]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-0.5">
                        Date
                      </p>
                      <p className="text-white font-bold text-lg">{event.date}</p>
                    </div>
                  </div>

                  {/* Time */}
                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 group-hover:bg-white/5 transition-colors">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#c41e3a]/30 to-[#c41e3a]/10 rounded-xl flex items-center justify-center border border-[#c41e3a]/30">
                      <Clock className="w-6 h-6 text-[#ff4d6d]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-0.5">
                        Time
                      </p>
                      <p className="text-white font-bold text-lg">{event.time}</p>
                    </div>
                  </div>

                  {/* Venue */}
                  <div className="flex items-center gap-4 bg-black/40 p-4 rounded-xl border border-white/5 group-hover:bg-white/5 transition-colors">
                    <div className="shrink-0 w-12 h-12 bg-gradient-to-br from-[#d4af37]/30 to-[#d4af37]/10 rounded-xl flex items-center justify-center border border-[#d4af37]/30">
                      <MapPin className="w-6 h-6 text-[#ffd700]" />
                    </div>
                    <div>
                      <p className="text-gray-400 text-sm font-bold uppercase tracking-wider mb-0.5">
                        Venue
                      </p>
                      <p className="text-white font-bold text-lg">{event.venue}</p>
                    </div>
                  </div>
                </div>

              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
