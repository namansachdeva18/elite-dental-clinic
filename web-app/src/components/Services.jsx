import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Sparkles, Layers, Scissors, Activity, ShieldCheck, Zap, Crown, Baby, Stethoscope } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const SERVICES = [
  {
    id: "service-implants",
    title: "Dental Implants in Sirsa",
    description: "Restore missing teeth permanently with advanced dental implants in Sirsa. Get a natural-looking and long-lasting smile solution.",
    icon: <ShieldCheck className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-braces",
    title: "Orthodontics & Braces",
    description: "Achieve perfectly aligned teeth with braces and clear aligners. Customized orthodontic treatments for all age groups.",
    icon: <Layers className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-smile-design",
    title: "Smile Designing",
    description: "Enhance your smile with personalized smile designing treatments using modern cosmetic dentistry techniques.",
    icon: <Sparkles className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-rct",
    title: "Root Canal Treatment (RCT) in Sirsa",
    description: "Pain-free root canal treatment using advanced laser technology. Save infected teeth with quick and comfortable procedures.",
    icon: <Activity className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-wisdom-tooth",
    title: "Wisdom Tooth Removal",
    description: "Safe and painless wisdom tooth extraction performed by experienced dental specialists.",
    icon: <Scissors className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-whitening",
    title: "Teeth Whitening in Sirsa",
    description: "Brighten your smile with professional teeth whitening treatments for instant visible results.",
    icon: <Zap className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-crowns",
    title: "Dental Crowns & Caps",
    description: "Protect and restore damaged teeth with high-quality dental crowns for long-lasting strength and aesthetics.",
    icon: <Crown className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-pediatric",
    title: "Pediatric Dentistry",
    description: "Gentle dental care for children in a safe and friendly environment ensuring healthy smiles from an early age.",
    icon: <Baby className="text-[#9A7B4F] w-8 h-8 mb-4" />
  },
  {
    id: "service-emergency",
    title: "Emergency Dental Care in Sirsa",
    description: "Get immediate treatment for dental pain, injury, or infection with our 24/7 emergency dental services.",
    icon: <Stethoscope className="text-[#9A7B4F] w-8 h-8 mb-4" />
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = React.useState('ALL');
  const containerRef = useRef(null);

  const categories = [
    { id: 'ALL', label: 'All Services' },
    { id: 'COSMETIC', label: 'Smile & Cosmetic' },
    { id: 'RESTORATIVE', label: 'Implants & Restorative' },
    { id: 'GENERAL', label: 'General & Preventive' }
  ];

  const categoryMap = {
    'service-implants': 'RESTORATIVE',
    'service-braces': 'COSMETIC',
    'service-smile-design': 'COSMETIC',
    'service-rct': 'RESTORATIVE',
    'service-wisdom-tooth': 'RESTORATIVE',
    'service-whitening': 'COSMETIC',
    'service-crowns': 'RESTORATIVE',
    'service-pediatric': 'GENERAL',
    'service-emergency': 'GENERAL'
  };

  const filteredServices = activeCategory === 'ALL' 
    ? SERVICES 
    : SERVICES.filter(s => categoryMap[s.id] === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.service-card', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 85%',
        },
        y: 25,
        duration: 0.5,
        stagger: 0.06,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={containerRef} id="services" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-[#FDFBF7] border-b border-[#9A7B4F]/15">
      <div className="max-w-7xl mx-auto">
        <h2 className="sr-only">Our Dental Services in Sirsa</h2>
        
        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Top Dental Clinic in Sirsa
          </span>
          <h3 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mt-1 mb-2">
            Premium Services. <span className="text-[#9A7B4F]">Zero Pain.</span>
          </h3>
          <p className="font-sans text-muted text-xs sm:text-sm">
            Explore advanced doctor-led treatments tailored for precision, comfort, and longevity.
          </p>
        </div>

        {/* Compact Interactive Filter Pills */}
        <div className="flex flex-wrap items-center justify-center gap-1.5 sm:gap-2 mb-8">
          {categories.map((cat) => (
            <button
              key={cat.id}
              onClick={() => setActiveCategory(cat.id)}
              className={`px-3.5 py-1.5 rounded-full text-xs font-bold transition-all cursor-pointer ${
                activeCategory === cat.id
                  ? 'bg-[#2B2317] text-[#EADBB6] shadow-md border border-[#D4AF37]/40 scale-105'
                  : 'bg-white text-gray-600 hover:text-dark border border-gray-200 hover:border-[#9A7B4F]/40'
              }`}
            >
              {cat.label}
            </button>
          ))}
        </div>

        {/* High-Density Compact Services Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 sm:gap-4 items-stretch">
          {filteredServices.map((service, i) => (
            <div key={service.id} id={service.id} className="service-card h-full w-full">
              <div className="group bg-white p-5 sm:p-6 rounded-2xl border border-[#9A7B4F]/20 shadow-xs hover:border-[#D4AF37] hover:shadow-[0_8px_25px_rgba(154,123,79,0.15)] hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between h-full relative overflow-hidden">
                
                {/* Decorative golden accent top bar */}
                <div className="absolute top-0 left-0 right-0 h-1 bg-gray-100 group-hover:bg-gradient-to-r group-hover:from-[#9A7B4F] group-hover:to-[#D4AF37] transition-all" />

                <div>
                  <div className="flex items-center justify-between mb-3">
                    <div className="w-10 h-10 rounded-xl bg-[#FAF8F5] border border-[#9A7B4F]/20 flex items-center justify-center text-[#9A7B4F] group-hover:scale-110 group-hover:text-[#80633C] transition-all">
                      {React.cloneElement(service.icon, { className: "w-5 h-5 mb-0" })}
                    </div>
                    <span className="text-[9px] font-mono font-bold uppercase tracking-wider text-[#9A7B4F] bg-[#FAF8F5] px-2 py-0.5 rounded-full border border-[#9A7B4F]/15">
                      Verified Care
                    </span>
                  </div>
                  
                  <h3 className="font-display font-bold text-base sm:text-lg text-dark mb-1.5 leading-snug group-hover:text-[#80633C] transition-colors">
                    {service.title}
                  </h3>
                  
                  <p className="font-sans text-muted text-xs leading-relaxed">
                    {service.description}
                  </p>
                </div>
                
                <div className="mt-4 pt-3 border-t border-gray-100 flex items-center justify-between">
                  <a href="#book" className="inline-flex items-center gap-1 text-xs font-bold text-[#9A7B4F] group-hover:text-dark transition-colors">
                    <span>Consult Doctor</span>
                    <span className="group-hover:translate-x-1 transition-transform">&rarr;</span>
                  </a>
                  <span className="text-[10px] text-gray-400 font-mono">Sirsa Clinic</span>
                </div>
              </div>
            </div>
          ))}
        </div>

      </div>
    </section>
  );
}
