import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';

export default function CustomCursor() {
  const dotRef = useRef(null);
  const ringRef = useRef(null);

  useEffect(() => {
    // Hide cursor if pointing device is coarse
    if (window.matchMedia('(pointer: coarse)').matches) return;

    const dot = dotRef.current;
    const ring = ringRef.current;

    let mouseX = 0;
    let mouseY = 0;
    let ringX = 0;
    let ringY = 0;

    const onMouseMove = (e) => {
      mouseX = e.clientX;
      mouseY = e.clientY;

      // Dot follows immediately
      gsap.set(dot, { x: mouseX, y: mouseY });
    };

    const render = () => {
      // Lerp for the ring
      ringX += (mouseX - ringX) * 0.12;
      ringY += (mouseY - ringY) * 0.12;

      gsap.set(ring, { x: ringX, y: ringY });
      requestAnimationFrame(render);
    };

    window.addEventListener('mousemove', onMouseMove);
    requestAnimationFrame(render);

    // Handle states for actionable elements
    const handleMouseOver = (e) => {
      const target = e.target.closest('button, a');
      if (target) {
        gsap.to(ring, { width: 60, height: 60, ease: 'power2.out', duration: 0.3 });
        ring.style.mixBlendMode = 'exclusion';
      } else if (e.target.closest('h1, h2, h3, p, span')) {
        gsap.to(ring, { width: 4, height: 20, borderRadius: '2px', ease: 'power2.out', duration: 0.2 });
      } else {
        gsap.to(ring, { width: 32, height: 32, borderRadius: '50%', ease: 'power2.out', duration: 0.2 });
        ring.style.mixBlendMode = 'normal';
      }
    };

    const handleMouseDown = () => gsap.to(dot, { scale: 0.6, duration: 0.1 });
    const handleMouseUp = () => gsap.to(dot, { scale: 1, duration: 0.1 });

    window.addEventListener('mouseover', handleMouseOver);
    window.addEventListener('mousedown', handleMouseDown);
    window.addEventListener('mouseup', handleMouseUp);

    return () => {
      window.removeEventListener('mousemove', onMouseMove);
      window.removeEventListener('mouseover', handleMouseOver);
      window.removeEventListener('mousedown', handleMouseDown);
      window.removeEventListener('mouseup', handleMouseUp);
    };
  }, []);

  return (
    <>
      <div 
        ref={dotRef} 
        className="fixed top-0 left-0 w-2 h-2 bg-primary rounded-full pointer-events-none z-[10000] -translate-x-1/2 -translate-y-1/2 hidden md:block" 
      />
      <div 
        ref={ringRef} 
        className="fixed top-0 left-0 w-8 h-8 bg-primary/30 rounded-full pointer-events-none z-[9999] -translate-x-1/2 -translate-y-1/2 hidden md:block" 
      />
    </>
  );
}
