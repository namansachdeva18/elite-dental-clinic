import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

const STEPS = [
  {
    num: "01",
    title: "Consultation & Diagnosis",
    desc: "Complete digital scanning to understand your actual need without any guesswork."
  },
  {
    num: "02",
    title: "Personalized Treatment Plan",
    desc: "Transparent discussion of the exact procedure and affordable pricing tailored for you."
  },
  {
    num: "03",
    title: "Pain-Free Treatment",
    desc: "A quick, laser-assisted execution in a strictly hygienic and relaxing environment."
  }
];

export default function HowItWorks() {
  const sectionRef = useRef(null);
  const lineRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = lineRef.current;
      if (path) {
        const length = path.getTotalLength();
        gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
        
        gsap.to(path, {
          strokeDashoffset: 0,
          ease: 'none',
          scrollTrigger: {
            trigger: sectionRef.current,
            start: 'top 70%',
            end: 'bottom 80%',
            scrub: 1,
          }
        });
      }

      gsap.from('.process-step', {
        y: 30,
        opacity: 0,
        duration: 0.6,
        stagger: 0.15,
        ease: 'power2.out',
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        }
      });
    }, sectionRef);

    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="how-it-works" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden relative border-b border-[#9A7B4F]/15">
      <div className="max-w-6xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-10">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Transparent Care Process
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mt-1 mb-1">
            How Your Treatment <span className="text-[#9A7B4F]">Works</span>
          </h2>
          <p className="font-sans text-muted text-xs sm:text-sm">
            A simple, predictable 3-step pathway from your first consultation to a pain-free, healthy smile.
          </p>
        </div>

        <div className="relative flex flex-col md:flex-row justify-between gap-12 md:gap-8 max-w-5xl mx-auto">
          {/* Connecting Line (Desktop) */}
          <div className="absolute top-12 left-[10%] w-[80%] h-px hidden md:block z-0">
            <svg width="100%" height="2" className="overflow-visible">
              <path
                ref={lineRef}
                d="M 0 1 L 1200 1"
                fill="none"
                stroke="#9A7B4F"
                strokeWidth="2"
                strokeDasharray="8 8"
                className="opacity-40"
              />
            </svg>
          </div>

          {STEPS.map((step, i) => (
            <div key={i} className="process-step relative z-10 flex-1 flex flex-col pt-0 md:pt-4 bg-white md:bg-transparent p-6 md:p-0 rounded-2xl md:rounded-none shadow-sm md:shadow-none border border-gray-100 md:border-none">
              <div className="font-display text-5xl md:text-6xl text-[#9A7B4F]/30 font-bold mb-4 md:mb-6">
                {step.num}
              </div>
              <h3 className="font-sans font-bold text-xl text-dark mb-2">
                {step.title}
              </h3>
              <p className="font-sans text-muted text-sm leading-relaxed max-w-xs">
                {step.desc}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
