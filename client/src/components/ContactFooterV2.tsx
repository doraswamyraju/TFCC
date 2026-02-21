import { motion } from 'motion/react';
import {
  Phone, Mail, Facebook, Instagram, Twitter,
  CheckCircle2, Sparkles
} from 'lucide-react';

interface ContactFooterProps {
  logo: string;
  formData: {
    name: string;
    email: string;
    phone: string;
    institution: string;
    category: string;
    message: string;
  };
  formSubmitted: boolean;
  handleFormSubmit: (e: React.FormEvent) => void;
  handleInputChange: (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => void;
}

export function ContactFooter({
  logo,
  formData,
  formSubmitted,
  handleFormSubmit,
  handleInputChange
}: ContactFooterProps) {
  return (
    <>
      {/* Contact Section */}
      <section id="contact" className="py-24 md:py-32 bg-[#050505] relative overflow-hidden">
        {/* Dynamic Background Glows */}
        <div className="absolute top-0 right-0 w-[600px] h-[600px] bg-[#c41e3a]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none translate-x-1/3 -translate-y-1/3" />
        <div className="absolute bottom-0 left-0 w-[600px] h-[600px] bg-[#d4af37]/15 blur-[150px] rounded-full mix-blend-screen pointer-events-none -translate-x-1/3 translate-y-1/3" />

        {/* Grid Texture Overlay */}
        <div className="absolute inset-0 bg-[url('https://www.transparenttextures.com/patterns/carbon-fibre.png')] opacity-10 mix-blend-overlay pointer-events-none" />

        {/* Logo Watermark */}
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 opacity-[0.02] pointer-events-none flex items-center justify-center mix-blend-screen scale-150">
          <img src={logo} alt="Fight Club Championship" loading="lazy" className="w-[800px] h-[800px] object-contain drop-shadow-[0_0_50px_rgba(255,255,255,0.5)]" />
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="text-center mb-20 relative"
          >
            <div className="absolute top-0 left-1/2 -translate-x-1/2 w-32 h-32 bg-[#d4af37]/20 blur-3xl rounded-full" />

            <h2 className="text-5xl md:text-6xl lg:text-7xl font-black mb-6 tracking-tight drop-shadow-2xl">
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Get in</span>{' '}
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37] drop-shadow-[0_0_15px_rgba(212,175,55,0.5)]">Touch</span>
            </h2>
            <p className="text-xl md:text-2xl text-gray-400 max-w-3xl mx-auto font-medium leading-relaxed drop-shadow-md">
              Ready to host a championship or register as an athlete? <span className="text-white font-bold">We're here to help.</span>
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-20 max-w-5xl mx-auto">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, x: -30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative group bg-zinc-900/40 backdrop-blur-xl border border-[#d4af37]/30 hover:border-[#ffd700] p-10 rounded-3xl transition-all shadow-[0_0_30px_rgba(212,175,55,0.05)] hover:shadow-[0_0_40px_rgba(212,175,55,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#ffd700]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#c41e3a] to-[#8b1526] flex items-center justify-center shadow-[0_0_20px_rgba(196,30,58,0.4)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <Mail className="w-8 h-8 text-[#ffd700] drop-shadow-[0_0_10px_rgba(255,215,0,0.5)]" />
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl mb-2">Email Us</h4>
                  <p className="text-gray-400 font-medium mb-4">Official Enquiries & Support</p>
                  <a href="mailto:thefightclubchampionship@gmail.com" className="block text-[#ffd700] hover:text-white font-bold text-lg md:text-xl transition-colors underline decoration-dashed underline-offset-4 overflow-hidden text-ellipsis">
                    thefightclubchampionship@gmail.com
                  </a>
                </div>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true, margin: '-100px' }}
              className="relative group bg-zinc-900/40 backdrop-blur-xl border border-[#c41e3a]/30 hover:border-[#ff4d6d] p-10 rounded-3xl transition-all shadow-[0_0_30px_rgba(196,30,58,0.05)] hover:shadow-[0_0_40px_rgba(196,30,58,0.15)] overflow-hidden"
            >
              <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />

              <div className="relative z-10 flex items-start gap-6">
                <div className="w-16 h-16 rounded-2xl bg-gradient-to-br from-[#d4af37] to-[#b8941f] flex items-center justify-center shadow-[0_0_20px_rgba(212,175,55,0.4)] group-hover:scale-110 transition-transform duration-500 shrink-0">
                  <Phone className="w-8 h-8 text-black drop-shadow-[0_0_5px_rgba(0,0,0,0.5)]" />
                </div>
                <div>
                  <h4 className="text-white font-black text-2xl mb-2">Call / WhatsApp</h4>
                  <p className="text-gray-400 font-medium mb-4">Mon-Sat, 9AM-6PM</p>
                  <a href="tel:+919876543210" className="block text-[#ff4d6d] hover:text-white font-black text-2xl md:text-3xl transition-colors mb-2">
                    +91 98765 43210
                  </a>
                  <a href="tel:+919876543211" className="block text-gray-400 hover:text-white transition-colors text-sm font-medium">
                    +91 98765 43211 <span className="text-[#ffd700]">(Athlete Support)</span>
                  </a>
                </div>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, margin: '-100px' }}
            className="max-w-4xl mx-auto mb-24 relative group"
          >
            {/* Animated Gradient Border */}
            <div className="absolute -inset-1 rounded-3xl bg-gradient-to-r from-[#d4af37] via-[#c41e3a] to-[#d4af37] opacity-60 blur-xl group-hover:opacity-100 transition duration-1000 group-hover:duration-200" />

            <div className="relative bg-black/80 backdrop-blur-2xl border border-white/20 rounded-3xl p-10 md:p-14 shadow-2xl">
              <div className="text-center mb-10">
                <div className="inline-flex items-center justify-center p-4 bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border border-[#d4af37]/30 rounded-[2rem] shadow-[0_0_30px_rgba(212,175,55,0.2)] mb-8">
                  <Sparkles className="w-10 h-10 text-[#ffd700] drop-shadow-[0_0_15px_rgba(255,215,0,0.5)]" />
                </div>
                <h3 className="text-3xl md:text-4xl font-black text-white mb-4">Enquire About <span className="text-transparent bg-clip-text bg-gradient-to-r from-[#ffd700] to-[#d4af37]">Competition</span></h3>
                <p className="text-gray-400 font-medium text-lg max-w-lg mx-auto">
                  Fill out the form below and our team will get back to you within 24 hours
                </p>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ scale: 0.9, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-white/5 border border-[#ffd700]/30 rounded-2xl p-10 text-center relative overflow-hidden"
                >
                  <div className="absolute inset-0 bg-gradient-to-br from-[#c41e3a]/10 to-[#ffd700]/10" />
                  <div className="relative z-10 w-24 h-24 rounded-full bg-gradient-to-br from-[#ffd700] to-[#c41e3a] flex items-center justify-center mx-auto mb-6 shadow-[0_0_30px_rgba(212,175,55,0.5)]">
                    <CheckCircle2 className="w-12 h-12 text-white" />
                  </div>
                  <h4 className="text-white font-black text-3xl mb-4">Message Sent!</h4>
                  <p className="text-gray-300 text-lg font-medium">Your enquiry has been successfully delivered. We'll be in touch soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-8">
                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="name" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                        Full Name <span className="text-[#c41e3a]">*</span>
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white placeholder-gray-600 transition-colors outline-none shadow-inner"
                        placeholder="John Doe"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                        Email Address <span className="text-[#c41e3a]">*</span>
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white placeholder-gray-600 transition-colors outline-none shadow-inner"
                        placeholder="john@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-8">
                    <div>
                      <label htmlFor="phone" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                        Phone Number <span className="text-[#c41e3a]">*</span>
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white placeholder-gray-600 transition-colors outline-none shadow-inner"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label htmlFor="institution" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                        University / College
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white placeholder-gray-600 transition-colors outline-none shadow-inner"
                        placeholder="Institution Name (Optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                      I am interested as <span className="text-[#c41e3a]">*</span>
                    </label>
                    <div className="relative">
                      <select
                        id="category"
                        name="category"
                        required
                        value={formData.category}
                        onChange={handleInputChange}
                        className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white transition-colors outline-none shadow-inner appearance-none"
                      >
                        <option value="" disabled>Select category</option>
                        <option value="university">University / College (Host)</option>
                        <option value="athlete">Athlete / Participant</option>
                        <option value="sponsor">Sponsor / Partner</option>
                        <option value="media">Media / Press</option>
                        <option value="other">Other</option>
                      </select>
                      {/* Custom select arrow */}
                      <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-4 text-[#ffd700]">
                        <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-bold mb-3 text-sm uppercase tracking-widest">
                      Your Message <span className="text-[#c41e3a]">*</span>
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-black border-2 border-[#2a2a2a] focus:border-[#ffd700] rounded-xl px-5 py-4 text-white placeholder-gray-600 transition-colors outline-none resize-none shadow-inner"
                      placeholder="Tell us how we can help you..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#ff4d6d] hover:to-[#c41e3a] text-white px-8 py-5 rounded-xl font-black text-xl transition-all shadow-[0_0_30px_rgba(196,30,58,0.5)] hover:shadow-[0_0_40px_rgba(196,30,58,0.7)] uppercase tracking-widest"
                  >
                    Send Message
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="mb-8 text-white font-black text-2xl uppercase tracking-widest drop-shadow-[0_0_10px_rgba(255,255,255,0.3)]">Join the Community</h3>
            <div className="flex justify-center gap-6">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61584416764591"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#ffd700] blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative bg-[#1a1a1a] border border-[#ffd700]/30 p-5 rounded-2xl transition-all shadow-xl group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] block">
                  <Facebook className="w-8 h-8 text-[#ffd700]" />
                </div>
              </motion.a>
              <motion.a
                href="https://www.instagram.com/thefightclubchampionship/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#c41e3a] blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative bg-[#1a1a1a] border border-[#c41e3a]/30 p-5 rounded-2xl transition-all shadow-xl group-hover:shadow-[0_0_20px_rgba(196,30,58,0.4)] block">
                  <Instagram className="w-8 h-8 text-[#ff4d6d]" />
                </div>
              </motion.a>
              <motion.a
                href="https://x.com/the_fight8446"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.15, y: -5 }}
                className="group relative"
              >
                <div className="absolute inset-0 bg-[#ffd700] blur-md opacity-40 group-hover:opacity-100 transition-opacity rounded-2xl" />
                <div className="relative bg-[#1a1a1a] border border-[#ffd700]/30 p-5 rounded-2xl transition-all shadow-xl group-hover:shadow-[0_0_20px_rgba(212,175,55,0.4)] block">
                  <Twitter className="w-8 h-8 text-[#ffd700]" />
                </div>
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-[#020202] border-t-4 border-[#c41e3a] relative overflow-hidden">
        {/* Subtle glow on top edge */}
        <div className="absolute top-0 left-1/4 right-1/4 h-px bg-gradient-to-r from-transparent via-[#ffd700] to-transparent shadow-[0_0_20px_#ffd700]" />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <div className="grid md:grid-cols-4 gap-12 border-b border-white/10 pb-12 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-4 mb-6">
                <div className="bg-white/5 p-2 rounded-xl backdrop-blur-md border border-white/10">
                  <img src={logo} alt="FCC Logo" className="h-[70px] w-auto drop-shadow-md" />
                </div>
                <div>
                  <div className="text-2xl font-black text-white leading-tight">THE FIGHT CLUB</div>
                  <div className="text-sm font-bold text-[#ffd700] tracking-widest uppercase mt-1">Championship</div>
                </div>
              </div>
              <p className="text-gray-400 font-medium text-base max-w-md mb-8 leading-relaxed">
                India's premier university strength championship, building the next generation of elite athletes through professional strongman competitions on campuses nationwide.
              </p>
              <div className="flex gap-4">
                <a
                  href="https://www.facebook.com/profile.php?id=61584416764591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ffd700] p-3 rounded-full transition-all text-gray-400 hover:text-[#ffd700]"
                >
                  <Facebook className="w-5 h-5" />
                </a>
                <a
                  href="https://www.instagram.com/thefightclubchampionship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#c41e3a] p-3 rounded-full transition-all text-gray-400 hover:text-[#ff4d6d]"
                >
                  <Instagram className="w-5 h-5" />
                </a>
                <a
                  href="https://x.com/the_fight8446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-white/5 hover:bg-white/10 border border-white/10 hover:border-[#ffd700] p-3 rounded-full transition-all text-gray-400 hover:text-[#ffd700]"
                >
                  <Twitter className="w-5 h-5" />
                </a>
              </div>
            </div>

            {/* Navigation */}
            <div>
              <h4 className="text-white font-black mb-6 text-lg uppercase tracking-wider">Explore</h4>
              <ul className="space-y-4 font-medium text-sm">
                <li><a href="#home" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Home</a></li>
                <li><a href="#strongest-human" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Strongest Human</a></li>
                <li><a href="#university" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Universities</a></li>
                <li><a href="#vision" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Roadmap</a></li>
                <li><a href="#governance" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Governance</a></li>
                <li><a href="#contact" className="text-gray-400 hover:text-[#ffd700] transition-colors flex items-center gap-3"><span className="w-1.5 h-1.5 rounded-full bg-[#c41e3a]" /> Contact</a></li>
              </ul>
            </div>

            {/* Quick Contact */}
            <div>
              <h4 className="text-white font-black mb-6 text-lg uppercase tracking-wider">Contact Info</h4>
              <ul className="space-y-6">
                <li className="flex items-start gap-4">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 shrink-0 mt-1">
                    <Mail className="w-5 h-5 text-[#ffd700]" />
                  </div>
                  <div>
                    <span className="block text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Email Us</span>
                    <a href="mailto:thefightclubchampionship@gmail.com" className="text-gray-300 hover:text-white transition-colors text-sm break-all font-medium">
                      thefightclubchampionship<br />@gmail.com
                    </a>
                  </div>
                </li>
                <li className="flex items-start gap-4">
                  <div className="bg-white/5 p-2 rounded-lg border border-white/10 shrink-0 mt-1">
                    <Phone className="w-5 h-5 text-[#c41e3a]" />
                  </div>
                  <div>
                    <span className="block text-gray-500 font-bold text-xs uppercase tracking-widest mb-1">Call Us</span>
                    <a href="tel:+919876543210" className="block text-gray-300 hover:text-white transition-colors text-sm font-medium">
                      +91 98765 43210
                    </a>
                  </div>
                </li>
              </ul>
            </div>
          </div>

          {/* Copyright Area */}
          <div className="flex flex-col md:flex-row justify-between items-center gap-6 font-medium">
            <p className="text-gray-500 text-sm">
              © {new Date().getFullYear()} <span className="text-gray-300 font-bold">Fight Club Championship Pvt. Ltd.</span> All rights reserved.
            </p>
            <div className="flex flex-wrap justify-center gap-6 md:gap-8">
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Privacy Policy</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Terms of Service</a>
              <a href="#" className="text-gray-500 hover:text-white transition-colors text-sm">Code of Conduct</a>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
