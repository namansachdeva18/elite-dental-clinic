import React from 'react';

const STATS = [
  "⭐ 5.0 Rating (46+ Reviews)",
  "🦷 1000+ Happy Patients",
  "🛡️ Advanced Laser Equipment",
  "🚑 24/7 Emergency Support",
  "✅ Hygienic Environment"
];

const LOGOS = [
  "Laser Dentistry",
  "Root Canal Specialists",
  "Pain-Free Extractions",
  "Premium Implants",
  "Cosmetic Smile Design"
];

export default function SocialProofBar() {
  return (
    <section className="py-6 md:py-10 bg-white overflow-hidden relative border-b border-gray-100 flex flex-col gap-6 w-full">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

      {/* Top Row - Brands/Technologies */}
      <div className="flex w-[200%] animate-[scroll_40s_linear_infinite]">
        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={`logo-${i}`} className="w-full flex-shrink-0 flex-1 flex justify-center text-lg md:text-xl font-display font-bold text-dark/10 uppercase tracking-widest px-4 md:px-8">
            {logo}
          </div>
        ))}
      </div>

      {/* Bottom Row - Key Stats */}
      <div className="flex w-[200%] animate-[scroll_35s_linear_infinite_reverse]">
        {[...STATS, ...STATS, ...STATS, ...STATS].map((stat, i) => (
          <div key={`stat-${i}`} className="w-full flex-shrink-0 flex-1 flex justify-center text-xs md:text-sm font-sans font-bold text-dark/80 px-4 md:px-8 whitespace-nowrap">
            {stat}
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
