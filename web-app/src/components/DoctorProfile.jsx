import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Phone, MessageCircle } from 'lucide-react';
import { trackPhoneCall, trackWhatsAppClick } from '../utils/tracking';
import doctorPhoto from '/images/doctor.webp?url';

gsap.registerPlugin(ScrollTrigger);

export default function DoctorProfile() {
  const sectionRef = useRef(null);
  const [imgSrc, setImgSrc] = useState(doctorPhoto || '/images/doctor.webp');

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.doc-element', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-6 sm:py-8 px-3.5 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#9A7B4F]/15 overflow-hidden">
      <div className="max-w-4xl mx-auto">
        
        {/* Main Card Container inspired by the screenshot */}
        <div className="bg-white rounded-3xl p-4 sm:p-6 md:p-8 shadow-[0_4px_30px_rgba(0,0,0,0.06)] border border-[#9A7B4F]/20 relative overflow-hidden doc-element">
          
          <div className="flex flex-col md:flex-row items-center gap-5 md:gap-8">
            
            {/* Left Column: Doctor Photo with Alive Organic Aura & Animated Sparkles */}
            <div className="flex flex-col items-center shrink-0 relative">
              
              {/* Pulsing Golden Aura Glow behind the portrait */}
              <div className="absolute inset-0 bg-gradient-to-tr from-[#9A7B4F]/25 via-[#D4AF37]/20 to-[#E8DCC4]/30 rounded-full blur-2xl animate-goldAura pointer-events-none" />

              <div className="relative w-44 h-48 sm:w-52 sm:h-56 flex items-center justify-center animate-floatSlow">
                
                {/* Dynamic Floating / Twinkling Sparkle Stars */}
                <span className="absolute -top-1 left-2 text-[#D4AF37] text-lg animate-spin" style={{ animationDuration: '8s' }}>✧</span>
                <span className="absolute top-1 -right-1 text-[#9A7B4F] text-2xl animate-bounce" style={{ animationDuration: '3.2s' }}>✦</span>
                <span className="absolute bottom-5 -left-2 text-[#B89355] text-xl animate-pulse">✦</span>
                <span className="absolute -bottom-1 right-3 text-[#D4AF37] text-sm animate-spin" style={{ animationDuration: '6s' }}>✧</span>

                {/* Tooth-shaped organic SVG silhouette mask background with gentle gradient border */}
                <div className="absolute inset-1.5 bg-gradient-to-b from-[#F9F5EC] via-[#EFE6D5] to-[#DFCDB3] rounded-[42%_42%_48%_48%/50%_50%_40%_40%] shadow-[inset_0_2px_10px_rgba(154,123,79,0.15)] border-2 border-[#9A7B4F]/35 transition-transform duration-500 hover:scale-105" />

                {/* Doctor Photo inside tooth frame */}
                <div className="relative w-36 h-42 sm:w-42 sm:h-48 rounded-[40%_40%_45%_45%/48%_48%_38%_38%] overflow-hidden shadow-lg border-[2.5px] border-white group/photo">
                  <img
                    src={imgSrc}
                    alt="Dr. Nandini Bansal - Chief Dental Surgeon"
                    loading="eager"
                    decoding="sync"
                    fetchPriority="high"
                    onError={() => {
                      if (imgSrc !== '/images/doctor.webp') {
                        setImgSrc('/images/doctor.webp');
                      } else {
                        setImgSrc('/images/hero-doctor.webp');
                      }
                    }}
                    className="w-full h-full object-cover object-top group-hover/photo:scale-108 transition-transform duration-700 ease-out"
                  />

                  {/* Status chip with alive radar ping */}
                  <span className="absolute bottom-1.5 inset-x-2 bg-black/80 backdrop-blur-sm text-white text-[8.5px] font-semibold py-0.5 rounded-full flex items-center justify-center gap-1.5 border border-emerald-400/40 shadow-xs">
                    <span className="relative flex h-2 w-2">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                      <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                    </span>
                    Available Today
                  </span>
                </div>
              </div>

              {/* Sub-pill badges directly under photo with subtle alive hover/pulse */}
              <div className="flex items-center gap-1.5 mt-2.5">
                <span className="bg-[#FAF6EE] text-[#9A7B4F] text-[10px] font-bold px-2.5 py-0.5 rounded-full border border-[#9A7B4F]/30 shadow-2xs hover:scale-105 transition-transform cursor-default">
                  ★ 5.0 Rated
                </span>
                <span className="bg-[#FAF6EE] text-[#80633C] text-[10px] font-semibold px-2.5 py-0.5 rounded-full border border-[#9A7B4F]/30 shadow-2xs hover:scale-105 transition-transform cursor-default flex items-center gap-1">
                  <span>1000+ Smiles</span>
                  <span className="animate-bounce">✨</span>
                </span>
              </div>
            </div>

            {/* Right Column: Meet Doctor, Title, Orange Chevron Bullet Points, & Action Bar */}
            <div className="flex flex-col text-left flex-1 w-full">
              
              {/* Meet Doctor Subtitle */}
              <div className="flex items-center justify-between gap-2 mb-0.5">
                <span className="font-sans text-xs font-semibold text-muted tracking-wide">
                  Meet Doctor
                </span>
                
                {/* Floating Quick Action Contacts (WhatsApp & Call) */}
                <div className="flex items-center gap-1.5">
                  <a
                    href="https://wa.me/919467624898?text=Hi%20Dr.%20Nandini,%20I%20would%20like%20to%20consult%20for%20dental%20treatment"
                    target="_blank"
                    rel="noopener noreferrer"
                    onClick={() => trackWhatsAppClick('Doctor_Profile')}
                    aria-label="WhatsApp Dr. Nandini"
                    className="w-7 h-7 rounded-full bg-[#25D366] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <MessageCircle size={14} className="fill-white" />
                  </a>
                  <a
                    href="tel:+919467624898"
                    onClick={() => trackPhoneCall('Doctor_Profile')}
                    aria-label="Call Clinic"
                    className="w-7 h-7 rounded-full bg-[#80633C] text-white flex items-center justify-center hover:scale-110 transition-transform shadow-xs cursor-pointer"
                  >
                    <Phone size={13} className="fill-white" />
                  </a>
                </div>
              </div>

              {/* Doctor Name */}
              <h3 className="font-display text-xl sm:text-2xl font-extrabold text-dark tracking-tight leading-tight">
                Dr. Nandini Bansal
              </h3>

              {/* Degree & Specialization */}
              <p className="font-sans text-xs sm:text-[13px] text-[#9A7B4F] font-bold mb-3">
                BDS • Root Canal, Laser & Smile Specialist
              </p>

              {/* Bullet points with the custom styled orange chevrons from screenshot */}
              <div className="flex flex-col gap-2 mb-4 text-xs sm:text-[12.5px] text-dark/85">
                
                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-sm leading-none shrink-0 mt-0.5">
                    ▶
                  </span>
                  <p className="leading-snug">
                    <strong className="text-dark font-semibold">Chief Dental Surgeon</strong> at Elite Dental Clinic Sirsa, delivering pain-free modern dentistry.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-sm leading-none shrink-0 mt-0.5">
                    ▶
                  </span>
                  <p className="leading-snug">
                    Specializing in <strong className="text-dark font-semibold">single-sitting Root Canals</strong>, zero-pain dental lasers, and crowns & bridges with PGI protocols.
                  </p>
                </div>

                <div className="flex items-start gap-2">
                  <span className="text-amber-500 font-bold text-sm leading-none shrink-0 mt-0.5">
                    ▶
                  </span>
                  <p className="leading-snug">
                    Dedicated to <strong className="text-dark font-semibold">100% sterilized, gentle care</strong> designed to eliminate dental fear for families and kids.
                  </p>
                </div>

              </div>

            </div>

          </div>

        </div>

      </div>
    </section>
  );
}

