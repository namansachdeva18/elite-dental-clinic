import React from 'react';
import { Phone, MessageCircle } from 'lucide-react';

export default function FinalCTA() {
  return (
    <section className="px-4 md:px-6 py-4 pb-4 bg-white">
      <div className="max-w-5xl mx-auto bg-gradient-to-r from-[#221B14] via-[#1A140E] to-[#120E0A] rounded-2xl py-8 sm:py-10 px-5 md:px-10 flex flex-col items-center text-center shadow-xl border border-[#9A7B4F]/30 relative overflow-hidden">
        
        {/* Soft Ambient Gold Aura */}
        <div className="absolute top-0 right-0 w-64 h-64 bg-[#D4AF37]/10 rounded-full blur-3xl pointer-events-none" />
        <div className="absolute bottom-0 left-0 w-64 h-64 bg-[#9A7B4F]/10 rounded-full blur-3xl pointer-events-none" />

        <span className="font-mono text-[10px] tracking-widest text-[#EADBB6] uppercase font-bold mb-1.5 bg-[#2B2317] border border-[#9A7B4F]/30 px-2.5 py-0.5 rounded-full">
          Direct Doctor Consultation in Sirsa
        </span>

        <h2 className="font-display text-2xl sm:text-3xl md:text-4xl font-bold text-white mb-2 tracking-tight">
          Book Your Appointment Today.
        </h2>
        
        <p className="font-sans text-[11px] sm:text-xs text-gray-300 mb-5 max-w-lg font-normal leading-relaxed">
          Experience pain-free treatment and gentle care from Sirsa's most trusted dental clinic. 
          Limited patient slots scheduled daily to ensure dedicated doctor attention.
        </p>

        <div className="flex flex-col sm:flex-row items-center gap-2.5 w-full justify-center max-w-md">
          <a 
            href="tel:+919306299901"
            className="flex-1 flex items-center justify-center gap-1.5 bg-gradient-to-r from-[#9A7B4F] to-[#80633C] hover:brightness-110 text-white font-bold py-2.5 px-5 rounded-xl transition-all w-full text-xs shadow-md active:scale-95"
          >
            <Phone size={14} /> Call Clinic (+91 93062 99901)
          </a>
          <a 
            href="https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment"
            target="_blank" 
            rel="noreferrer"
            className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 px-6 rounded-xl transition-all w-full text-xs sm:text-sm shadow-md active:scale-95"
          >
            <MessageCircle size={16} /> WhatsApp Us
          </a>
        </div>
      </div>
    </section>
  );
}
