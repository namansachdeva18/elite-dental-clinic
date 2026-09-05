import React, { useState, useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, Sparkles } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { label: "Advanced Dental Treatment Suite", desc: "Digital scanning and laser-assisted surgical operatory", src: "/images/gallery-1.webp", tag: "Treatment Room" },
  { label: "Private Consultation Lounge", desc: "Calm, doctor-patient evaluation rooms ensuring complete privacy", src: "/images/gallery-2.webp", tag: "Consultation" },
  { label: "Modern Clinic Interior & Hygiene", desc: "Multi-tier autoclave sterilization bay and clean facility", src: "/images/gallery-3.webp", tag: "Sterilization" },
  { label: "Comfortable Patient Reception", desc: "Spacious and relaxing air-conditioned waiting environment", src: "/images/gallery-4.webp", tag: "Lounge" },
  { label: "Gentle Pediatric Operatory", desc: "Specialized gentle tools designed to eliminate child anxiety", src: "/images/gallery-5.webp", tag: "Pediatric Care" },
  { label: "Clinic Exterior on Dabwali Road", desc: "Centrally located near Dr. Lal Path Lab with easy parking", src: "/images/gallery-6.webp", tag: "Location" }
];

export default function Gallery() {
  const [activePhoto, setActivePhoto] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const containerRef = useRef(null);

  // Auto-tour rotation every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setActivePhoto(prev => (prev + 1) % IMAGES.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-frame', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 30,
        opacity: 0,
        duration: 0.6,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="clinic-tour" className="py-8 md:py-10 px-4 sm:px-6 lg:px-12 bg-[#FDFBF7] border-b border-[#9A7B4F]/15">
      <div className="max-w-5xl mx-auto gallery-frame">
        <div className="text-center max-w-xl mx-auto mb-4">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Virtual Tour
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight mt-0.5 mb-1">
            Inside Elite <span className="text-[#9A7B4F]">Dental Clinic</span>
          </h2>
          <p className="font-sans text-muted text-[11px] sm:text-xs">
            Take an interactive tour of our world-class, hygienic facility in Sirsa.
          </p>
        </div>

        {/* Compact Interactive Spotlight Frame */}
        <div 
          className="bg-white rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-md relative overflow-hidden"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          {/* Top Live Progress Line */}
          <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-black/10 overflow-hidden">
            <div 
              key={activePhoto}
              className={`h-full bg-gradient-to-r from-[#9A7B4F] via-[#D4AF37] to-[#80633C] ${isPaused ? 'w-full' : 'animate-galleryProgress'}`}
            />
          </div>

          {/* Main Cinematic Viewport */}
          <div className="relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-gray-900 shadow-inner group">
            <img 
              key={activePhoto}
              src={IMAGES[activePhoto].src} 
              alt={IMAGES[activePhoto].label}
              className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 animate-fadeInReview"
              loading="lazy"
            />

            <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
              <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                <div key={`info-${activePhoto}`} className="animate-fadeInReview">
                  <div className="flex items-center gap-2 mb-1">
                    <span className="inline-block bg-[#D4AF37] text-[#1B140A] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                      {IMAGES[activePhoto].tag}
                    </span>
                    <span className="text-[9px] text-emerald-300 font-mono tracking-wider flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                      <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                      Auto-Tour
                    </span>
                  </div>
                  <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                    {IMAGES[activePhoto].label}
                  </h3>
                  <p className="font-sans text-xs text-gray-300 max-w-md hidden xs:block">
                    {IMAGES[activePhoto].desc}
                  </p>
                </div>

                {/* Arrow Controls */}
                <div className="flex items-center gap-1.5 self-end sm:self-auto">
                  <button 
                    onClick={() => setActivePhoto(prev => prev === 0 ? IMAGES.length - 1 : prev - 1)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-dark flex items-center justify-center backdrop-blur-sm transition-all shadow-xs cursor-pointer active:scale-90"
                    aria-label="Previous image"
                  >
                    <ChevronLeft size={16} />
                  </button>
                  <span className="font-mono text-[10px] text-white/90 font-bold px-1 min-w-[30px] text-center">
                    {activePhoto + 1}/{IMAGES.length}
                  </span>
                  <button 
                    onClick={() => setActivePhoto(prev => (prev + 1) % IMAGES.length)}
                    className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-dark flex items-center justify-center backdrop-blur-sm transition-all shadow-xs cursor-pointer active:scale-90"
                    aria-label="Next image"
                  >
                    <ChevronRight size={16} />
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Quick Select Thumbnails */}
          <div className="grid grid-cols-6 gap-2 mt-3">
            {IMAGES.map((img, idx) => (
              <button
                key={idx}
                onClick={() => setActivePhoto(idx)}
                className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all duration-200 cursor-pointer ${
                  activePhoto === idx 
                    ? 'border-[#9A7B4F] shadow-sm scale-[1.03]' 
                    : 'border-transparent opacity-60 hover:opacity-100'
                }`}
                aria-label={`View ${img.label}`}
              >
                <img src={img.src} alt={img.label} className="w-full h-full object-cover" />
                {activePhoto === idx && (
                  <div className="absolute inset-0 bg-[#9A7B4F]/20 pointer-events-none" />
                )}
              </button>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
