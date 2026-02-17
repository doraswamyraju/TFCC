import { useState, useEffect, lazy, Suspense } from 'react';
import { Navbar } from './components/Navbar';
import { Hero } from './components/Hero';
import { SocialFab } from './components/SocialFab';
import Lenis from 'lenis';

// Lazy load sections below the Hero for better initial performance
const UpcomingEvents = lazy(() => import('./components/UpcomingEvents').then(module => ({ default: module.UpcomingEvents })));
const StrongestHumanSection = lazy(() => import('./components/StrongestHuman').then(module => ({ default: module.StrongestHumanSection })));
const UniversitySection = lazy(() => import('./components/UniversitySection').then(module => ({ default: module.UniversitySection })));
const CoachesSection = lazy(() => import('./components/coaches').then(module => ({ default: module.CoachesSection })));
const Shop = lazy(() => import('./components/shop').then(module => ({ default: module.Shop })));
const VisionSection = lazy(() => import('./components/VisionSection').then(module => ({ default: module.VisionSection })));
const GovernanceSection = lazy(() => import('./components/GovernanceSection').then(module => ({ default: module.GovernanceSection })));
const InaugurationCountdown = lazy(() => import('./components/InaugurationCountdown').then(module => ({ default: module.InaugurationCountdown })));
const ContactFooter = lazy(() => import('./components/ContactFooter').then(module => ({ default: module.ContactFooter })));
const EventModal = lazy(() => import('./components/EventModal').then(module => ({ default: module.EventModal })));

import { logo } from './assets';
import { menEvents, womenEvents } from './content';

export default function App() {
  const [selectedEventIndex, setSelectedEventIndex] = useState<number | null>(null);
  const [activeCompetitionType, setActiveCompetitionType] = useState<'man' | 'woman'>('man');
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    phone: '',
    institution: '',
    category: '',
    message: ''
  });
  const [formSubmitted, setFormSubmitted] = useState(false);

  useEffect(() => {
    // Initialize Lenis smooth scrolling
    const lenis = new Lenis({
      duration: 1.2,
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
      orientation: 'vertical',
      gestureOrientation: 'vertical',
      smoothWheel: true,
      wheelMultiplier: 1,
      // smoothTouch: false,
      touchMultiplier: 2,
    });

    function raf(time: number) {
      lenis.raf(time);
      requestAnimationFrame(raf);
    }

    requestAnimationFrame(raf);

    // Handle anchor links with Lenis
    const handleAnchorClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      const anchor = target.closest('a');
      
      if (anchor && anchor.hash && anchor.origin === window.location.origin) {
        e.preventDefault();
        const element = document.querySelector(anchor.hash);
        if (element) {
          lenis.scrollTo(element as HTMLElement, {
            offset: 0,
            duration: 1.5,
          });
        }
      }
    };

    document.addEventListener('click', handleAnchorClick);

    return () => {
      lenis.destroy();
      document.removeEventListener('click', handleAnchorClick);
    };
  }, []);

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    setFormSubmitted(true);
    setTimeout(() => {
      setFormSubmitted(false);
      setFormData({
        name: '',
        email: '',
        phone: '',
        institution: '',
        category: '',
        message: ''
      });
    }, 3000);
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSelectEvent = (index: number, type: 'man' | 'woman') => {
    setSelectedEventIndex(index);
    setActiveCompetitionType(type);
  };

  const handlePrevEvent = () => {
    if (selectedEventIndex === null) return;
    
    if (activeCompetitionType === 'man' && selectedEventIndex === 0) {
      // At first men's event, go to last women's event
      setActiveCompetitionType('woman');
      setSelectedEventIndex(womenEvents.length - 1);
    } else {
      // Normal previous navigation
      setSelectedEventIndex(selectedEventIndex - 1);
    }
  };

  const handleNextEvent = () => {
    if (selectedEventIndex === null) return;
    
    if (activeCompetitionType === 'woman' && selectedEventIndex === womenEvents.length - 1) {
      // At last women's event, go to first men's event
      setActiveCompetitionType('man');
      setSelectedEventIndex(0);
    } else {
      // Normal next navigation
      setSelectedEventIndex(selectedEventIndex + 1);
    }
  };

  const currentEvents = activeCompetitionType === 'man' ? menEvents : womenEvents;
  const selectedEvent = selectedEventIndex !== null ? currentEvents[selectedEventIndex] : null;
  
  // Determine if navigation arrows should be shown
  const showPrev = selectedEventIndex !== null && (selectedEventIndex > 0 || activeCompetitionType === 'man');
  const showNext = selectedEventIndex !== null && (
    (activeCompetitionType === 'woman' && selectedEventIndex < womenEvents.length - 1) ||
    (activeCompetitionType === 'woman' && selectedEventIndex === womenEvents.length - 1) || // Last women's event, can go to men
    (activeCompetitionType === 'man' && selectedEventIndex < menEvents.length - 1)
  );

  return (
    <div className="bg-[#0a0a0a] text-white selection:bg-[#d4af37] selection:text-black relative">
      <Navbar />
      <SocialFab />
      
      <main>
        <Hero />
        
        <Suspense fallback={<div className="h-screen bg-[#0a0a0a]" />}>
          {/* Upcoming Events Section */}
          <UpcomingEvents />
          
          {/* Events Section */}
          {/* <EventsSection /> */}
          
          {/* Image Showcase */}
          {/* <ImageShowcase /> */}
          
          {/* Strongest Human Section */}
          <StrongestHumanSection onSelectEvent={handleSelectEvent} />
          
          {/* University Section */}
          <UniversitySection />
          
          {/* Governance Section */}
          <GovernanceSection />
          
          {/* Coaches Section */}
          <CoachesSection />
          
          {/* Shop Section */}
          <Shop logo={logo} />
          
          {/* Vision Section */}
          <VisionSection />
          
          {/* Inauguration Countdown Section */}
          <section id="inauguration" className="relative">
            <InaugurationCountdown
              guestName="Kalvakuntla Taraka Rama Rao ( KTR Sir ) Garu 
    &
    Repalle Shiva Praveen Kumar ( RSP Sir ) Garu "
              guestDesignation=""
              guestImage="https://res.cloudinary.com/doxluexqo/image/upload/q_auto,f_auto,w_800/v1768927291/425229df-02fb-4e61-b555-2242854784f3.png"
              targetDate={new Date(Date.now() + 2 * 24 * 60 * 60 * 1000).toISOString()} // 2 days from now
            />
          </section>
        </Suspense>
      </main>

      <Suspense fallback={null}>
        {/* Contact & Footer */}
        <ContactFooter
          logo={logo}
          formData={formData}
          formSubmitted={formSubmitted}
          handleFormSubmit={handleFormSubmit}
          handleInputChange={handleInputChange}
        />

        {/* Event Modal */}
        {selectedEvent && (
          <EventModal
            isOpen={true}
            onClose={() => setSelectedEventIndex(null)}
            title={selectedEvent.title}
            image={selectedEvent.image}
            details={selectedEvent.details}
            note={selectedEvent.note}
            currentIndex={selectedEventIndex!}
            totalEvents={currentEvents.length}
            onPrev={showPrev ? handlePrevEvent : undefined}
            onNext={showNext ? handleNextEvent : undefined}
          />
        )}
      </Suspense>
    </div>
  );
}
