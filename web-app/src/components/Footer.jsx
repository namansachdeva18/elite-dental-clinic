import React from 'react';
import { Phone, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-4 md:px-6 bg-white pb-6">
      <div className="max-w-7xl mx-auto bg-[#1A1A1A] rounded-[3rem] px-8 md:px-16 pt-16 pb-12 shadow-2xl">
        
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12 lg:gap-8 xl:gap-12 mb-16">
          
          {/* Column 1: Brand */}
          <div className="flex flex-col gap-5">
            <img src="/images/logo.webp" alt="Elite Dental Clinic Logo" className="h-12 md:h-[60px] w-auto object-contain self-start" />
            <p className="font-sans text-white/50 leading-relaxed text-xs">
              Best Dental Clinic in Sirsa yielding completely tailored, painless care. Let us protect your smile.
            </p>
            <div className="flex items-center gap-2 bg-white/5 px-3 py-1.5 rounded-md border border-white/10 w-max mt-2">
              <div className="w-1.5 h-1.5 rounded-full bg-green-500 shadow-[0_0_8px_rgba(34,197,94,0.6)]" />
              <span className="font-mono text-[9px] font-bold tracking-widest text-[#A38A5F]">OPERATIONAL 24/7</span>
            </div>
          </div>
          
          {/* Column 2: Quick Links */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold mb-4 text-white text-xs tracking-widest uppercase">Quick Links</h4>
            <a href="#" className="font-sans text-white/50 hover:text-[#A38A5F] transition-colors text-xs font-semibold">Home</a>
            <a href="#about" className="font-sans text-white/50 hover:text-[#A38A5F] transition-colors text-xs font-semibold">About Clinic</a>
            <a href="#services" className="font-sans text-white/50 hover:text-[#A38A5F] transition-colors text-xs font-semibold">Our Services</a>
            <a href="#transformations" className="font-sans text-white/50 hover:text-[#A38A5F] transition-colors text-xs font-semibold">Before / After</a>
            <a href="#faq" className="font-sans text-white/50 hover:text-[#A38A5F] transition-colors text-xs font-semibold">Patient FAQs</a>
          </div>

          {/* Column 3: Services */}
          <div className="flex flex-col gap-3">
            <h4 className="font-sans font-bold mb-4 text-white text-xs tracking-widest uppercase">Top Treatments</h4>
            <span className="font-sans text-white/50 text-xs font-semibold cursor-pointer transition-colors hover:text-[#A38A5F]">Root Canal Treatment</span>
            <span className="font-sans text-white/50 text-xs font-semibold cursor-pointer transition-colors hover:text-[#A38A5F]">Dental Braces & Aligners</span>
            <span className="font-sans text-white/50 text-xs font-semibold cursor-pointer transition-colors hover:text-[#A38A5F]">Teeth Whitening in Sirsa</span>
            <span className="font-sans text-white/50 text-xs font-semibold cursor-pointer transition-colors hover:text-[#A38A5F]">Dental Implants</span>
            <span className="font-sans text-white/50 text-xs font-semibold cursor-pointer transition-colors hover:text-[#A38A5F]">Cosmetic Dentistry</span>
          </div>

          {/* Column 4: Contact */}
          <div className="flex flex-col gap-4">
            <h4 className="font-sans font-bold mb-2 text-white text-xs tracking-widest uppercase">Contact Details</h4>
            <div className="font-sans text-white/50 text-xs leading-relaxed flex items-start gap-3">
              <MapPin size={14} className="mt-0.5 flex-shrink-0 text-[#A38A5F]" />
              <span>Near Dr. Lal Path Lab, Opposite City Diagnostic Centre, <br className="hidden xl:block"/>Dabwali Road, Sirsa – 125055 (Haryana)</span>
            </div>
            <a href="tel:+919306299901" className="font-sans text-white/90 font-bold text-xs hover:text-[#A38A5F] transition-colors flex items-center gap-3">
              <Phone size={14} className="text-[#A38A5F]" /> 93062-99901
            </a>
            <div className="font-sans text-white/50 text-xs flex items-center gap-3">
              <Mail size={14} className="text-[#A38A5F]" /> elitedentalclinic30@gmail.com
            </div>
            <a 
              href="https://www.google.com/search?q=Elite+Dental+Clinic+Sirsa" 
              target="_blank" 
              rel="noreferrer"
              className="mt-1 text-[#A38A5F] flex items-center gap-2 text-[10px] uppercase font-bold tracking-widest hover:text-white transition-colors underline underline-offset-4 decoration-white/20"
            >
              Read our Google Reviews <ExternalLink size={12} />
            </a>
          </div>

        </div>

      </div>
    </footer>
  );
}
