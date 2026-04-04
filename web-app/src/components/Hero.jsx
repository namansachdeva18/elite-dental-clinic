import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Phone, MessageCircle, Star, Users, Award, CheckCircle2 } from 'lucide-react';

export default function Hero() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const navRef = useRef(null);

  useEffect(() => {
    // Nav scroll effect
    gsap.to(navRef.current, {
      scrollTrigger: {
        trigger: containerRef.current,
        start: 'top top',
        end: 'bottom top',
        scrub: true,
      },
      backgroundColor: 'rgba(255, 255, 255, 0.98)',
      backdropFilter: 'blur(16px)',
      boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.05)',
      duration: 0.4
    });

    const ctx = gsap.context(() => {
      gsap.from(leftRef.current.children, { 
        opacity: 0, 
        y: 30, 
        stagger: 0.1, 
        duration: 1, 
        ease: 'power3.out', 
      });

      gsap.from(rightRef.current, { 
        opacity: 0, 
        duration: 1.5, 
        ease: 'power3.out', 
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} className="relative w-full min-h-[90dvh] flex flex-col bg-white overflow-hidden pb-16 lg:pb-0">
      
      {/* Navbar exactly matching screenshot 2 */}
      <nav ref={navRef} className="w-full z-50 px-6 py-4 border-b border-gray-100 bg-white transition-all duration-300">
        <div className="max-w-7xl mx-auto w-full flex justify-between items-center">
          
          {/* Logo Block */}
          <a href="/" className="flex-shrink-0 flex items-center gap-3">
            <img src="/images/logo.webp" alt="Elite Dental Clinic Logo" className="h-10 md:h-[50px] w-auto object-contain" />
            <span className="font-display font-bold text-2xl tracking-tighter text-[#A38A5F] hidden sm:block mt-1">Elite Dental Clinic</span>
          </a>

          {/* Center Nav Links */}
          <div className="hidden lg:flex items-center gap-8 text-sm font-semibold text-gray-700">
            <a href="#services" className="hover:text-[#A38A5F] transition-colors">Services</a>
            <a href="#why-choose-us" className="hover:text-[#A38A5F] transition-colors">Why Choose Us</a>
            <a href="#testimonials" className="hover:text-[#A38A5F] transition-colors">Reviews</a>
            <a href="#contact" className="hover:text-[#A38A5F] transition-colors">Contact</a>
          </div>

          {/* Right Nav Actions */}
          <div className="flex items-center gap-6">
            <a href="tel:+919306299901" className="hidden md:flex items-center gap-2 font-bold text-sm text-gray-800">
              <Phone size={14} className="text-[#A38A5F]" /> 93062-99901
            </a>
            <a href="#book" className="bg-[#A38A5F] text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-dark transition-colors shadow-sm">
              Book Appointment
            </a>
          </div>
        </div>
      </nav>

      {/* Main Hero Split */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row flex-1 mt-0 h-full">
        
        {/* Left Column Text */}
        <div ref={leftRef} className="w-full lg:w-[55%] flex flex-col justify-center px-6 md:px-12 py-12 lg:py-0 z-20 bg-white/90 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
          
          <h1 className="font-display text-5xl md:text-6xl lg:text-7xl font-bold text-dark mb-6 tracking-tight leading-[1.1]">
            Pain-Free Dental<br/>
            Care in Sirsa <br className="hidden lg:block"/>
            <span className="text-[#A38A5F]">You Can Trust.</span>
          </h1>
          
          {/* Green Checkmark List */}
          <div className="flex flex-col gap-3 mb-10 max-w-sm">
            <div className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
               <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
               <span>5⭐ Rated Clinic</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
               <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
               <span>Advanced Laser Technology</span>
            </div>
            <div className="flex items-center gap-3 text-gray-700 font-semibold text-lg">
               <CheckCircle2 size={20} className="text-green-500 flex-shrink-0" />
               <span>Consultation Just ₹200</span>
            </div>
          </div>

          {/* Action Buttons precisely modeled on Screenshot 2 */}
          <div className="flex flex-wrap gap-3 mb-16">
              <a href="#book" className="flex items-center justify-center bg-[#A38A5F] text-white font-bold px-6 py-4 rounded-full hover:opacity-90 transition-opacity shadow-lg shadow-[#A38A5F]/20 text-sm">
                 Book Consultation &rarr;
              </a>
              <a href="tel:+919306299901" className="flex items-center justify-center gap-2 bg-white border border-gray-200 text-dark font-bold px-6 py-4 rounded-full hover:border-[#A38A5F] transition-colors shadow-sm text-sm">
                 <Phone size={16} /> Call Now
              </a>
              <a href="https://wa.me/919306299901?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment" target="_blank" rel="noreferrer" className="flex items-center justify-center gap-2 bg-[#25D366] text-white font-bold px-6 py-4 rounded-full hover:bg-[#20bd5a] transition-colors shadow-sm text-sm">
                 <MessageCircle size={16} /> WhatsApp
              </a>
          </div>

          {/* Bottom Floating Stats */}
          <div className="flex items-center gap-6 md:gap-12 bg-white shadow-xl shadow-gray-200/50 rounded-2xl px-8 py-5 border border-gray-50 w-max">
            <div className="flex items-center gap-3">
              <Star size={24} className="text-[#A38A5F] fill-[#A38A5F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-sm">5.0 Rating</span>
                <span className="text-xs text-muted uppercase font-bold tracking-wider">(80+ REVIEWS)</span>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <Award size={24} className="text-[#A38A5F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-sm">1000+ Successful </span>
                <span className="text-xs text-muted uppercase font-bold tracking-wider">Treatments</span>
              </div>
            </div>
            <div className="w-[1px] h-10 bg-gray-200"></div>
            <div className="flex items-center gap-3">
              <Users size={24} className="text-[#A38A5F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-sm">1000+ Happy</span>
                <span className="text-xs text-muted uppercase font-bold tracking-wider">PATIENTS</span>
              </div>
            </div>
          </div>
          
        </div>

        {/* Right Column Full Bleed Image Fade */}
        <div ref={rightRef} className="w-full lg:w-[45%] h-[50vh] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:bottom-0 overflow-hidden">
           
           {/* White fade gradient overlapping image smoothly */}
           <div className="absolute inset-y-0 left-0 w-32 bg-gradient-to-r from-white to-transparent z-10 hidden lg:block" />
           <div className="absolute inset-x-0 bottom-0 h-32 bg-gradient-to-t from-white to-transparent z-10 hidden lg:block" />
           <div className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-t from-white to-transparent z-10 lg:hidden" />

           {/* Full Bleed Image Mapping */}
           <img 
             src="/images/hero-doctor.webp" 
             alt="Dentist treating patient at Elite Dental Clinic Sirsa" 
             loading="eager"
             decoding="async"
             onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
             className="w-full h-full object-cover object-left-top opacity-95"
           />
        </div>

      </div>
    </section>
  );
}
