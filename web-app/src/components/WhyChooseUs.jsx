import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Shield, Zap, Award, Tag, Sparkles, Clock } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REASONS = [
  {
    title: "Pain-Free Treatment",
    desc: "Advanced techniques ensuring your absolute comfort.",
    icon: <Shield className="w-8 h-8 text-[#9A7B4F]" />
  },
  {
    title: "Latest Technology",
    desc: "Laser dentistry and digital scanners for precision.",
    icon: <Zap className="w-8 h-8 text-[#9A7B4F]" />
  },
  {
    title: "Experienced Dentist",
    desc: "Trusted by 1000+ patients in Sirsa.",
    icon: <Award className="w-8 h-8 text-[#9A7B4F]" />
  },
  {
    title: "Affordable Pricing",
    desc: "Consultation starting at just ₹200.",
    icon: <Tag className="w-8 h-8 text-[#9A7B4F]" />
  },
  {
    title: "Hygiene & Safety",
    desc: "Strict 100% sterilization protocols.",
    icon: <Sparkles className="w-8 h-8 text-[#9A7B4F]" />
  },
  {
    title: "Fast Service",
    desc: "Quick diagnosis and prompt care.",
    icon: <Clock className="w-8 h-8 text-[#9A7B4F]" />
  }
];

export default function WhyChooseUs() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.reason-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="why-us" className="py-24 px-6 md:px-16 bg-white border-b border-gray-100">
      <div className="max-w-6xl mx-auto">
        <div className="text-center mb-16">
          <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4">Why Choose Elite Dental Clinic</h3>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight">
            The Highest Standard of Care.
          </h2>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {REASONS.map((reason, i) => (
            <div key={i} className="reason-card bg-[#FDFBF7] p-8 rounded-2xl border border-[#9A7B4F]/10 flex gap-4 items-start hover:shadow-md transition-shadow">
              <div className="bg-white p-3 rounded-xl shadow-sm border border-gray-100 shrink-0">
                {reason.icon}
              </div>
              <div>
                <h4 className="font-sans font-bold text-lg text-dark mb-1">{reason.title}</h4>
                <p className="font-sans text-muted text-sm">{reason.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
