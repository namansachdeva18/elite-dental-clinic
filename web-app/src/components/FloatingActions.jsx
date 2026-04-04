import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone } from 'lucide-react';
import BookingModal from './BookingModal';

export default function FloatingActions() {
  const [exitIntentDismissed, setExitIntentDismissed] = useState(false);

  useEffect(() => {
    // Exit intent trigger
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentDismissed) {
        setExitIntentDismissed(true);
        // globally trigger booking modal
        window.dispatchEvent(new Event('open-booking-modal'));
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => document.removeEventListener('mouseleave', handleMouseLeave);
  }, [exitIntentDismissed]);

  return (
    <>
      {/* Sticky WhatsApp Button */}
      <a 
        href="https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment" 
        target="_blank" 
        rel="noreferrer"
        className="fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#20BE5C] hover:scale-110 transition-all duration-300 flex items-center justify-center group"
        aria-label="WhatsApp Us"
      >
        <MessageCircle size={32} />
        <span className="absolute right-full mr-4 bg-white text-dark text-sm font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none">
          Chat With Us
        </span>
      </a>

      {/* Mobile Sticky CTA Bar */}
      <div className="fixed bottom-0 left-0 w-full z-[90] bg-white border-t border-gray-200 p-3 flex md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.05)] justify-between items-center gap-3">
        <a href="tel:+919306299901" className="flex-1 bg-gray-100 text-dark font-bold py-3 rounded-xl flex items-center justify-center gap-2">
          <Phone size={18} /> Call
        </a>
        <a 
          href="#book"
          className="flex-[2] bg-[#9A7B4F] text-white font-bold py-3 rounded-xl flex items-center justify-center"
        >
          Book Appointment
        </a>
      </div>

      {/* Global Booking Modal Architecture mounted once */}
      <BookingModal />
    </>
  );
}
