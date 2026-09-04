import React, { useEffect, useRef } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Award, Heart, ShieldCheck } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export default function DoctorProfile() {
  const sectionRef = useRef(null);

  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.doc-element', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 40,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: 'power3.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="about" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white overflow-hidden border-b border-[#9A7B4F]/15">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-8 md:gap-14">

        {/* Doctor Image */}
        <div className="w-full md:w-5/12 flex justify-center doc-element">
          <div className="relative w-72 h-[24rem] md:w-full md:h-[30rem] rounded-3xl overflow-hidden shadow-xl border-2 border-[#9A7B4F]/20 group">
            <img
              src="/images/doctor.webp"
              alt="Gentle & Family-Friendly Dental Care in Sirsa by Dr. Nandini Bansal"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
              className="w-full h-full object-cover object-center group-hover:scale-105 transition-transform duration-700"
            />
            {/* Experience overlay */}
            <div className="absolute bottom-4 left-4 right-4 bg-white/95 backdrop-blur-md p-4 rounded-2xl shadow-lg border border-[#9A7B4F]/20">
              <div className="flex justify-between items-center w-full">
                <div className="w-full">
                  <h4 className="font-display font-bold text-lg text-dark mb-0.5">Dr. Nandini Bansal</h4>
                  <p className="text-xs text-muted font-medium">BDS, Root Canal & Laser Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left doc-element">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold mb-2">
            Gentle & Family-Friendly Dental Care
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mb-4 leading-tight">
            "I understand dental fear. My sole goal is your <span className="text-[#9A7B4F]">pain-free treatment.</span>"
          </h2>

          <div className="font-sans text-muted text-xs sm:text-sm leading-relaxed mb-6 space-y-3">
            <p>
              Many patients arrive at our clinic terrified of the dentist chair. That is why Elite Dental Clinic was built around one core philosophy: absolute zero discomfort.
            </p>
            <p>
              Using gentle laser technology and precision digital equipment, my team and I ensure that every procedure—from basic scaling and single-visit root canals to aesthetic smile makeovers—is completed securely and comfortably.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 w-full mb-6">
            <div className="flex items-center gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#9A7B4F]/20">
              <Award className="text-[#9A7B4F] shrink-0" size={20} />
              <div className="text-xs font-bold text-dark">BDS, Root Canal Specialist</div>
            </div>
            <div className="flex items-center gap-3 bg-[#FAF8F5] p-3.5 rounded-xl border border-[#9A7B4F]/20">
              <ShieldCheck className="text-[#9A7B4F] shrink-0" size={20} />
              <div className="text-xs font-bold text-dark">Advanced Laser Care Specialist</div>
            </div>
          </div>

          <a href="#book" className="inline-flex items-center justify-center gap-2 bg-gradient-to-r from-[#9A7B4F] to-[#80633C] text-white font-bold py-3.5 px-8 rounded-full hover:brightness-110 transition-all shadow-md text-xs sm:text-sm active:scale-95">
            <Heart size={16} /> Book a Gentle Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
