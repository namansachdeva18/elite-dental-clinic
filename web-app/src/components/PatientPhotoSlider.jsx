import React, { useState, useEffect, useRef } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const IMAGES = Array.from({ length: 13 }, (_, i) => `/images/patient-${i + 1}.webp`);

export default function PatientPhotoSlider() {
  const [isPaused, setIsPaused] = useState(false);
  const scrollRef = useRef(null);

  useEffect(() => {
    if (isPaused) return;

    const interval = setInterval(() => {
      if (scrollRef.current) {
        const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current;
        
        // Find current item width roughly based on responsive design
        // Desktop ~25%, Tablet ~33%-50%, Mobile ~80%
        // A safe way to scroll precisely is to find the first child's width
        const firstChild = scrollRef.current.firstElementChild;
        const scrollAmount = firstChild ? firstChild.clientWidth : clientWidth / 4;

        if (scrollLeft + clientWidth >= scrollWidth - 10) {
          // Reached the end, smooth scroll back to start
          scrollRef.current.scrollTo({ left: 0, behavior: 'smooth' });
        } else {
          // Scroll to next item
          scrollRef.current.scrollBy({ left: scrollAmount, behavior: 'smooth' });
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isPaused]);

  const scroll = (direction) => {
    if (scrollRef.current) {
      const firstChild = scrollRef.current.firstElementChild;
      const scrollAmount = firstChild ? firstChild.clientWidth : 300;
      scrollRef.current.scrollBy({
        left: direction === 'left' ? -scrollAmount : scrollAmount,
        behavior: 'smooth'
      });
    }
  };

  return (
    <section className="py-12 md:py-16 mt-10 md:mt-14 bg-white relative z-20 overflow-hidden">
      <div className="max-w-[1300px] mx-auto px-5 mb-8 text-center flex flex-col items-center">
        <h2 className="font-display text-3xl md:text-4xl font-bold text-dark tracking-tight mb-3">
          Patient Gallery
        </h2>
        <p className="text-muted font-sans text-lg max-w-2xl mx-auto">
          Real smiles transformed at our clinic.
        </p>
      </div>

      <div 
        className="relative max-w-[1300px] mx-auto px-2 md:px-10 group"
        onMouseEnter={() => setIsPaused(true)}
        onMouseLeave={() => setIsPaused(false)}
        onTouchStart={() => setIsPaused(true)}
        onTouchEnd={() => setIsPaused(false)}
      >
        {/* Desktop Controls (Vertically Centered) */}
        <button 
          onClick={() => scroll('left')}
          className="hidden md:flex absolute -left-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 items-center justify-center text-dark hover:bg-gray-50 hover:scale-105 transition-all bg-white shadow-md"
          aria-label="Previous slide"
        >
          <ChevronLeft size={24} />
        </button>
        <button 
          onClick={() => scroll('right')}
          className="hidden md:flex absolute -right-2 top-1/2 -translate-y-1/2 z-20 w-12 h-12 rounded-full border border-gray-200 items-center justify-center text-dark hover:bg-gray-50 hover:scale-105 transition-all bg-white shadow-md"
          aria-label="Next slide"
        >
          <ChevronRight size={24} />
        </button>

        {/* Left Fade Overlay (Desktop only) */}
        <div className="hidden lg:block absolute left-8 top-0 bottom-0 w-24 bg-gradient-to-r from-white to-transparent z-10 pointer-events-none" />
        
        {/* Right Fade Overlay (Desktop only) */}
        <div className="hidden lg:block absolute right-8 top-0 bottom-0 w-24 bg-gradient-to-l from-white to-transparent z-10 pointer-events-none" />

        <div 
          ref={scrollRef}
          className="flex overflow-x-auto snap-x snap-mandatory scrollbar-hide scroll-smooth py-4 px-2 md:px-4 gap-4 md:gap-5 items-center"
          style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
        >
          {IMAGES.map((src, index) => (
            <div 
              key={index} 
              className="flex-shrink-0 snap-center
                         w-[85vw] sm:w-[45vw] md:w-[30vw] lg:w-[22vw] max-w-[320px]
                         relative rounded-2xl overflow-hidden shadow-sm hover:shadow-xl transition-shadow duration-300 group/card"
            >
              <div className="aspect-[4/3] w-full bg-gray-100 flex items-center justify-center relative overflow-hidden">
                <img 
                  src={src} 
                  alt={`Patient ${index + 1}`} 
                  loading="lazy"
                  className="w-full h-full object-cover transform group-hover/card:scale-[1.03] transition-transform duration-300 ease-in-out"
                />
                {/* Subtle dark overlay for premium feel */}
                <div className="absolute inset-0 bg-black/5 group-hover/card:bg-transparent transition-colors duration-300" />
              </div>
            </div>
          ))}
        </div>
      </div>
      
      {/* Hide scrollbar styles since inline doesn't always handle WebKit */}
      <style dangerouslySetInnerHTML={{__html: `
        .scrollbar-hide::-webkit-scrollbar {
            display: none;
        }
      `}} />
    </section>
  );
}
