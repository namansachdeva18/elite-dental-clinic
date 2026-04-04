import React, { useRef } from 'react';
import gsap from 'gsap';

export default function MagneticButton({ children, className, ...props }) {
  const buttonRef = useRef(null);

  const handleMouseMove = (e) => {
    const el = buttonRef.current;
    if (!el) return;
    const rect = el.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;
    gsap.to(el, { x: x * 0.25, y: y * 0.25, duration: 0.4, ease: 'power2.out' });
  };

  const handleMouseLeave = () => {
    const el = buttonRef.current;
    if (!el) return;
    gsap.to(el, { x: 0, y: 0, duration: 0.6, ease: 'elastic.out(1, 0.4)' });
  };

  return (
    <button
      ref={buttonRef}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
      className={`relative inline-flex items-center justify-center bg-primary text-white font-medium py-4 px-8 rounded-full overflow-hidden transition-colors hover:bg-[#8A6A42] ${className}`}
      {...props}
    >
      {children}
    </button>
  );
}
