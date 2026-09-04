import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TRANSFORMATIONS = [
  {
    category: "Crowns & Bridges",
    desc: "Restore damaged or missing teeth with natural-looking crowns and bridges for a strong and confident smile.",
    imgBefore: "/images/crowns-before.webp",
    imgAfter: "/images/crowns-after.webp"
  },
  {
    category: "Teeth Whitening",
    desc: "Achieved a 6-shade brighter smile in a single 45-minute painless session.",
    imgBefore: "/images/before-1.webp",
    imgAfter: "/images/after-1.webp"
  },
  {
    category: "Braces Transformation",
    desc: "Complete alignment correction using advanced precision orthodontics over 12 months.",
    imgBefore: "/images/before-2.webp",
    imgAfter: "/images/after-2.webp"
  },
  {
    category: "Smile Makeover",
    desc: "Restored chipped and uneven teeth using natural-looking cosmetic laminates.",
    imgBefore: "/images/before-3.webp",
    imgAfter: "/images/after-3.webp"
  }
];

export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const containerRef = useRef(null);

  const slideNext = () => setCurrentIndex(prev => (prev + 1) % TRANSFORMATIONS.length);
  const slidePrev = () => setCurrentIndex(prev => (prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1));

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-element', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 30,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power2.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="results" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#9A7B4F]/15">
      <div className="max-w-5xl mx-auto flex flex-col items-center ba-element">

        <div className="text-center max-w-xl mx-auto mb-6">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Real Transformations
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mt-1 mb-1">
            Results That <span className="text-[#9A7B4F]">Speak For Themselves</span>
          </h2>
          <p className="font-sans text-muted text-xs sm:text-sm">
            Real clinical smile restorations performed at Elite Dental Clinic Sirsa.
          </p>
        </div>

        <div className="bg-white rounded-2xl shadow-md border border-gray-200/80 p-4 sm:p-7 w-full ba-element">
          <div className="flex flex-col sm:flex-row gap-4 items-center">

            {/* Before Img Block */}
            <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden group bg-gray-100 h-56 sm:h-72 flex items-center justify-center shadow-inner">
              <img
                src={TRANSFORMATIONS[currentIndex].imgBefore}
                alt="Before treatment in Sirsa clinic"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 left-3 bg-black/80 backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider z-10 shadow-xs">
                BEFORE
              </div>
            </div>

            {/* After Img Block */}
            <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden group bg-gray-100 h-56 sm:h-72 flex items-center justify-center shadow-inner">
              <img
                src={TRANSFORMATIONS[currentIndex].imgAfter}
                alt="After treatment in Sirsa clinic"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-3 right-3 bg-[#9A7B4F] backdrop-blur-md text-white px-3 py-1 rounded-full text-xs font-bold tracking-wider z-10 shadow-xs">
                AFTER (TRANSFORMED)
              </div>
            </div>

          </div>

          <div className="mt-6 pt-4 border-t border-gray-100 flex flex-col sm:flex-row justify-between items-center gap-4">
            <div className="text-center sm:text-left max-w-lg">
              <span className="text-[10px] font-mono text-[#9A7B4F] font-bold uppercase">Case Category</span>
              <h4 className="font-display font-bold text-lg sm:text-xl text-dark mb-0.5">{TRANSFORMATIONS[currentIndex].category}</h4>
              <p className="font-sans text-muted text-xs sm:text-sm leading-relaxed">{TRANSFORMATIONS[currentIndex].desc}</p>
            </div>

            <div className="flex items-center gap-2">
              <button
                onClick={slidePrev}
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors cursor-pointer active:scale-90"
                aria-label="Previous transformation"
              >
                <ChevronLeft size={18} />
              </button>
              <div className="font-mono text-xs font-bold text-dark px-2 text-center min-w-[40px]">
                {currentIndex + 1} / {TRANSFORMATIONS.length}
              </div>
              <button
                onClick={slideNext}
                className="w-9 h-9 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors cursor-pointer active:scale-90"
                aria-label="Next transformation"
              >
                <ChevronRight size={18} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
