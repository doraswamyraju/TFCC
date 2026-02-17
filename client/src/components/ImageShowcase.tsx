import { motion } from 'motion/react';
import { ImageWithFallback } from './figma/ImangeWithFallback';

const showcaseImages = [
  { url: 'https://images.unsplash.com/photo-1541534741688-6078c6bfb5c5?auto=format&fit=crop&q=80&w=800', title: 'Women Event' },
  { url: 'https://images.unsplash.com/photo-1567598508481-65985588e295?auto=format&fit=crop&q=80&w=800', title: 'Event 1' },
  { url: 'https://images.unsplash.com/photo-1599058917233-3583e7172fe4?auto=format&fit=crop&q=80&w=800', title: 'Event 2' },
  { url: 'https://images.unsplash.com/photo-1598971639058-aba3c3933276?auto=format&fit=crop&q=80&w=800', title: 'Event 3' },
  { url: 'https://images.unsplash.com/photo-1581009146145-b5ef050c2e1e?auto=format&fit=crop&q=80&w=800', title: 'Event 4' },
  { url: 'https://images.unsplash.com/photo-1571902251103-997c6458fb3a?auto=format&fit=crop&q=80&w=800', title: 'Event 5' },
];

export function ImageShowcase() {
  return (
    <section className="py-24 bg-black overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, margin: "-100px" }}
          className="text-center mb-16"
        >
          <h2 className="text-3xl md:text-5xl font-black text-white mb-6">Championship <span className="text-[#c41e3a]">Showcase</span></h2>
          <p className="text-[#808080] text-lg max-w-2xl mx-auto">
            Witness the intensity and spirit of our competitions through our visual gallery.
          </p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {showcaseImages.map((image, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, scale: 0.9 }}
              whileInView={{ opacity: 1, scale: 1 }}
              viewport={{ once: true, margin: "-100px" }}
              transition={{ delay: index * 0.1 }}
              className="relative group aspect-square overflow-hidden rounded-2xl border-2 border-[#1a1a1a] hover:border-[#c41e3a] transition-all"
            >
              <ImageWithFallback
                src={image.url}
                alt={image.title}
                className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-700"
              />
              <div className="absolute inset-0 bg-linear-to-t from-black/80 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-end p-6">
                <h4 className="text-white font-bold text-lg">{image.title}</h4>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
