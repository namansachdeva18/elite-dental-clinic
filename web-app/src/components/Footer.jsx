import React from 'react';
import { Phone, MapPin, Mail, ExternalLink } from 'lucide-react';

export default function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="px-3 sm:px-6 bg-white pb-3 sm:pb-6">
      <div className="max-w-7xl mx-auto bg-[#14110E] border border-[#9A7B4F]/25 rounded-2xl sm:rounded-[2.5rem] px-5 sm:px-8 md:px-12 py-6 sm:py-10 shadow-xl">
        
        {/* Main Footer Grid: 2 columns on mobile, 4 on desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-4 gap-6 sm:gap-8 lg:gap-10">
          
          {/* Column 1: Brand (Span full width on mobile) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col gap-2.5">
            <div className="flex items-center gap-2">
              <img src="/images/logo.webp" alt="Elite Dental Clinic Logo" className="h-9 sm:h-11 w-auto object-contain" />
              <span className="font-display font-bold text-white text-base">Elite Dental</span>
            </div>
            <p className="font-sans text-white/50 leading-relaxed text-[11px] sm:text-xs">
              Sirsa's trusted dental clinic delivering pain-free, modern laser and restorative treatments.
            </p>
            <div className="flex items-center gap-1.5 bg-white/5 px-2.5 py-1 rounded-full border border-white/10 w-max mt-1">
              <div className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[8.5px] font-bold tracking-widest text-[#D4AF37]">OPERATIONAL 24/7</span>
            </div>
          </div>
          
          {/* Column 2: Quick Links (Col 1 of row 2 on mobile) */}
          <div className="flex flex-col gap-2">
            <h4 className="font-sans font-bold text-white text-[11px] sm:text-xs tracking-wider uppercase mb-1 text-[#D4AF37]">
              Quick Links
            </h4>
            <a href="/" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">Home</a>
            <a href="/#about" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">About Doctor</a>
            <a href="/#services" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">All Services</a>
            <a href="/#results" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">Before / After</a>
            <a href="/contact" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">Clinic & Location</a>
            <a href="/#faq" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs">Patient FAQs</a>
          </div>

          {/* Column 3: Top Treatments (Col 2 of row 2 on mobile) */}
          <div className="flex flex-col gap-2">
            <h4 className="font-sans font-bold text-white text-[11px] sm:text-xs tracking-wider uppercase mb-1 text-[#D4AF37]">
              Specialized Care
            </h4>
            <a href="/services/root-canal-treatment" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Laser Root Canal (RCT)</a>
            <a href="/services/dental-implants" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Permanent Implants</a>
            <a href="/services/braces-and-aligners" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Clear Aligners & Braces</a>
            <a href="/services/teeth-whitening" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Teeth Whitening</a>
            <a href="/services/dental-crowns-and-bridges" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Zirconia Crowns & Bridges</a>
            <a href="/services/wisdom-tooth-extraction" className="font-sans text-white/60 hover:text-[#D4AF37] transition-colors text-[11px] sm:text-xs truncate">Wisdom Tooth Removal</a>
          </div>

          {/* Column 4: Contact (Span full width on mobile) */}
          <div className="col-span-2 sm:col-span-1 lg:col-span-1 flex flex-col gap-2 pt-2 sm:pt-0 border-t border-white/10 sm:border-t-0">
            <h4 className="font-sans font-bold text-white text-[11px] sm:text-xs tracking-wider uppercase mb-1 text-[#D4AF37]">
              Clinic Contact
            </h4>
            <div className="font-sans text-white/60 text-[11px] sm:text-xs leading-relaxed flex items-start gap-2">
              <MapPin size={13} className="mt-0.5 shrink-0 text-[#D4AF37]" />
              <span>Dabwali Road, Opp. City Diagnostic Centre, Sirsa (Haryana)</span>
            </div>
            <a href="tel:+919467624898" className="font-sans text-white/90 font-bold text-[11px] sm:text-xs hover:text-[#D4AF37] transition-colors flex items-center gap-2 mt-0.5">
              <Phone size={13} className="text-[#D4AF37]" /> +91 94676-24898
            </a>
            <div className="font-sans text-white/60 text-[11px] sm:text-xs flex items-center gap-2">
              <Mail size={13} className="text-[#D4AF37]" /> elitedentalclinic30@gmail.com
            </div>
          </div>

        </div>

        {/* Bottom Copyright & Credit Line */}
        <div className="mt-6 pt-4 border-t border-white/10 flex flex-col sm:flex-row items-center justify-between gap-2 text-[10px] text-white/40">
          <span>© {currentYear} Elite Dental Clinic Sirsa. All rights reserved.</span>
          <span className="text-[#D4AF37]/70 font-mono">PGI Protocols • 100% Sterilized</span>
        </div>

      </div>
    </footer>
  );
}
