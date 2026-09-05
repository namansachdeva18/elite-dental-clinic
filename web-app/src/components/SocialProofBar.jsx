import React from 'react';

const HIGHLIGHTS = [
  { icon: "⭐", title: "5.0 Rating", subtitle: "80+ Google Reviews" },
  { icon: "🦷", title: "Thousands of Smiles", subtitle: "Restored in Sirsa" },
  { icon: "🛡️", title: "PGI Protocols", subtitle: "Hospital-Grade Hygiene" },
  { icon: "⚡", title: "Laser Dentistry", subtitle: "Zero Discomfort" },
  { icon: "🩺", title: "Single-Sitting RCT", subtitle: "Painless Treatment" },
  { icon: "✨", title: "Cosmetic Design", subtitle: "Zirconia & Aligners" },
  { icon: "🚑", title: "Emergency Dental", subtitle: "Priority Assistance" },
];

export default function SocialProofBar() {
  return (
    <section className="py-2.5 bg-gradient-to-r from-[#18140F] via-[#211B14] to-[#18140F] text-white overflow-hidden relative border-y border-[#9A7B4F]/30 w-full shadow-inner">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-28 bg-gradient-to-r from-[#18140F] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-28 bg-gradient-to-l from-[#18140F] to-transparent z-10 pointer-events-none" />

      {/* Infinite Seamless Ticker */}
      <div className="flex w-max animate-[scroll_32s_linear_infinite] hover:[animation-play-state:paused] items-center">
        {[...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS, ...HIGHLIGHTS].map((item, i) => (
          <div
            key={i}
            className="flex items-center gap-2.5 px-4 md:px-6 whitespace-nowrap shrink-0 group cursor-default"
          >
            {/* Pill Card */}
            <div className="flex items-center gap-2 bg-white/5 border border-[#9A7B4F]/30 group-hover:border-[#D4AF37] px-3 py-1.5 rounded-full transition-all duration-300 group-hover:bg-[#9A7B4F]/15">
              <span className="text-xs shrink-0">{item.icon}</span>
              <span className="text-[11px] sm:text-xs font-bold text-white tracking-wide">
                {item.title}
              </span>
              <span className="text-[10px] sm:text-[11px] text-[#F3E5AB]/80 font-normal">
                • {item.subtitle}
              </span>
            </div>

            {/* Separator Diamond */}
            <span className="text-[#9A7B4F]/40 text-[9px] select-none pl-1">✦</span>
          </div>
        ))}
      </div>

      <style jsx>{`
        @keyframes scroll {
          0% { transform: translateX(0); }
          100% { transform: translateX(-50%); }
        }
      `}</style>
    </section>
  );
}

