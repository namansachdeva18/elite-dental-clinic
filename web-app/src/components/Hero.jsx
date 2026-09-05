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
    <section ref={containerRef} className="relative w-full min-h-[80dvh] lg:min-h-[85dvh] flex flex-col bg-white overflow-hidden pb-4 lg:pb-0">

      {/* Main Hero Split */}
      <div className="relative z-10 w-full max-w-7xl mx-auto flex flex-col-reverse lg:flex-row flex-1 mt-0 h-full">
        
        {/* Left Column Text */}
        <div ref={leftRef} className="w-full lg:w-[55%] flex flex-col justify-center px-4 sm:px-6 md:px-10 py-4 sm:py-6 lg:py-4 z-20 bg-white/95 backdrop-blur-sm lg:backdrop-blur-none lg:bg-transparent">
          
          {/* Campaign Teaser Badge on Homepage */}
          {active && (
            <Link 
              to="/anniversary-offer"
              onClick={() => trackConversionEvent('hero_anniversary_pill_click', { source: 'homepage_hero' })}
              className="inline-flex items-center gap-1.5 bg-[#FAF8F5] border border-[#9A7B4F]/30 hover:border-[#9A7B4F] text-[#80633C] px-2.5 py-0.5 rounded-full text-[11px] font-bold tracking-wide mb-2 w-max transition-all shadow-xs group cursor-pointer animate-subtlePulse"
            >
              <Sparkles size={11} className="text-[#9A7B4F]" />
              <span>Anniversary Special: <strong>20% OFF</strong> Treatments</span>
              <ArrowRight size={10} className="group-hover:translate-x-0.5 transition-transform text-[#9A7B4F]" />
            </Link>
          )}

          <div className="flex items-center gap-2 mb-1.5 text-[#9A7B4F] font-semibold text-[11px] sm:text-xs tracking-wider uppercase">
            <span className="w-5 h-[1.5px] bg-[#9A7B4F]"></span>
            <span>Elite Dental Clinic • Sirsa</span>
          </div>

          <h1 className="font-display text-2xl sm:text-4xl md:text-5xl lg:text-[52px] font-extrabold text-dark mb-2.5 tracking-tight leading-[1.12]">
            Pain-Free Dental <br className="hidden sm:inline" />
            Care in Sirsa <br className="hidden lg:block"/>
            <span className="bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] bg-clip-text text-transparent">You Can Trust.</span>
          </h1>
          
          {/* Combined Clean Stack: Unified width, SEO enriched, High Lead Conversion */}
          <div className="w-full max-w-lg flex flex-col gap-2.5 mb-2">
            
            {/* 1. Feature Pill Bar - Refined luxury dark pill with high conversion hooks */}
            <div className="w-full bg-gradient-to-r from-[#1C1813] via-[#262018] to-[#120E0A] text-white py-2 px-3 sm:px-4 rounded-xl border border-[#D4AF37]/30 shadow-md flex items-center justify-between">
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-200" title="5.0 Star Rated Dental Clinic in Sirsa on Google">
                 <span className="text-[#D4AF37] text-sm leading-none drop-shadow">★</span>
                 <span className="tracking-tight font-bold text-[#FAF8F5]">5.0 Rated Clinic</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#9A7B4F]/60" />
              <div className="flex items-center gap-1.5 text-xs font-semibold text-gray-200">
                 <CheckCircle2 size={13} className="text-emerald-400 flex-shrink-0" />
                 <span className="tracking-tight">Painless Laser RCT</span>
              </div>
              <div className="w-1 h-1 rounded-full bg-[#9A7B4F]/60" />
              <div className="flex items-center gap-1.5 text-xs font-bold text-[#F3E5AB]">
                 <span className="bg-[#9A7B4F]/30 px-1.5 py-0.5 rounded border border-[#9A7B4F]/40 text-[11px]">Consult ₹200</span>
              </div>
            </div>

            {/* 2. Action Buttons - Ultra-compelling, high-converting CTAs */}
            <div className="grid grid-cols-3 gap-2 w-full">
                <a 
                  href="#book" 
                  aria-label="Book Dental Consultation at Elite Dental Clinic Sirsa"
                  className="col-span-1 relative group overflow-hidden flex items-center justify-center text-center bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] text-white font-extrabold py-2.5 px-2 rounded-xl shadow-md hover:shadow-lg hover:shadow-[#9A7B4F]/25 hover:brightness-110 transition-all text-xs active:scale-95 whitespace-nowrap"
                >
                   <span className="relative z-10 flex items-center gap-1">
                     Book Visit <span className="group-hover:translate-x-0.5 transition-transform">&rarr;</span>
                   </span>
                   <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />
                </a>
                <a 
                  href={`tel:${CAMPAIGN_CONFIG.phone}`} 
                  aria-label="Call Elite Dental Clinic Sirsa directly"
                  className="col-span-1 flex items-center justify-center gap-1.5 bg-white border border-gray-200/90 hover:border-[#9A7B4F] text-dark font-bold py-2.5 px-2 rounded-xl transition-all shadow-xs hover:shadow-sm text-xs active:scale-95 whitespace-nowrap hover:bg-[#FAF8F5]"
                >
                   <Phone size={13} className="text-[#9A7B4F]" />
                   <span>Call Now</span>
                </a>
                <button 
                  onClick={handleWhatsAppClick}
                  aria-label="Chat with Elite Dental Clinic Doctor on WhatsApp"
                  className="col-span-1 flex items-center justify-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-2 rounded-xl transition-all shadow-xs hover:shadow-sm hover:shadow-emerald-500/20 text-xs cursor-pointer active:scale-95 whitespace-nowrap"
                >
                   <MessageCircle size={13} />
                   <span>WhatsApp</span>
                </button>
            </div>

            {/* 3. Bottom Floating Stats - Trust signals & SEO-rich semantic social proof */}
            <div 
              itemScope 
              itemType="https://schema.org/Dentist" 
              className="w-full grid grid-cols-3 divide-x divide-gray-100 bg-white/95 backdrop-blur-sm shadow-md rounded-xl p-2.5 sm:py-3 border border-[#9A7B4F]/25 items-center hover:border-[#D4AF37]/50 transition-colors"
            >
              <meta itemProp="name" content="Elite Dental Clinic Sirsa" />
              <meta itemProp="telephone" content="+919306299901" />

              {/* Stat 1: Google Reviews */}
              <div className="flex items-center justify-center gap-2 px-1.5 text-left" itemProp="aggregateRating" itemScope itemType="https://schema.org/AggregateRating">
                <meta itemProp="ratingValue" content="5.0" />
                <meta itemProp="reviewCount" content="80" />
                <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#9A7B4F]/20 flex items-center justify-center shrink-0">
                  <Star size={14} className="text-[#9A7B4F] fill-[#9A7B4F]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-dark text-xs leading-tight">5.0 Star</span>
                  <span className="text-[9px] text-[#80633C] font-semibold uppercase tracking-tight">80+ REVIEWS</span>
                </div>
              </div>

              {/* Stat 2: Treatments */}
              <div className="flex items-center justify-center gap-2 px-1.5 text-left">
                <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#9A7B4F]/20 flex items-center justify-center shrink-0">
                  <Award size={14} className="text-[#9A7B4F]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-dark text-xs leading-tight">10,000+</span>
                  <span className="text-[9px] text-muted font-semibold uppercase tracking-tight">TREATMENTS</span>
                </div>
              </div>

              {/* Stat 3: Happy Patients */}
              <div className="flex items-center justify-center gap-2 px-1.5 text-left">
                <div className="w-7 h-7 rounded-lg bg-[#FAF8F5] border border-[#9A7B4F]/20 flex items-center justify-center shrink-0">
                  <Users size={14} className="text-[#9A7B4F]" />
                </div>
                <div className="flex flex-col">
                  <span className="font-extrabold text-dark text-xs leading-tight">5,000+</span>
                  <span className="text-[9px] text-muted font-semibold uppercase tracking-tight">PATIENTS</span>
                </div>
              </div>
            </div>

            {/* Quick micro-trust note for maximum instant conversion */}
            <div className="flex items-center justify-between px-1 text-[10px] text-gray-500 font-medium">
              <span className="flex items-center gap-1">
                <span className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></span>
                <span>Slots available for today</span>
              </span>
              <span className="text-gray-400">Zero waiting time with booking</span>
            </div>

          </div>
          
        </div>

        {/* Right Column Full Bleed Image Fade */}
        <div ref={rightRef} className="w-full lg:w-[45%] h-[28vh] sm:h-[36vh] lg:h-auto lg:absolute lg:top-0 lg:right-0 lg:bottom-0 overflow-hidden">
           
           {/* White fade gradient overlapping image smoothly */}
           <div className="absolute inset-y-0 left-0 w-24 bg-gradient-to-r from-white to-transparent z-10 hidden lg:block" />
           <div className="absolute inset-x-0 bottom-0 h-20 bg-gradient-to-t from-white to-transparent z-10 hidden lg:block" />
           <div className="absolute inset-x-0 bottom-0 h-16 bg-gradient-to-t from-white to-transparent z-10 lg:hidden" />

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
