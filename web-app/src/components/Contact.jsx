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
    <section ref={containerRef} id="contact" className="py-24 px-6 md:px-16 bg-white border-t border-gray-100">
      <div className="max-w-6xl mx-auto">
        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 text-center">Get in Touch</h3>
        <h2 className="font-display text-4xl font-bold text-dark text-center mb-16 tracking-tight">
          Visit <span className="text-[#9A7B4F]">Elite Dental Clinic</span>
        </h2>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 lg:gap-20 items-center">
          
          {/* Left Column: Contact Info */}
          <div className="flex flex-col gap-6 contact-element">
            
            <div className="flex gap-4">
              <a href="tel:+919306299901" className="flex-1 flex items-center justify-center gap-2 bg-dark text-white font-bold py-4 rounded-xl hover:bg-black transition-colors shadow-sm">
                <Phone size={18} /> Call Clinic
              </a>
              <a href="https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment" target="_blank" rel="noreferrer" className="flex-1 flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold py-4 rounded-xl hover:bg-[#20bd5a] transition-colors shadow-sm">
                <MessageCircle size={18} /> WhatsApp
              </a>
            </div>

            <div className="mt-4 flex flex-col gap-8">
              
              {/* Clickable Address */}
              <a href={mapLink} target="_blank" rel="noreferrer" className="group flex items-start gap-5">
                <div className="bg-[#9A7B4F]/10 p-4 rounded-xl shrink-0 group-hover:bg-[#9A7B4F] group-hover:text-white transition-colors text-[#9A7B4F]">
                  <MapPin size={24} />
                </div>
                <div className="flex flex-col mt-1">
                  <h4 className="font-sans font-bold text-dark text-lg mb-1 group-hover:text-[#9A7B4F] transition-colors">Clinic Address</h4>
                  <p className="font-sans text-muted leading-relaxed text-sm">Near Dr. Lal Path Lab, Opposite City Diagnostic Centre, Dabwali Road, Sirsa – 125055 (Haryana)</p>
                </div>
              </a>

              {/* Working Hours */}
              <div className="flex items-start gap-5">
                <div className="bg-[#9A7B4F]/10 p-4 rounded-xl shrink-0 text-[#9A7B4F]">
                  <Clock size={24} />
                </div>
                <div className="flex flex-col mt-1">
                  <h4 className="font-sans font-bold text-dark text-lg mb-1">Working Hours</h4>
                  <p className="font-sans text-muted leading-relaxed text-sm"><b>Monday to Saturday</b></p>
                  <p className="font-sans text-muted leading-relaxed text-sm">10:00 am to 7:30 pm</p>
                  <p className="font-sans text-muted leading-relaxed text-sm"><b>Lunch</b> 2:30 pm to 4:00 pm</p>
                  <p className="font-sans text-muted leading-relaxed text-sm"><b>Sunday</b> 10:00am to 2:30 pm</p>
                </div>
              </div>

            </div>
            
            <div className="mt-2 text-sm font-bold text-green-700 bg-green-50 p-4 rounded-xl border border-green-200 inline-block w-max">
              Consultation Fee: Just ₹200
            </div>

          </div>

          {/* Right Column: Map & Exterior Image */}
          <div className="flex flex-col gap-4 contact-element w-full">
            
            {/* Exterior Facility Snapshot */}
            <div className="w-full h-40 md:h-48 rounded-[16px] overflow-hidden shadow-sm relative group">
               <img 
                 src="/images/elite-dental-clinic-sirsa-exterior.webp" 
                 alt="Elite Dental Clinic building exterior in Sirsa" 
                 loading="lazy"
                 decoding="async"
                 onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                 className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700" 
               />
               <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent pointer-events-none" />
               <h4 className="absolute bottom-4 left-4 text-white font-bold tracking-tight z-10 flex items-center gap-2">
                 <MapPin size={16} /> Elite Dental Clinic Facility
               </h4>
            </div>

            {/* Embedded Map */}
            <div className="w-full relative shadow-md rounded-[16px] overflow-hidden border border-gray-200 bg-gray-50 h-[200px] md:h-[260px]">
              
              {/* Fallback Background Layer */}
              <div className="absolute inset-0 flex flex-col items-center justify-center text-center p-6 grayscale opacity-80" style={{ backgroundImage: 'url("https://images.unsplash.com/photo-1524661135-423995f22d0b?q=80&w=800&auto=format&fit=crop")', backgroundSize: 'cover', backgroundPosition: 'center' }}>
                <div className="bg-white/90 backdrop-blur p-4 rounded-xl border border-gray-100 shadow-sm flex flex-col items-center gap-2">
                   <Map size={32} className="text-gray-400" />
                   <span className="font-bold text-dark text-sm">Loading Map...</span>
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
            </div>

            {/* Get Directions Button */}
            <a 
              href={mapLink}
              target="_blank" 
              rel="noreferrer"
              className="w-full bg-gray-100 hover:bg-gray-200 text-dark font-bold py-4 rounded-[16px] flex items-center justify-center gap-2 transition-colors border border-gray-200 shadow-sm"
            >
              <Navigation size={18} className="text-[#9A7B4F]" /> Get Directions to Clinic
            </a>
          </div>

        </div>
      </div>
    </section>
  );
}
