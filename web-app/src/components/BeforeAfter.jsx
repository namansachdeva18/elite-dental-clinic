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
    <section ref={containerRef} id="results" className="py-24 px-6 md:px-16 bg-[#FDFBF7] border-y border-[#9A7B4F]/10">
      <div className="max-w-6xl mx-auto flex flex-col items-center ba-element">

        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 text-center">Real Transformations</h3>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark text-center mb-16 tracking-tight">
          Results that <span className="text-[#9A7B4F]">Speak for Themselves.</span>
        </h2>

        <div className="bg-white rounded-[2rem] shadow-xl border border-gray-100 p-6 md:p-10 w-full max-w-5xl ba-element">
          <div className="flex flex-col md:flex-row gap-8 items-center">

            {/* Before Img Block */}
            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden group bg-gray-100 h-64 md:h-80 flex items-center justify-center">
              <img
                src={TRANSFORMATIONS[currentIndex].imgBefore}
                alt="Before treatment in Sirsa clinic"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 left-4 bg-dark/80 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide z-10 shadow-sm">
                BEFORE
              </div>
            </div>

            {/* After Img Block */}
            <div className="w-full md:w-1/2 relative rounded-2xl overflow-hidden group bg-gray-100 h-64 md:h-80 flex items-center justify-center">
              <img
                src={TRANSFORMATIONS[currentIndex].imgAfter}
                alt="After treatment in Sirsa clinic"
                loading="lazy"
                decoding="async"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover"
              />
              <div className="absolute top-4 right-4 bg-[#9A7B4F]/90 backdrop-blur-md text-white px-4 py-1.5 rounded-full text-sm font-bold tracking-wide z-10 shadow-sm">
                AFTER
              </div>
            </div>

          </div>

          <div className="mt-10 flex flex-col md:flex-row justify-between items-center gap-6">
            <div className="text-center md:text-left max-w-lg">
              <h4 className="font-display font-bold text-2xl text-dark mb-2">{TRANSFORMATIONS[currentIndex].category}</h4>
              <p className="font-sans text-muted">{TRANSFORMATIONS[currentIndex].desc}</p>
            </div>

            <div className="flex items-center gap-4">
              <button
                onClick={slidePrev}
                className="bg-gray-100 p-3 rounded-full hover:bg-[#9A7B4F] hover:text-white transition-colors"
                aria-label="Previous slide"
              >
                <ChevronLeft size={24} />
              </button>
              <div className="font-mono font-bold text-dark w-12 text-center">
                {currentIndex + 1} / {TRANSFORMATIONS.length}
              </div>
              <button
                onClick={slideNext}
                className="bg-gray-100 p-3 rounded-full hover:bg-[#9A7B4F] hover:text-white transition-colors"
                aria-label="Next slide"
              >
                <ChevronRight size={24} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
