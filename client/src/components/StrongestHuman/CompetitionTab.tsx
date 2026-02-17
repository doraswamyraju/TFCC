import { ChevronRight } from 'lucide-react';

interface CompetitionTabProps {
  type: 'man' | 'woman';
  events: any[];
  onSelectEvent: (index: number) => void;
}

export function CompetitionTab({ type, events, onSelectEvent }: CompetitionTabProps) {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
      {events.map((event, index) => (
        <button
          type="button"
          key={event.id}
          onClick={() => onSelectEvent(index)}
          className="group cursor-pointer text-left bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] rounded-xl overflow-hidden border-2 border-[#2a2a2a] md:hover:border-[#d4af37] active:border-[#c41e3a] transition-colors shadow-lg md:hover:shadow-xl md:hover:shadow-[#d4af37]/20 hover:-translate-y-0.5 active:scale-[0.99]"
        >
          <div className="relative h-56 sm:h-64 overflow-hidden">
            <img
              src={event.image}
              alt={event.title}
              loading="lazy"
              decoding="async"
              className="w-full h-full object-cover md:group-hover:scale-105 transition-transform duration-300"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/90 via-black/50 to-transparent" />
            <div className="absolute bottom-4 left-4 right-4">
              <span className="inline-block bg-[#c41e3a] text-white text-xs font-bold px-2 py-0.5 rounded mb-2">
                {type === 'man' ? 'Men' : 'Women'} - Event {index + 1}
              </span>
              <h4 className="text-white font-bold text-lg sm:text-xl mb-1.5">{event.title}</h4>
              <p className="text-[#d4af37] text-sm flex items-center gap-2 group-hover:gap-3 transition-all">
                Tap for details <ChevronRight className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
              </p>
            </div>
          </div>
        </button>
      ))}
    </div>
  );
}
