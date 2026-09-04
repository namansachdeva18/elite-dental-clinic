import React from 'react';

const STATS = [
  "⭐ 5.0 Google Rating (80+ Verified Reviews)",
  "🦷 Thousands of Happy Smiles in Sirsa",
  "🛡️ Zero-Discomfort Laser Technology",
  "✨ Hospital-Grade 100% Sterilization",
  "🩺 Doctor-Led Consultation Just ₹200",
  "🚑 24/7 Dental Emergency Assistance"
];

const LOGOS = [
  "Laser Dentistry",
  "Root Canal Specialists",
  "Dental Implants",
  "Cosmetic Smile Design",
  "Clear Aligners & Braces",
  "Zirconia Aesthetic Crowns"
];

export default function SocialProofBar() {
  return (
    <section className="py-4 md:py-6 bg-[#FCFAF7] overflow-hidden relative border-y border-[#9A7B4F]/15 flex flex-col gap-3 w-full">
      {/* Edge Fades */}
      <div className="absolute inset-y-0 left-0 w-16 md:w-32 bg-gradient-to-r from-[#FCFAF7] to-transparent z-10 pointer-events-none" />
      <div className="absolute inset-y-0 right-0 w-16 md:w-32 bg-gradient-to-l from-[#FCFAF7] to-transparent z-10 pointer-events-none" />

      {/* Top Row - Key Stats with luxury badge accents */}
      <div className="flex w-[200%] animate-[scroll_40s_linear_infinite]">
        {[...STATS, ...STATS, ...STATS, ...STATS].map((stat, i) => (
          <div key={`stat-${i}`} className="w-full flex-shrink-0 flex-1 flex justify-center text-xs md:text-sm font-sans font-bold text-dark/90 px-4 md:px-8 whitespace-nowrap">
            <span className="bg-white/90 border border-[#9A7B4F]/20 px-3 py-1 rounded-full shadow-xs">
              {stat}
            </span>
          </div>
        ))}
      </div>

      {/* Bottom Row - Clinical Disciplines */}
      <div className="flex w-[200%] animate-[scroll_45s_linear_infinite_reverse]">
        {[...LOGOS, ...LOGOS, ...LOGOS, ...LOGOS].map((logo, i) => (
          <div key={`logo-${i}`} className="w-full flex-shrink-0 flex-1 flex justify-center text-xs md:text-sm font-mono font-bold text-[#80633C]/70 uppercase tracking-widest px-4 md:px-8">
            • {logo}
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
