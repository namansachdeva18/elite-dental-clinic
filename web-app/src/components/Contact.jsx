import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { MapPin, Phone, Clock, MessageCircle, Navigation, Map } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function Contact() {
  const containerRef = useRef(null);
  const [mapLoaded, setMapLoaded] = useState(false);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.contact-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  const mapLink = "https://www.google.com/maps/search/?api=1&query=Elite+Dental+Clinic+Sirsa";

  return (
    <section ref={containerRef} id="contact" className="py-8 md:py-10 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Get in Touch
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight mt-0.5 mb-1">
            Visit <span className="text-[#9A7B4F]">Elite Dental Clinic</span>
          </h2>
          <p className="font-sans text-muted text-[11px] sm:text-xs">
            Conveniently located on Dabwali Road, Sirsa with dedicated consultation and treatment suites.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 lg:gap-12 items-center">
          
          {/* Left Column: Compact Contact Info Cards */}
          <div className="flex flex-col gap-3 contact-element">
            
            {/* Quick Action Buttons */}
            <div className="grid grid-cols-2 gap-2.5">
              <a 
                href="tel:+919467624898" 
                className="flex items-center justify-center gap-1.5 bg-[#1C1813] text-white font-bold py-2 px-3 rounded-xl hover:bg-black transition-all shadow-xs text-xs active:scale-95 border border-[#9A7B4F]/30"
              >
                <Phone size={13} className="text-[#D4AF37]" /> Call Clinic
              </a>
              <a 
                href="https://wa.me/919467624898?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment" 
                target="_blank" 
                rel="noreferrer" 
                className="flex items-center justify-center gap-1.5 bg-[#25D366] text-white font-bold py-2 px-3 rounded-xl hover:bg-[#20bd5a] transition-all shadow-xs text-xs active:scale-95"
              >
                <MessageCircle size={14} /> WhatsApp
              </a>
            </div>

            {/* Compact Address Card */}
            <a 
              href={mapLink} 
              target="_blank" 
              rel="noreferrer" 
              className="group flex items-start gap-3 p-3 rounded-2xl border border-gray-200/80 bg-[#FAF8F5] hover:border-[#9A7B4F]/50 hover:bg-white transition-all shadow-2xs"
            >
              <div className="w-8 h-8 rounded-xl bg-white border border-[#9A7B4F]/25 text-[#9A7B4F] flex items-center justify-center shrink-0 group-hover:bg-[#9A7B4F] group-hover:text-white transition-colors shadow-2xs">
                <MapPin size={16} />
              </div>
              <div className="flex flex-col">
                <div className="flex items-center gap-2">
                  <h4 className="font-sans font-bold text-dark text-xs sm:text-sm group-hover:text-[#9A7B4F] transition-colors">
                    Clinic Address
                  </h4>
                  <span className="text-[9.5px] font-semibold text-[#9A7B4F] group-hover:translate-x-0.5 transition-transform">
                    Directions &rarr;
                  </span>
                </div>
                <p className="font-sans text-muted text-[11px] sm:text-xs leading-relaxed mt-0.5">
                  Near Dr. Lal Path Lab, Opp. City Diagnostic Centre, Dabwali Road, Sirsa (125055)
                </p>
              </div>
            </a>

            {/* Compact Working Hours Card */}
            <div className="flex items-start gap-3 p-3 rounded-2xl border border-gray-200/80 bg-[#FAF8F5] shadow-2xs">
              <div className="w-8 h-8 rounded-xl bg-white border border-[#9A7B4F]/25 text-[#9A7B4F] flex items-center justify-center shrink-0 shadow-2xs">
                <Clock size={16} />
              </div>
              <div className="flex flex-col flex-1 text-[11px] sm:text-xs">
                <h4 className="font-sans font-bold text-dark mb-1">
                  Working Hours
                </h4>
                <div className="grid grid-cols-2 gap-1 text-muted">
                  <div>
                    <span className="font-semibold text-dark block text-[10.5px]">Mon – Sat</span>
                    <span>10:00 am – 7:30 pm</span>
                  </div>
                  <div>
                    <span className="font-semibold text-dark block text-[10.5px]">Sunday</span>
                    <span>10:00 am – 2:30 pm</span>
                  </div>
                </div>
                <div className="text-[10px] text-amber-700 bg-amber-50 border border-amber-200/60 rounded px-1.5 py-0.5 w-max mt-1.5">
                  Lunch: 2:30 pm – 4:00 pm
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Embedded Map & Directions */}
          <div className="flex flex-col gap-3 contact-element w-full">
            
            {/* Embedded Map Card */}
            <div className="w-full relative shadow-md rounded-2xl overflow-hidden border border-[#9A7B4F]/25 bg-gray-50 h-[190px] sm:h-[220px] md:h-[260px] group">
              
              {/* Fallback Background Layer */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 grayscale opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="bg-white/90 backdrop-blur p-3 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-1.5">
                   <Map size={24} className="text-gray-400" />
                   <span className="font-bold text-dark text-xs">Loading Map...</span>
                </div>
              </div>

              {/* Stable iframe embed */}
              <iframe 
                src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Elite%20Dental%20Clinic,%20Sirsa,%20Haryana+(Elite%20Dental%20Clinic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                width="100%" 
                height="100%" 
                style={{ border: 0 }}
                allowFullScreen="" 
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="absolute inset-0 w-full h-full z-10"
                title="Elite Dental Clinic Map Location"
                onLoad={() => setMapLoaded(true)}
              />

              {/* Floating Map Pin Badge */}
              <div className="absolute top-2.5 right-2.5 z-20 bg-white/90 backdrop-blur-md px-2.5 py-1 rounded-full text-[10px] font-bold text-dark border border-[#9A7B4F]/30 shadow-xs flex items-center gap-1 pointer-events-none">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
                <span>Open in Sirsa</span>
              </div>
            </div>

            {/* Get Directions Button - Beautiful Luxury Action Pill */}
            <a 
              href={mapLink}
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-gradient-to-r from-[#FAF6EE] via-white to-[#FAF6EE] hover:from-[#9A7B4F] hover:to-[#80633C] hover:text-white text-dark font-bold py-3 px-4 rounded-xl flex items-center justify-center gap-2 transition-all duration-300 border border-[#9A7B4F]/35 shadow-xs hover:shadow-md group/btn text-xs sm:text-sm active:scale-98"
            >
              <div className="w-6 h-6 rounded-full bg-[#9A7B4F]/15 group-hover/btn:bg-white/20 flex items-center justify-center transition-colors">
                <Navigation size={13} className="text-[#9A7B4F] group-hover/btn:text-white transition-colors" />
              </div>
              <span className="tracking-wide">Get Google Directions to Clinic</span>
              <span className="text-[#9A7B4F] group-hover/btn:text-white group-hover/btn:translate-x-1 transition-all">&rarr;</span>
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
