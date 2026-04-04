import React, { useEffect, useRef, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function Features() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.feature-card', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 75%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="features" className="py-32 px-6 md:px-16 bg-graybg">
      <div className="max-w-7xl mx-auto">
        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark text-center mb-20 tracking-tight">
          Comprehensive Clinical Expertise.
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <DiagnosticCard />
          <TelemetryCard />
          <SignalCard />
        </div>
      </div>
    </section>
  );
}

// Card 1 — "Diagnostic Shuffler"
function DiagnosticCard() {
  const [items, setItems] = useState([
    { label: "Laser RCT", status: "Active" },
    { label: "Dental Laminates", status: "Ready" },
    { label: "Maxillofacial Surgery", status: "Available" }
  ]);
  const containerRef = useRef(null);

  useEffect(() => {
    const interval = setInterval(() => {
      if (!containerRef.current) return;
      
      gsap.fromTo(containerRef.current.children, 
        { rotateX: 20, opacity: 0 },
        { rotateX: 0, opacity: 1, duration: 0.6, stagger: 0.05, ease: 'back.out(1.5)' }
      );
      
      setItems(prev => {
        const next = [...prev];
        const first = next.shift();
        next.push(first);
        return next;
      });
    }, 3000);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="feature-card bg-white border border-primary/10 rounded-[2rem] p-8 shadow-xl flex flex-col h-[320px] justify-between perspective-800">
      <div>
        <h3 className="font-sans font-bold text-dark text-[1.1rem]">All-in-One Solution</h3>
        <p className="font-sans text-muted text-[0.9rem] mt-2">
          From basic cleaning to complex surgeries handled under one roof.
        </p>
      </div>
      
      <div className="flex-1 mt-6 overflow-hidden flex flex-col justify-end">
        <div ref={containerRef} className="flex flex-col gap-3">
          {items.map((item, i) => (
            <div key={i} className="flex justify-between items-center p-3 rounded-xl bg-graybg/50 border border-dark/5">
              <span className="font-sans font-medium text-sm text-dark">{item.label}</span>
              <span className="font-mono text-xs text-primary bg-primary/10 px-2 py-1 rounded-md">{item.status}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}

// Card 2 — "Telemetry Typewriter"
function TelemetryCard() {
  const textLines = [
    "Analyzing patient history.",
    "Tailoring treatment plan.",
    "Optimizing comfort level.",
    "Clear communication established."
  ];
  const [displayText, setDisplayText] = useState("");
  const [lineIndex, setLineIndex] = useState(0);

  useEffect(() => {
    let currentText = textLines[lineIndex];
    let charIndex = 0;
    
    // Scramble effect before typing
    const scrambleChars = "!<>-_\\\\/[]{}—=+*^?#_";
    let scrambleTicks = 10;
    
    const scrambleInterval = setInterval(() => {
      if (scrambleTicks > 0) {
        setDisplayText(Array(8).fill(0).map(() => scrambleChars[Math.floor(Math.random() * scrambleChars.length)]).join(''));
        scrambleTicks--;
      } else {
        clearInterval(scrambleInterval);
        
        // Typewriter effect
        const typeInterval = setInterval(() => {
          if (charIndex <= currentText.length) {
            setDisplayText(currentText.substring(0, charIndex));
            charIndex++;
          } else {
            clearInterval(typeInterval);
            setTimeout(() => {
              setLineIndex((prev) => (prev + 1) % textLines.length);
            }, 2000); // Wait before next line
          }
        }, 30);
      }
    }, 40);

    return () => {
      clearInterval(scrambleInterval);
      // clearInterval(typeInterval) is handled internally or re-run
    };
  }, [lineIndex]);

  return (
    <div className="feature-card bg-white border border-primary/10 rounded-[2rem] p-8 shadow-xl flex flex-col h-[320px] justify-between">
      <div>
        <h3 className="font-sans font-bold text-dark text-[1.1rem]">Patient-Centric Approach</h3>
        <p className="font-sans text-muted text-[0.9rem] mt-2">
          Tailored treatments based on individual needs, ensuring comfort.
        </p>
      </div>

      <div className="bg-[#0A0A0A] rounded-xl p-5 mt-6 flex-1 flex flex-col font-mono text-sm relative overflow-hidden text-[#F3F4F6]">
        <div className="flex items-center gap-2 mb-4 text-xs text-primary">
          <div className="w-2 h-2 rounded-full bg-primary animate-pulse" />
          ● LIVE
        </div>
        <div className="flex">
          <span className="text-gray-400 mr-2">{'>'}</span>
          <span className="text-primary/90 min-h-[40px] block w-full">{displayText}<span className="inline-block w-2 bg-primary/70 animate-pulse ml-1 h-[1em] align-middle" /></span>
        </div>
      </div>
    </div>
  );
}

// Card 3 — "Signal Graph"
function SignalCard() {
  const pathRef = useRef(null);
  
  useEffect(() => {
    const ctx = gsap.context(() => {
      const path = pathRef.current;
      const length = path.getTotalLength();
      
      gsap.set(path, { strokeDasharray: length, strokeDashoffset: length });
      
      gsap.to(path, {
        strokeDashoffset: 0,
        duration: 2,
        ease: 'power2.inOut',
        scrollTrigger: {
          trigger: path,
          start: 'top 85%',
        }
      });
    });
    return () => ctx.revert();
  }, []);

  return (
    <div className="feature-card bg-white border border-primary/10 rounded-[2rem] p-8 shadow-xl flex flex-col h-[320px] justify-between group">
      <div>
        <h3 className="font-sans font-bold text-dark text-[1.1rem]">24x7 Convenience</h3>
        <p className="font-sans text-muted text-[0.9rem] mt-2">
          Consistent 5-star service quality and reliable care anytime.
        </p>
      </div>

      <div className="bg-graybg/50 rounded-xl p-5 mt-6 flex-1 relative flex items-end">
        <div className="absolute top-4 left-4 font-mono text-xs text-muted uppercase tracking-wider">Reliability Score</div>
        
        <svg viewBox="0 0 100 40" className="w-full h-auto overflow-visible pb-2" preserveAspectRatio="none">
          <path
            ref={pathRef}
            d="M 0 35 L 20 30 L 40 32 L 60 15 L 80 18 L 100 5"
            fill="none"
            stroke="#9A7B4F"
            strokeWidth="3"
            strokeLinecap="round"
            strokeLinejoin="round"
            className="drop-shadow-md"
          />
          {/* Data points */}
          <circle cx="20" cy="30" r="2" fill="#0A0A0A" className="opacity-0 group-hover:opacity-100 transition-opacity delay-75" />
          <circle cx="40" cy="32" r="2" fill="#0A0A0A" className="opacity-0 group-hover:opacity-100 transition-opacity delay-150" />
          <circle cx="60" cy="15" r="2" fill="#0A0A0A" className="opacity-0 group-hover:opacity-100 transition-opacity delay-200" />
          <circle cx="80" cy="18" r="2" fill="#0A0A0A" className="opacity-0 group-hover:opacity-100 transition-opacity delay-300" />
          <circle cx="100" cy="5" r="3" fill="#9A7B4F" className="animate-pulse drop-shadow-lg" />
        </svg>
      </div>
    </div>
  );
}
