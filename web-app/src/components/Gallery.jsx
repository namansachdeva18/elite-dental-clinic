import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Camera } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const IMAGES = [
  { label: "Advanced Dental Treatment Room in Sirsa - Modern Equipment", src: "/images/gallery-1.webp" },
  { label: "Private Consultation Room for Dental Checkup in Sirsa", src: "/images/gallery-2.webp" },
  { label: "Modern Dental Clinic Interior in Sirsa - Clean & Hygienic", src: "/images/gallery-3.webp" },
  { label: "Comfortable Patient Waiting Area at Elite Dental Clinic Sirsa", src: "/images/gallery-4.webp" },
  { label: "Painless Dental Treatment for Kids in Sirsa Clinic", src: "/images/gallery-5.webp" },
  { label: "Elite Dental Clinic Exterior in Sirsa - Easy to Locate", src: "/images/gallery-6.webp" }
];

export default function Gallery() {
  const containerRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.gallery-img', {
        scrollTrigger: {
          trigger: containerRef.current,
          start: 'top 80%',
        },
        y: 40,
        duration: 0.8,
        stagger: 0.1,
        ease: 'power3.out',
      });
    }, containerRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={containerRef} id="clinic-tour" className="py-24 px-6 md:px-16 bg-[#FDFBF7]">
      <div className="max-w-7xl mx-auto">
        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 text-center">Clinic Tour</h3>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark text-center mb-16 tracking-tight">
          Inside Our <span className="text-[#9A7B4F]">Clinic.</span>
        </h2>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {IMAGES.map((img, i) => (
            <div
              key={i}
              className="gallery-img group relative rounded-[12px] overflow-hidden shadow-sm border border-gray-200 border-dashed hover:shadow-xl transition-all duration-500 bg-gray-100 aspect-[4/3] cursor-pointer flex items-center justify-center"
            >
              <img
                src={img.src}
                alt={`Inside Our Clinic - ${img.label}`}
                loading="lazy"
                decoding="async"
                width="800"
                height="600"
                onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
                className="w-full h-full object-cover transition-opacity duration-300"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
              <div className="absolute bottom-4 left-4 right-4 flex items-center justify-between text-white opacity-0 group-hover:opacity-100 transition-opacity duration-300 translate-y-4 group-hover:translate-y-0">
                <span className="font-bold text-sm tracking-wide">{img.label}</span>
                <Camera size={16} />
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
