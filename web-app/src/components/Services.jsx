import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { 
  Sparkles, 
  Layers, 
  Scissors, 
  Activity, 
  ShieldCheck, 
  Zap, 
  Crown, 
  Moon, 
  Smile, 
  Shield, 
  HeartHandshake, 
  Stethoscope, 
  ArrowUpRight,
  Wind,
  CheckCircle2
} from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const ALL_TREATMENTS = [
  {
    id: "service-veneers",
    title: "Veneers & Laminates",
    desc: "Ultra-thin custom German porcelain shells to correct chips, gaps, and severe discolouration permanently.",
    tag: "Hollywood Smile",
    category: "COSMETIC",
    pageUrl: "/services/porcelain-veneers",
    Icon: Smile
  },
  {
    id: "service-smile-design",
    title: "Smile Design",
    desc: "Complete aesthetic transformation combining 3D digital smile design, veneers, and alignment planning.",
    tag: "3D Digital Design",
    category: "COSMETIC",
    pageUrl: "/services/smile-makeover",
    Icon: Sparkles
  },
  {
    id: "service-crowns",
    title: "Crowns & Bridges",
    desc: "Metal-free Zirconia with 10-year warranty card & German ceramic for durable tooth restoration.",
    tag: "10-Yr Warranty",
    category: "RESTORATIVE",
    pageUrl: "/services/dental-crowns-and-bridges",
    Icon: Crown
  },
  {
    id: "service-rct",
    title: "Root Canal (RCT)",
    desc: "Modern, virtually painless rotary & laser root canal therapy to save infected natural teeth without extraction.",
    tag: "Painless Rotary",
    category: "RESTORATIVE",
    pageUrl: "/services/root-canal-treatment",
    Icon: Activity
  },
  {
    id: "service-implants",
    title: "Dental Implants",
    desc: "Permanent titanium and zirconia tooth replacements designed for lifelong biting strength and natural looks.",
    tag: "Lifetime Strength",
    category: "RESTORATIVE",
    pageUrl: "/services/dental-implants",
    Icon: ShieldCheck
  },
  {
    id: "service-braces",
    title: "Clear Aligners & Braces",
    desc: "Invisible customized aligners and precision self-ligating brackets for teens and adults with rapid alignment.",
    tag: "Invisible Align",
    category: "COSMETIC",
    pageUrl: "/services/braces-and-aligners",
    Icon: Layers
  },
  {
    id: "service-wisdom",
    title: "Wisdom Surgery",
    desc: "Specialized minor oral surgery for impacted 3rd molars and instant wisdom tooth pain relief.",
    tag: "Oral Surgery",
    category: "SURGICAL",
    pageUrl: "/services/wisdom-tooth-extraction",
    Icon: Scissors
  },
  {
    id: "service-extractions",
    title: "Painless Extractions",
    desc: "Gentle, atraumatic tooth extractions performed under local anaesthesia with minimal downtime.",
    tag: "Atraumatic Care",
    category: "SURGICAL",
    pageUrl: "/services/wisdom-tooth-extraction",
    Icon: HeartHandshake
  },
  {
    id: "service-laser-fillings",
    title: "Laser Fillings",
    desc: "Tooth-coloured light-cured composite resin fillings & aesthetic dental crystal jewellery.",
    tag: "Laser Cured",
    category: "GENERAL",
    pageUrl: "/services/root-canal-treatment",
    Icon: Zap
  },
  {
    id: "service-dentures",
    title: "Dentures",
    desc: "Latest flexible dentures, acrylic full/RPD dentures, and implant-supported fixed overdentures.",
    tag: "Flexible & Implant",
    category: "RESTORATIVE",
    pageUrl: "/services/dental-implants",
    Icon: Shield
  },
  {
    id: "service-whitening",
    title: "Teeth Whitening",
    desc: "6–10 shades brighter teeth in 45 minutes using in-clinic LED bleaching systems and take-home kits.",
    tag: "Instant Results",
    category: "COSMETIC",
    pageUrl: "/services/teeth-whitening",
    Icon: Sparkles
  },
  {
    id: "service-scaling",
    title: "Laser Scaling",
    desc: "Ultrasonic scaling for pyorrhoea, bleeding gums, bad breath treatment & deep periodontal maintenance.",
    tag: "Ultrasonic Clean",
    category: "GENERAL",
    Icon: Stethoscope
  },
  {
    id: "service-airway",
    title: "Airway Orthodontics",
    desc: "Pediatric & adult maxillary expansion widening upper dental arches and nasal breathing passages.",
    tag: "Healthy Breathing",
    category: "GENERAL",
    Icon: Wind
  },
  {
    id: "service-sleep-apnea",
    title: "Sleep Apnea Care",
    desc: "Custom-milled Mandibular Advancement Devices (MAD) as a comfortable, quiet alternative to CPAP masks.",
    tag: "CPAP Alternative",
    category: "GENERAL",
    Icon: Moon
  },
  {
    id: "service-tmj",
    title: "TMJ & Jaw Joint Care",
    desc: "End jaw clicking, locking, facial migraines, and clenching with precision Michigan decompression splints.",
    tag: "Joint Relief",
    category: "GENERAL",
    Icon: Activity
  },
  {
    id: "service-tongue-tie",
    title: "Tongue Tie Release",
    desc: "Gentle, 5-minute bloodless laser frenectomy for infants, children, and adults with zero stitches.",
    tag: "Zero-Blood Laser",
    category: "SURGICAL",
    Icon: Scissors
  }
];

export default function Services() {
  const [activeCategory, setActiveCategory] = useState('ALL');
  const containerRef = useRef(null);

  const categories = [
    { id: 'ALL', label: 'All Services' },
    { id: 'COSMETIC', label: 'Smile & Cosmetic' },
    { id: 'RESTORATIVE', label: 'Implants & Restorative' },
    { id: 'SURGICAL', label: 'Laser & Surgery' },
    { id: 'GENERAL', label: 'General & Preventive' }
  ];

  const filteredServices = activeCategory === 'ALL' 
    ? ALL_TREATMENTS 
    : ALL_TREATMENTS.filter(s => s.category === activeCategory);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.fromTo('.treatment-luxury-card', 
        { y: 18, opacity: 0 },
        {
          y: 0,
          opacity: 1,
          duration: 0.45,
          stagger: 0.04,
          ease: 'power2.out',
        }
      );
    }, containerRef);
    return () => ctx.revert();
  }, [activeCategory]);

  return (
    <section ref={containerRef} id="services" className="py-8 md:py-12 px-3 sm:px-6 lg:px-12 bg-[#120E0A] text-white border-b border-[#9A7B4F]/25 relative overflow-hidden">
      
      {/* Ambient background gold glow spots */}
      <div className="absolute top-0 right-1/4 w-96 h-96 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none" />
      <div className="absolute bottom-0 left-1/4 w-96 h-96 bg-[#9A7B4F]/5 rounded-full blur-3xl pointer-events-none" />

      <div className="max-w-6xl mx-auto relative z-10">
        
        {/* Section Header */}
        <div className="text-center max-w-2xl mx-auto mb-6">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#D4AF37] uppercase font-bold bg-[#261E14] border border-[#9A7B4F]/30 px-3 py-1 rounded-full inline-block mb-1.5 shadow-xs">
            Advanced Treatments • Sirsa
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-extrabold text-white tracking-tight mt-1 mb-1.5">
            Clinical Excellence. <span className="bg-gradient-to-r from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] bg-clip-text text-transparent">Zero Discomfort.</span>
          </h2>
          <p className="font-sans text-gray-300 text-xs sm:text-sm max-w-lg mx-auto">
            Specialized clinical excellence across aesthetic smile makeovers, laser surgery, and tooth replacements.
          </p>
        </div>

        {/* 2-Columns on Mobile (grid-cols-2), 2 on Tablet, 3 on Desktop */}
        <div className="grid grid-cols-2 md:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3.5">
          {filteredServices.map((service) => {
            const IconComponent = service.Icon;
            const targetUrl = service.pageUrl || "#book";
            return (
              <a
                key={service.id}
                id={service.id}
                href={targetUrl}
                title={`Learn more about ${service.title} in Sirsa`}
                className="treatment-luxury-card bg-gradient-to-b from-[#1C1813] via-[#17130F] to-[#120E0A] p-3 sm:p-4 rounded-xl sm:rounded-2xl border border-[#9A7B4F]/25 hover:border-[#D4AF37] hover:shadow-[0_8px_30px_rgba(212,175,55,0.2)] active:scale-95 transition-all duration-300 flex flex-col justify-between group relative overflow-hidden cursor-pointer"
              >
                {/* Metallic Shimmer Sweep on Hover/Tap */}
                <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/10 to-transparent skew-x-[-20deg] group-hover:animate-shimmerSweep pointer-events-none" />

                {/* Ambient Golden Flare */}
                <div className="absolute -top-10 -right-10 w-20 h-20 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/25 transition-colors" />

                <div>
                  {/* Top Bar: Icon + EXPLORE Button */}
                  <div className="flex items-center justify-between mb-2">
                    <div className="w-7 h-7 sm:w-8 sm:h-8 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 group-hover:border-[#D4AF37] transition-all">
                      <IconComponent size={15} className="sm:w-[17px] sm:h-[17px] text-[#D4AF37]" />
                    </div>

                    {/* Explore Badge with Arrow */}
                    <div className="flex items-center gap-1 bg-[#2B2317]/80 group-hover:bg-[#D4AF37] text-[#D4AF37] group-hover:text-[#120E0A] px-2 py-0.5 rounded-full border border-[#9A7B4F]/40 group-hover:border-[#D4AF37] text-[9px] font-mono font-bold tracking-wider transition-all">
                      <span>EXPLORE</span>
                      <ArrowUpRight size={10} className="group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                    </div>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-bold text-xs sm:text-sm text-white group-hover:text-[#EADBB6] transition-colors mb-1 leading-snug">
                    {service.title}
                  </h3>

                  {/* Description */}
                  <p className="font-sans text-gray-300 text-[10px] sm:text-xs leading-relaxed line-clamp-2 sm:line-clamp-3 mb-2.5">
                    {service.desc}
                  </p>
                </div>

                {/* Bottom Tag Pill */}
                <div className="pt-2 border-t border-dashed border-white/10 flex items-center justify-between">
                  <span className="inline-block text-[9px] sm:text-[10px] font-mono font-semibold text-[#D4AF37] bg-[#D4AF37]/10 border border-[#D4AF37]/25 px-2 py-0.5 rounded-full group-hover:bg-[#D4AF37]/20 transition-colors">
                    {service.tag}
                  </span>
                  <span className="text-[9px] text-gray-400 font-sans hidden sm:inline group-hover:text-[#F3E5AB]">
                    View Details &rarr;
                  </span>
                </div>
              </a>
            );
          })}
        </div>

      </div>
    </section>
  );
}

