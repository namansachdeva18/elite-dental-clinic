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
    <section ref={containerRef} id="why-us" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            The Highest Standard of Care
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mt-1 mb-1">
            Why Patients Choose <span className="text-[#9A7B4F]">Elite Dental</span>
          </h2>
          <p className="font-sans text-muted text-xs sm:text-sm">
            Engineered around absolute comfort, precision laser equipment, and transparent pricing in Sirsa.
          </p>
        </div>

        {/* Compact 2x3 Luxury Bento Matrix (Saves 60% scroll height) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {REASONS.map((reason, i) => {
            const IconComponent = reason.Icon;
            return (
              <div 
                key={i} 
                className="reason-card bg-gradient-to-b from-[#1C1813] to-[#120E0A] text-white p-4 sm:p-5 rounded-2xl border border-[#9A7B4F]/25 hover:border-[#D4AF37] hover:shadow-[0_8px_25px_rgba(154,123,79,0.18)] hover:-translate-y-1 transition-all duration-300 flex items-start gap-3.5 group relative overflow-hidden opacity-100"
              >
                {/* Gold Ambient Glow on Hover */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />

                <div className="bg-[#2B2317] border border-[#9A7B4F]/40 p-2.5 rounded-xl shrink-0 group-hover:scale-110 transition-transform text-[#D4AF37]">
                  <IconComponent size={20} className="text-[#D4AF37]" />
                </div>
                <div>
                  <h4 className="font-display font-bold text-sm sm:text-base text-white group-hover:text-[#EADBB6] transition-colors mb-0.5">
                    {reason.title}
                  </h4>
                  <p className="font-sans text-gray-300 text-xs leading-relaxed">
                    {reason.desc}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
