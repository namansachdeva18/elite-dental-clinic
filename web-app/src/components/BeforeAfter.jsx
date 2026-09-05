import React, { useEffect, useRef, useState, useCallback } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { ChevronLeft, ChevronRight, MoveHorizontal } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const TRANSFORMATIONS = [
  {
    category: "Braces Transformation",
    label: "Misaligned → Perfect Bite",
    imgBefore: "/images/before-2.webp",
    imgAfter: "/images/after-2.webp"
  },
  {
    category: "Crowns & Bridges",
    label: "Damaged → Restored",
    imgBefore: "/images/crowns-before.webp",
    imgAfter: "/images/crowns-after.webp"
  },
  {
    category: "Teeth Whitening",
    label: "Stained → 6 Shades Brighter",
    imgBefore: "/images/before-1.webp",
    imgAfter: "/images/after-1.webp"
  },
  {
    category: "Smile Makeover",
    label: "Chipped → Flawless Smile",
    imgBefore: "/images/before-3.webp",
    imgAfter: "/images/after-3.webp"
  }
];

/* ── Drag-to-reveal comparison slider ── */
function DragSlider({ imgBefore, imgAfter }) {
  const [pos, setPos] = useState(50);
  const [dragging, setDragging] = useState(false);
  const sliderRef = useRef(null);

  /* Auto-hint swipe on mount */
  useEffect(() => {
    let frame;
    const hint = setTimeout(() => {
      let cur = 50, dir = -1, steps = 0;
      const MAX = 45;
      const tick = () => {
        cur += dir * 0.8;
        steps++;
        setPos(cur);
        if (cur <= 35) dir = 1;
        if (cur >= 65) dir = -1;
        if (steps < MAX) frame = requestAnimationFrame(tick);
        else setPos(50);
      };
      frame = requestAnimationFrame(tick);
    }, 800);
    return () => { clearTimeout(hint); cancelAnimationFrame(frame); };
  }, [imgBefore]);

  const calcPos = useCallback((clientX) => {
    const rect = sliderRef.current?.getBoundingClientRect();
    if (!rect) return 50;
    return Math.max(2, Math.min(98, ((clientX - rect.left) / rect.width) * 100));
  }, []);

  const onMouseDown = (e) => { e.preventDefault(); setDragging(true); };
  const onMouseMove = useCallback((e) => { if (dragging) setPos(calcPos(e.clientX)); }, [dragging, calcPos]);
  const onMouseUp   = useCallback(() => setDragging(false), []);
  const onTouchMove = useCallback((e) => { if (dragging) setPos(calcPos(e.touches[0].clientX)); }, [dragging, calcPos]);
  const onTouchEnd  = useCallback(() => setDragging(false), []);

  useEffect(() => {
    if (!dragging) return;
    window.addEventListener('mousemove', onMouseMove);
    window.addEventListener('mouseup',   onMouseUp);
    window.addEventListener('touchmove', onTouchMove, { passive: true });
    window.addEventListener('touchend',  onTouchEnd);
    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseup',   onMouseUp);
      window.removeEventListener('touchmove', onTouchMove);
      window.removeEventListener('touchend',  onTouchEnd);
    };
  }, [dragging, onMouseMove, onMouseUp, onTouchMove, onTouchEnd]);

  return (
    <div
      ref={sliderRef}
      className="relative w-full rounded-xl overflow-hidden select-none"
      style={{ aspectRatio: '4/3', cursor: dragging ? 'grabbing' : 'col-resize', touchAction: 'none' }}
      onMouseDown={onMouseDown}
      onTouchStart={() => setDragging(true)}
    >
      {/* AFTER — full width base */}
      <img
        src={imgAfter}
        alt="After dental treatment at Elite Dental Clinic Sirsa"
        draggable={false}
        className="absolute inset-0 w-full h-full object-cover"
        onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
      />

      {/* BEFORE — clipped left portion */}
      <div className="absolute inset-0 overflow-hidden" style={{ width: `${pos}%` }}>
        <img
          src={imgBefore}
          alt="Before dental treatment at Elite Dental Clinic Sirsa"
          draggable={false}
          className="absolute inset-0 h-full object-cover"
          style={{ width: `${10000 / pos}%`, maxWidth: 'none' }}
          onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
        />
      </div>

      {/* Divider line */}
      <div
        className="absolute inset-y-0 z-10 pointer-events-none"
        style={{
          left: `calc(${pos}% - 1px)`,
          width: 2,
          background: 'rgba(255,255,255,0.95)',
          boxShadow: '0 0 12px rgba(0,0,0,0.4)',
        }}
      />

      {/* Handle knob */}
      <div
        className="absolute z-20 top-1/2 -translate-y-1/2 -translate-x-1/2 w-9 h-9 rounded-full bg-white shadow-xl border-[2.5px] border-[#9A7B4F] flex items-center justify-center"
        style={{ left: `${pos}%` }}
      >
        <MoveHorizontal size={15} className="text-[#9A7B4F]" strokeWidth={2.5} />
      </div>

      {/* Badges */}
      <span className="absolute top-2 left-2 z-10 bg-black/70 backdrop-blur text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full pointer-events-none">
        BEFORE
      </span>
      <span className="absolute top-2 right-2 z-10 bg-[#9A7B4F] text-white text-[9px] font-bold tracking-widest px-2 py-0.5 rounded-full pointer-events-none">
        AFTER ✦
      </span>

      {/* Hint pill */}
      {!dragging && (
        <div className="absolute bottom-2 left-1/2 -translate-x-1/2 z-10 bg-black/50 backdrop-blur text-white text-[9px] font-semibold tracking-wider px-3 py-0.5 rounded-full pointer-events-none flex items-center gap-1">
          <MoveHorizontal size={9} /> Drag to compare
        </div>
      )}
    </div>
  );
}

/* ── Main section ── */
export default function BeforeAfter() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const sectionRef = useRef(null);

  const slideNext = () => setCurrentIndex(p => (p + 1) % TRANSFORMATIONS.length);
  const slidePrev = () => setCurrentIndex(p => (p === 0 ? TRANSFORMATIONS.length - 1 : p - 1));

  // Auto-advance through cases every 4 seconds
  useEffect(() => {
    if (isPaused) return;
    const timer = setInterval(() => {
      setCurrentIndex(p => (p + 1) % TRANSFORMATIONS.length);
    }, 4000);
    return () => clearInterval(timer);
  }, [isPaused]);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.ba-el', {
        scrollTrigger: { trigger: sectionRef.current, start: 'top 83%' },
        y: 22, opacity: 0, duration: 0.7, stagger: 0.13, ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  const cur = TRANSFORMATIONS[currentIndex];

  return (
    <section ref={sectionRef} id="results" className="py-6 md:py-8 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-b border-[#9A7B4F]/15">
      <div className="max-w-xl mx-auto">

        {/* Header */}
        <div className="text-center mb-3 ba-el">
          <span className="font-mono text-[10px] tracking-widest text-[#9A7B4F] uppercase font-bold">
            Real Patient Transformations
          </span>
          <h2 className="font-display text-xl sm:text-2xl font-bold text-dark tracking-tight mt-0.5">
            Results That <span className="text-[#9A7B4F]">Speak For Themselves</span>
          </h2>
        </div>

        {/* Card */}
        <div 
          className="bg-white rounded-2xl shadow-sm border border-gray-200/80 overflow-hidden ba-el"
          onMouseEnter={() => setIsPaused(true)}
          onMouseLeave={() => setIsPaused(false)}
          onTouchStart={() => setIsPaused(true)}
          onTouchEnd={() => setIsPaused(false)}
        >
          <div className="p-2.5 pb-0">
            <DragSlider key={currentIndex} imgBefore={cur.imgBefore} imgAfter={cur.imgAfter} />
          </div>

          {/* Info + navigation */}
          <div className="px-3.5 py-2.5 flex items-center justify-between gap-2">
            <div className="min-w-0">
              <span className="text-[9px] font-mono text-[#9A7B4F] font-bold uppercase tracking-wider">
                {cur.category}
              </span>
              <p className="font-sans text-dark text-xs font-semibold truncate">{cur.label}</p>
            </div>

            <div className="flex items-center gap-1.5 shrink-0">
              <button
                onClick={slidePrev}
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors cursor-pointer active:scale-90"
                aria-label="Previous case"
              >
                <ChevronLeft size={14} />
              </button>

              {/* Pill dots */}
              {TRANSFORMATIONS.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setCurrentIndex(i)}
                  className="rounded-full transition-all duration-300"
                  style={{
                    width: i === currentIndex ? 18 : 6,
                    height: 6,
                    background: i === currentIndex ? '#9A7B4F' : '#D1C4A8',
                  }}
                  aria-label={`Case ${i + 1}`}
                />
              ))}

              <button
                onClick={slideNext}
                className="w-7 h-7 bg-gray-100 rounded-full flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors cursor-pointer active:scale-90"
                aria-label="Next case"
              >
                <ChevronRight size={14} />
              </button>
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
