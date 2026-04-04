import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, Scissors, Activity, ShieldCheck, Zap, Crown, Baby, Stethoscope } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    title: "Dental Implants in Sirsa",
    description: "Restore missing teeth permanently with advanced dental implants in Sirsa. Get a natural-looking and long-lasting smile solution.",
    icon: <ShieldCheck className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Orthodontics & Braces",
    description: "Achieve perfectly aligned teeth with braces and clear aligners. Customized orthodontic treatments for all age groups.",
    icon: <Layers className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Smile Designing",
    description: "Enhance your smile with personalized smile designing treatments using modern cosmetic dentistry techniques.",
    icon: <Sparkles className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Root Canal Treatment (RCT) in Sirsa",
    description: "Pain-free root canal treatment using advanced laser technology. Save infected teeth with quick and comfortable procedures.",
    icon: <Activity className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Wisdom Tooth Removal",
    description: "Safe and painless wisdom tooth extraction performed by experienced dental specialists.",
    icon: <Scissors className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Teeth Whitening in Sirsa",
    description: "Brighten your smile with professional teeth whitening treatments for instant visible results.",
    icon: <Zap className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Dental Crowns & Caps",
    description: "Protect and restore damaged teeth with high-quality dental crowns for long-lasting strength and aesthetics.",
    icon: <Crown className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Pediatric Dentistry",
    description: "Gentle dental care for children in a safe and friendly environment ensuring healthy smiles from an early age.",
    icon: <Baby className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    title: "Emergency Dental Care in Sirsa",
    description: "Get immediate treatment for dental pain, injury, or infection with our 24/7 emergency dental services.",
    icon: <Stethoscope className="text-[#9A7B4F] w-8 h-8 mb-4" />
  }
];

export default function Services() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        duration: 0.6,
        stagger: 0.1,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="services" className="py-24 px-6 md:px-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Our Dental Services in Sirsa</h2>
        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 text-center">Top Dental Clinic in Sirsa</h3>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-dark text-center mb-16 tracking-tight">
          Premium Services. <span className="text-[#9A7B4F]">Zero Pain.</span>
        </h3>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 items-stretch">
          {SERVICES.map((service, i) => (
            <div key={i} className="service-card h-full w-full">
              <div className="group bg-white p-6 md:p-8 rounded-2xl border border-gray-100 shadow-sm transition-all duration-300 hover:shadow-lg hover:-translate-y-1 flex flex-col justify-between h-full relative overflow-hidden m-0">
                {/* Decorative border highlight */}
                <div className="absolute top-0 left-0 w-full h-1 bg-gray-100 group-hover:bg-[#9A7B4F] transition-colors" />

                <div className="flex flex-col flex-grow items-start justify-start w-full">
                  <div className="h-14 flex items-start justify-start w-full m-0 p-0">
                     <span className="block">{service.icon}</span>
                     <span className="sr-only" aria-label={`Icon representing ${service.title}`}></span>
                  </div>
                  
                  <h3 className="font-sans font-bold text-xl text-dark mb-3 mt-0 leading-tight w-full">{service.title}</h3>
                  <p className="font-sans text-muted text-sm font-medium leading-relaxed m-0 w-full">{service.description}</p>
                </div>
                
                <div className="mt-8 flex-shrink-0 w-full">
                  <a href="#book" className="inline-flex items-center text-sm font-bold text-[#9A7B4F] group-hover:text-dark transition-colors">
                    Learn More &rarr;
                  </a>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
