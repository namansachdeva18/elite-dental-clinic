import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="px-4 md:px-6 py-6 pb-2 bg-white">
      <div className="max-w-7xl mx-auto bg-[#A38A5F] rounded-[3rem] py-24 px-6 md:px-16 flex flex-col items-center text-center shadow-xl">
        
        <h2 className="font-display text-4xl md:text-5xl lg:text-6xl font-bold text-white mb-6 tracking-tight">
          Book Your Appointment Today.
        </h2>
        
        <p className="font-sans text-lg md:text-xl text-white/90 mb-10 max-w-2xl font-medium leading-relaxed">
          Get pain-free treatment from Sirsa's most trusted dental clinic. <br className="hidden md:block"/>
          Limited slots available daily.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-4 w-full justify-center">
          <a 
            href="tel:+919306299901"
            className="flex items-center justify-center gap-2 bg-[#1A1A1A] text-white font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-black w-full sm:w-auto text-sm"
          >
            <Phone size={18} /> Call Now
          </a>
          <a 
            href="https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment"
            target="_blank" 
            rel="noreferrer"
            className="flex items-center justify-center gap-2 bg-white text-dark font-bold px-8 py-4 rounded-full transition-all duration-300 hover:bg-gray-50 w-full sm:w-auto text-sm shadow-sm"
          >
            <MessageCircle size={18} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
