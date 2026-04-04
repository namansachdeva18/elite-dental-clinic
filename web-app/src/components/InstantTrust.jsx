import React from 'react';
import { Quote } from 'lucide-react';

const MINI_TESTIMONIALS = [
  { text: "Pain gone in 1 visit", sub: "Rahul S." },
  { text: "Very humble doctor", sub: "Sneha M." },
  { text: "Quick diagnosis", sub: "Karan V." },
  { text: "Extremely hygienic", sub: "Priya T." }
];

export default function InstantTrust() {
  return (
    <section className="py-12 bg-white border-y border-gray-100 relative z-20 shadow-[0_-10px_30px_rgba(0,0,0,0.02)]">
      <div className="max-w-7xl mx-auto px-6 md:px-16 flex flex-col md:flex-row items-center justify-between gap-8">
        
        <div className="flex-shrink-0 text-center md:text-left">
           <h3 className="font-display text-2xl font-bold text-dark tracking-tight">Why Patients Choose Us<br/>in Sirsa</h3>
        </div>

        <div className="hidden md:block w-px h-16 bg-gray-200"></div>

        <div className="flex flex-wrap justify-center gap-4">
          {MINI_TESTIMONIALS.map((t, i) => (
             <div key={i} className="flex flex-col items-center md:items-start bg-[#FDFBF7] px-5 py-3 rounded-xl border border-[#9A7B4F]/10">
                <div className="flex items-center gap-2 mb-1 text-[#9A7B4F]">
                  <Quote size={14} className="fill-[#9A7B4F]/20" />
                  <span className="font-sans font-bold text-sm text-dark">"{t.text}"</span>
                </div>
                <div className="font-sans text-xs text-muted font-semibold ml-[22px]">- {t.sub}</div>
             </div>
          ))}
        </div>

      </div>
    </section>
  );
}
