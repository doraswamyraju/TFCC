import { motion } from 'motion/react';
import { 
  Phone, Mail, Facebook, Instagram, Twitter, 
  CheckCircle2
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
      <section id="contact" className="py-20 bg-gradient-to-b from-[#0a0a0a] to-[#1a1a1a] relative overflow-hidden">
        {/* Logo Watermark - Mobile Only (No Glows) */}
        <div className="absolute bottom-0 left-1/2 -translate-x-1/2 opacity-[0.08] md:opacity-[0.03] pointer-events-none flex items-center justify-center">
          <img src={logo} alt="Fight Club Championship Logo Watermark" loading="lazy" className="w-[350px] h-[350px] sm:w-[450px] sm:h-[450px] md:w-[600px] md:h-[600px] object-contain" />
        </div>

        {/* Animated Energy */}
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            opacity: [0.1, 0.2, 0.1],
          }}
          transition={{
            duration: 7,
            repeat: Infinity,
            ease: "easeInOut"
          }}
          className="absolute top-0 left-0 w-96 h-96 bg-[#c41e3a] rounded-full blur-[150px] pointer-events-none"
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            opacity: [0.08, 0.18, 0.08],
          }}
          transition={{
            duration: 8,
            repeat: Infinity,
            ease: "easeInOut",
            delay: 1
          }}
          className="absolute bottom-0 right-0 w-96 h-96 bg-[#d4af37] rounded-full blur-[150px] pointer-events-none"
        />
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-16"
          >
            <h2 className="mb-6 text-[#d4af37]">Get in Touch</h2>
            <p className="text-lg text-[#b0b0b0] max-w-2xl mx-auto">
              Ready to host a championship or register as an athlete? We're here to help.
            </p>
          </motion.div>

          {/* Contact Cards */}
          <div className="grid md:grid-cols-2 gap-8 mb-16">
            {/* Email */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-8 rounded-xl transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b1526] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Mail className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Email Us</h4>
                  <p className="text-[#808080] text-sm">24/7 Support</p>
                </div>
              </div>
              <div className="space-y-2">
                <a href="mailto:thefightclubchampionship@gmail.com" className="block text-[#b0b0b0] hover:text-[#d4af37] transition-colors">
                  thefightclubchampionship@gmail.com
                </a>
              </div>
            </motion.div>

            {/* Phone */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
              transition={{ delay: 0.1 }}
              className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#2a2a2a] hover:border-[#c41e3a] p-8 rounded-xl transition-all group"
            >
              <div className="flex items-start gap-4 mb-4">
                <div className="bg-gradient-to-br from-[#c41e3a] to-[#8b1526] p-3 rounded-lg group-hover:scale-110 transition-transform">
                  <Phone className="w-6 h-6 text-white" />
                </div>
                <div>
                  <h4 className="text-white font-bold mb-1">Call / WhatsApp</h4>
                  <p className="text-[#808080] text-sm">Mon-Sat, 9AM-6PM</p>
                </div>
              </div>
              <div className="space-y-2">
                <a href="tel:+919876543210" className="block text-[#b0b0b0] hover:text-[#d4af37] transition-colors">
                  +91 98765 43210
                </a>
                <a href="tel:+919876543211" className="block text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm">
                  +91 98765 43211 (Athlete Support)
                </a>
              </div>
            </motion.div>
          </div>

          {/* Contact Form */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="max-w-4xl mx-auto mb-16"
          >
            <div className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] border-2 border-[#d4af37] rounded-xl p-8 md:p-12">
              <div className="text-center mb-8">
                <h3 className="mb-4 text-[#d4af37]">Enquire About Competition</h3>
                <p className="text-[#b0b0b0]">
                  Fill out the form below and we'll get back to you within 24 hours
                </p>
              </div>

              {formSubmitted ? (
                <motion.div
                  initial={{ scale: 0.8, opacity: 0 }}
                  animate={{ scale: 1, opacity: 1 }}
                  className="bg-gradient-to-r from-[#d4af37]/20 to-[#c41e3a]/20 border-2 border-[#d4af37] rounded-lg p-8 text-center"
                >
                  <div className="bg-gradient-to-br from-[#d4af37] to-[#b8941f] w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-4">
                    <CheckCircle2 className="w-10 h-10 text-black" />
                  </div>
                  <h4 className="text-white font-bold text-2xl mb-2">Thank You!</h4>
                  <p className="text-[#b0b0b0]">Your enquiry has been submitted successfully. We'll be in touch soon!</p>
                </motion.div>
              ) : (
                <form onSubmit={handleFormSubmit} className="space-y-6">
                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="name" className="block text-white font-bold mb-2 text-sm">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        id="name"
                        name="name"
                        required
                        value={formData.name}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white placeholder-[#808080] transition-colors outline-none"
                        placeholder="Enter your full name"
                      />
                    </div>

                    <div>
                      <label htmlFor="email" className="block text-white font-bold mb-2 text-sm">
                        Email Address *
                      </label>
                      <input
                        type="email"
                        id="email"
                        name="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white placeholder-[#808080] transition-colors outline-none"
                        placeholder="your.email@example.com"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-6">
                    <div>
                      <label htmlFor="phone" className="block text-white font-bold mb-2 text-sm">
                        Phone Number *
                      </label>
                      <input
                        type="tel"
                        id="phone"
                        name="phone"
                        required
                        value={formData.phone}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white placeholder-[#808080] transition-colors outline-none"
                        placeholder="+91 98765 43210"
                      />
                    </div>

                    <div>
                      <label htmlFor="institution" className="block text-white font-bold mb-2 text-sm">
                        University / College
                      </label>
                      <input
                        type="text"
                        id="institution"
                        name="institution"
                        value={formData.institution}
                        onChange={handleInputChange}
                        className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white placeholder-[#808080] transition-colors outline-none"
                        placeholder="Institution name (optional)"
                      />
                    </div>
                  </div>

                  <div>
                    <label htmlFor="category" className="block text-white font-bold mb-2 text-sm">
                      I am interested as *
                    </label>
                    <select
                      id="category"
                      name="category"
                      required
                      value={formData.category}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white transition-colors outline-none"
                    >
                      <option value="">Select category</option>
                      <option value="university">University / College (Host)</option>
                      <option value="athlete">Athlete / Participant</option>
                      <option value="sponsor">Sponsor / Partner</option>
                      <option value="media">Media / Press</option>
                      <option value="other">Other</option>
                    </select>
                  </div>

                  <div>
                    <label htmlFor="message" className="block text-white font-bold mb-2 text-sm">
                      Message *
                    </label>
                    <textarea
                      id="message"
                      name="message"
                      required
                      rows={5}
                      value={formData.message}
                      onChange={handleInputChange}
                      className="w-full bg-[#0a0a0a] border-2 border-[#2a2a2a] focus:border-[#d4af37] rounded-lg px-4 py-3 text-white placeholder-[#808080] transition-colors outline-none resize-none"
                      placeholder="Tell us about your interest in the championship..."
                    ></textarea>
                  </div>

                  <motion.button
                    type="submit"
                    whileHover={{ scale: 1.02 }}
                    whileTap={{ scale: 0.98 }}
                    className="w-full bg-gradient-to-r from-[#c41e3a] to-[#8b1526] hover:from-[#d4af37] hover:to-[#b8941f] text-white px-8 py-4 rounded-lg font-bold text-lg transition-all shadow-lg shadow-[#c41e3a]/50"
                  >
                    Submit Enquiry
                  </motion.button>
                </form>
              )}
            </div>
          </motion.div>

          {/* Social Media */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center"
          >
            <h3 className="mb-6 text-white">Follow Our Journey</h3>
            <div className="flex justify-center gap-4">
              <motion.a
                href="https://www.facebook.com/profile.php?id=61584416764591"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#2a2a2a] hover:border-[#d4af37] p-4 rounded-xl transition-all"
              >
                <Facebook className="w-7 h-7 text-white" />
              </motion.a>
              <motion.a
                href="https://www.instagram.com/thefightclubchampionship/"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#2a2a2a] hover:border-[#d4af37] p-4 rounded-xl transition-all"
              >
                <Instagram className="w-7 h-7 text-white" />
              </motion.a>
              <motion.a
                href="https://x.com/the_fight8446"
                target="_blank"
                rel="noopener noreferrer"
                whileHover={{ scale: 1.1, y: -5 }}
                className="bg-gradient-to-br from-[#1a1a1a] to-[#0a0a0a] hover:from-[#c41e3a] hover:to-[#8b1526] border-2 border-[#2a2a2a] hover:border-[#d4af37] p-4 rounded-xl transition-all"
              >
                <Twitter className="w-7 h-7 text-white" />
              </motion.a>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Footer */}
      <footer className="bg-black border-t-2 border-[#d4af37]/30 relative overflow-hidden">
        {/* Subtle glow */}
        <div className="absolute top-0 left-0 right-0 h-px bg-gradient-to-r from-transparent via-[#d4af37] to-transparent"></div>
        
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="grid md:grid-cols-4 gap-8 mb-8">
            {/* Brand Column */}
            <div className="md:col-span-2">
              <div className="flex items-center gap-3 mb-4">
                <img src={logo} alt="FCC Logo" className="h-16 w-16" />
                <div>
                  <div className="text-xl font-bold text-[#d4af37]">T Fight Club Championship</div>
                </div>
              </div>
              <p className="text-[#b0b0b0] text-sm max-w-md mb-4">
                India's premier university strength championship, building the next generation of elite athletes through professional strongman competitions on campuses nationwide.
              </p>
              <div className="flex gap-3">
                <a
                  href="https://www.facebook.com/profile.php?id=61584416764591"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] hover:bg-[#c41e3a] border border-[#2a2a2a] hover:border-[#d4af37] p-2 rounded-lg transition-all"
                >
                  <Facebook className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://www.instagram.com/thefightclubchampionship/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] hover:bg-[#c41e3a] border border-[#2a2a2a] hover:border-[#d4af37] p-2 rounded-lg transition-all"
                >
                  <Instagram className="w-5 h-5 text-white" />
                </a>
                <a
                  href="https://x.com/the_fight8446"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="bg-[#1a1a1a] hover:bg-[#c41e3a] border border-[#2a2a2a] hover:border-[#d4af37] p-2 rounded-lg transition-all"
                >
                  <Twitter className="w-5 h-5 text-white" />
                </a>
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Quick Links</h4>
              <ul className="space-y-2">
                <li>
                  <a href="#home" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Home
                  </a>
                </li>
                <li>
                  <a href="#strongest-human" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Strongest Women and Men
                  </a>
                </li>
                <li>
                  <a href="#universities" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Universities
                  </a>
                </li>
                <li>
                  <a href="#athletes" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Athletes
                  </a>
                </li>
                <li>
                  <a href="#roadmap" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    <span className="text-[#d4af37]">Vision</span> <span className="text-white">&</span> <span className="text-[#d4af37]">Roadmap</span>
                  </a>
                </li>
                <li>
                  <a href="#governance" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Governance
                  </a>
                </li>
                <li>
                  <a href="#contact" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm flex items-center gap-1">
                    Contact
                  </a>
                </li>
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-white font-bold mb-4 text-sm">Contact Info</h4>
              <ul className="space-y-3">
                <li className="flex items-start gap-2">
                  <Mail className="w-4 h-4 text-[#c41e3a] mt-0.5 flex-shrink-0" />
                  <a href="mailto:thefightclubchampionship@gmail.com" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm">
                    thefightclubchampionship@gmail.com
                  </a>
                </li>
                <li className="flex items-start gap-2">
                  <Phone className="w-4 h-4 text-[#c41e3a] mt-0.5 flex-shrink-0" />
                  <a href="tel:+919876543210" className="text-[#b0b0b0] hover:text-[#d4af37] transition-colors text-sm">
                    +91 98765 43210
                  </a>
                </li>
              </ul>
            </div>
          </div>

          {/* Bottom Bar */}
          <div className="border-t border-[#2a2a2a] pt-6 mt-6">
            <div className="flex flex-col md:flex-row justify-between items-center gap-4">
              <p className="text-[#808080] text-sm">
                © 2026 Fight Club Championship Pvt. Ltd. All rights reserved.
              </p>
              <div className="flex gap-6">
                <a href="#" className="text-[#808080] hover:text-[#d4af37] transition-colors text-sm">
                  Privacy Policy
                </a>
                <a href="#" className="text-[#808080] hover:text-[#d4af37] transition-colors text-sm">
                  Terms of Service
                </a>
                <a href="#" className="text-[#808080] hover:text-[#d4af37] transition-colors text-sm">
                  Code of Conduct
                </a>
              </div>
            </div>
          </div>
        </div>
      </footer>
    </>
  );
}
