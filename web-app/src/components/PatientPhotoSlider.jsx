import React from 'react';
import { Heart, Sparkles, CheckCircle2 } from 'lucide-react';

const IMAGES = Array.from({ length: 13 }, (_, i) => ({
  src: `/images/patient-${i + 1}.webp`,
  alt: `Happy Patient ${i + 1} at Elite Dental Clinic Sirsa`,
}));

export default function PatientPhotoSlider() {
  return (
    <section id="patient-gallery" className="py-7 md:py-9 bg-[#FCFAF7] relative z-20 overflow-hidden border-b border-[#9A7B4F]/15">
      {/* Header */}
      <div className="max-w-5xl mx-auto px-4 mb-5 text-center flex flex-col items-center">
        <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white border border-[#9A7B4F]/25 shadow-xs mb-2">
          <Heart size={12} className="text-[#9A7B4F] fill-[#9A7B4F]" />
          <span className="text-[10px] font-bold text-dark tracking-wider uppercase">
            100% Real Patient Smiles
          </span>
        </div>

        <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight">
          Patient <span className="text-[#9A7B4F]">Smiles Gallery</span>
        </h2>
        <p className="text-muted font-sans text-[11px] sm:text-xs max-w-xl mx-auto mt-1">
          Actual smiling patients who received gentle, pain-free dental care at Elite Dental Clinic Sirsa.
        </p>
      </div>

      {/* Infinite Continuous Slider Container */}
      <div className="relative w-full overflow-hidden group">
        
        {/* Ambient Gradient Edge Fades */}
        <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FCFAF7] to-transparent z-10 pointer-events-none" />
        <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FCFAF7] to-transparent z-10 pointer-events-none" />

        {/* Continuous Track */}
        <div className="flex w-max animate-[galleryScroll_38s_linear_infinite] hover:[animation-play-state:paused] items-center gap-3.5 sm:gap-4 py-3">
          {[...IMAGES, ...IMAGES, ...IMAGES].map((item, idx) => (
            <div
              key={idx}
              className="relative w-48 sm:w-56 md:w-64 aspect-[4/3] rounded-2xl overflow-hidden shadow-sm hover:shadow-xl border border-[#9A7B4F]/20 hover:border-[#9A7B4F]/60 transition-all duration-300 shrink-0 group/card bg-white cursor-pointer hover:-translate-y-1"
            >
              <img
                src={item.src}
                alt={item.alt}
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover group-hover/card:scale-105 transition-transform duration-500"
              />

              {/* Gradient Bottom Shadow */}
              <div className="absolute inset-x-0 bottom-0 h-14 bg-gradient-to-t from-black/60 via-black/20 to-transparent pointer-events-none" />

              {/* Verified Badge */}
              <div className="absolute bottom-2 left-2 flex items-center gap-1 bg-black/60 backdrop-blur-xs text-white text-[9px] font-bold px-2 py-0.5 rounded-full border border-white/20">
                <CheckCircle2 size={10} className="text-emerald-400 fill-emerald-400/20" />
                <span>Verified Smile</span>
              </div>

              {/* Top Shimmer border */}
              <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-transparent via-[#D4AF37] to-transparent opacity-0 group-hover/card:opacity-100 transition-opacity duration-300" />
            </div>
          ))}
        </div>

      </div>

      {/* CSS Keyframes for infinite marquee */}
      <style jsx>{`
        @keyframes galleryScroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333333%); }
        }
      `}</style>
    </section>
  );
}
