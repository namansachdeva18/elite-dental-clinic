import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { Phone, MessageCircle, Star, Users, Award, CheckCircle2, Sparkles, ArrowRight } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_CONFIG, isCampaignActive, getCampaignWhatsAppUrl } from '../config/campaignConfig';
import { trackConversionEvent } from '../utils/tracking';

export default function Hero() {
  const containerRef = useRef(null);
  const leftRef = useRef(null);
  const rightRef = useRef(null);
  const active = isCampaignActive();

  useEffect(() => {
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

  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', { source: 'homepage_hero' });
    const waUrl = active 
      ? getCampaignWhatsAppUrl('', '[Homepage Hero Inquiry]')
      : `https://wa.me/${CAMPAIGN_CONFIG.whatsappNumber}?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment`;
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  return (
    <section ref={containerRef} className="relative w-full min-h-[90dvh] flex flex-col bg-white overflow-hidden pb-16 lg:pb-0">

      {/* Main Hero Split */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row flex-1 mt-0 h-full">
        
        {/* Left Column Text */}
        <div ref={leftRef} className="w-full lg:w-[55%] flex flex-col justify-center px-4 sm:px-6 md:px-12 py-6 sm:py-8 lg:py-0 z-20 bg-white/95 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
          
          {/* Campaign Teaser Badge on Homepage */}
          {active && (
            <Link 
              to="/anniversary-offer"
              onClick={() => trackConversionEvent('hero_anniversary_pill_click', { source: 'homepage_hero' })}
              className="inline-flex items-center gap-2 bg-[#FAF8F5] border border-[#9A7B4F]/30 hover:border-[#9A7B4F] text-[#80633C] px-3 py-1 rounded-full text-[11px] font-bold tracking-wide mb-3 w-max transition-all shadow-xs group cursor-pointer"
            >
              <Sparkles size={12} className="text-[#9A7B4F]" />
              <span>Anniversary Special: <strong>20% OFF</strong> Premium Treatments</span>
              <ArrowRight size={11} className="group-hover:translate-x-0.5 transition-transform text-[#9A7B4F]" />
            </Link>
          )}

          <h1 className="font-display text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-extrabold text-dark mb-3 tracking-tight leading-[1.12]">
            Pain-Free Dental <br className="hidden sm:inline" />
            Care in Sirsa <br className="hidden lg:block"/>
            <span className="bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] bg-clip-text text-transparent">You Can Trust.</span>
          </h1>
          
          {/* Subtle Dark Contrast Feature Pill Box - High density, minimal height */}
          <div className="bg-gradient-to-r from-[#1C1813] to-[#120E0A] text-white p-3 rounded-2xl border border-[#9A7B4F]/30 mb-5 max-w-md shadow-md flex flex-wrap items-center justify-between gap-2">
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-200">
               <span className="text-[#D4AF37]">⭐</span>
               <span>5.0 Rated Clinic</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#9A7B4F]" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-200">
               <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
               <span>Advanced Laser</span>
            </div>
            <div className="w-1 h-1 rounded-full bg-[#9A7B4F]" />
            <div className="flex items-center gap-1.5 text-xs font-semibold text-[#F3E5AB]">
               <span>Doctor Consultation ₹200</span>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex flex-wrap gap-2.5 mb-5">
              <a href="#book" className="flex items-center justify-center bg-gradient-to-r from-[#9A7B4F] to-[#80633C] text-white font-bold px-5 py-2.5 rounded-xl hover:brightness-110 transition-all shadow-md text-xs sm:text-sm active:scale-95">
                 Book Consultation &rarr;
              </a>
              <a href={`tel:${CAMPAIGN_CONFIG.phone}`} className="flex items-center justify-center gap-1.5 bg-white border border-gray-200 text-dark font-bold px-4 py-2.5 rounded-xl hover:border-[#9A7B4F] transition-colors shadow-xs text-xs sm:text-sm active:scale-95">
                 <Phone size={14} className="text-[#9A7B4F]" /> Call Now
              </a>
              <button 
                onClick={handleWhatsAppClick}
                className="flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold px-4 py-2.5 rounded-xl transition-colors shadow-xs text-xs sm:text-sm cursor-pointer active:scale-95"
              >
                 <MessageCircle size={14} /> WhatsApp
              </button>
          </div>

          {/* Bottom Floating Stats - Compact & Luxury */}
          <div className="flex items-center gap-4 sm:gap-8 bg-white/95 backdrop-blur-md shadow-xl shadow-black/5 rounded-2xl px-5 sm:px-8 py-3.5 border border-[#9A7B4F]/20 w-max max-w-full overflow-x-auto">
            <div className="flex items-center gap-2.5">
              <Star size={20} className="text-[#9A7B4F] fill-[#9A7B4F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-xs sm:text-sm">5.0 Rating</span>
                <span className="text-[10px] text-muted uppercase font-bold tracking-wider">({CAMPAIGN_CONFIG.googleReviewCount} REVIEWS)</span>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="flex items-center gap-2.5">
              <Award size={20} className="text-[#9A7B4F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-xs sm:text-sm">Thousands</span>
                <span className="text-[10px] text-muted uppercase font-bold tracking-wider">TREATMENTS</span>
              </div>
            </div>
            <div className="w-[1px] h-8 bg-gray-200"></div>
            <div className="flex items-center gap-2.5">
              <Users size={20} className="text-[#9A7B4F]" />
              <div className="flex flex-col">
                <span className="font-bold text-dark text-xs sm:text-sm">Thousands</span>
                <span className="text-[10px] text-muted uppercase font-bold tracking-wider">HAPPY PATIENTS</span>
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
