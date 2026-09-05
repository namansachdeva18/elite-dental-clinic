import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Award, Tag, Sparkles, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "Pain-Free Treatment",
    desc: "Advanced techniques ensuring your absolute comfort.",
    Icon: Shield
  },
  {
    title: "Latest Technology",
    desc: "Laser dentistry and digital scanners for precision.",
    Icon: Zap
  },
  {
    title: "Experienced Dentist",
    desc: "Trusted by thousands of happy patients in Sirsa.",
    Icon: Award
  },
  {
    title: "Affordable Pricing",
    desc: "Consultation starting at just ₹200.",
    Icon: Tag
  },
  {
    title: "Hygiene & Safety",
    desc: "Strict 100% sterilization protocols.",
    Icon: Sparkles
  },
  {
    title: "Fast Service",
    desc: "Quick diagnosis and prompt care.",
    Icon: Clock
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.reason-card', 
        { y: 20, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.5,
          stagger: 0.08,
          ease: 'power2.out',
          scrollTrigger: {
            trigger: containerRef.current,
            start: 'top 90%',
          }
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-us" className="py-8 md:py-10 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            The Highest Standard of Care
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight mt-0.5 mb-1">
            Why Patients Choose <span className="text-[#9A7B4F]">Elite Dental</span>
          </h2>
          <p className="font-sans text-muted text-[11px] sm:text-xs">
            Engineered around absolute comfort, precision laser equipment, and transparent pricing in Sirsa.
          </p>
        </div>

        {/* 2-Columns on Mobile Grid (grid-cols-2), 3-Columns on Desktop */}
        <div className="grid grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3">
          {REASONS.map((reason, i) => {
            const IconComponent = reason.Icon;
            return (
              <a 
                key={i} 
                href="#book"
                title={`Book consultation for ${reason.title}`}
                className="reason-card bg-gradient-to-b from-[#1C1813] via-[#17130F] to-[#100C08] text-white p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#9A7B4F]/25 hover:border-[#D4AF37] hover:shadow-[0_8px_25px_rgba(212,175,55,0.22)] active:scale-95 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
              >
                {/* Cool Shimmer Sweep Animation on Hover */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-shimmerSweep pointer-events-none" />
                
                {/* Gold Ambient Glow corner */}
                <div className="absolute -top-8 -right-8 w-16 h-16 bg-[#D4AF37]/15 rounded-full blur-lg pointer-events-none group-hover:bg-[#D4AF37]/35 transition-colors" />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <div className="bg-[#2B2317] border border-[#9A7B4F]/40 p-1.5 sm:p-2 rounded-lg shrink-0 group-hover:scale-110 group-hover:border-[#D4AF37] transition-all text-[#D4AF37]">
                      <IconComponent size={16} className="sm:w-[18px] sm:h-[18px] text-[#D4AF37]" />
                    </div>
                    
                    {/* Lead Generation Tag */}
                    <span className="text-[8px] sm:text-[9px] font-mono font-bold uppercase tracking-wider text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/20 px-1.5 py-0.5 rounded group-hover:bg-[#D4AF37] group-hover:text-dark transition-colors">
                      Book ₹200
                    </span>
                  </div>

                  <h4 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#EADBB6] transition-colors mb-1 leading-tight">
                    {reason.title}
                  </h4>
                  <p className="font-sans text-gray-300 text-[10px] sm:text-xs leading-snug line-clamp-2 sm:line-clamp-none">
                    {reason.desc}
                  </p>
                </div>

                {/* Lead-Generating Micro Action Link */}
                <div className="mt-2.5 pt-2 border-t border-white/10 flex items-center justify-between text-[10px] font-semibold text-[#D4AF37]">
                  <span className="group-hover:underline">Consult Now</span>
                  <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                </div>
              </a>
            );
          })}
        </div>
      </div>
    </section>
  );
}
