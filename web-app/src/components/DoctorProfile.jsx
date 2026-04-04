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
    <section ref={sectionRef} className="py-24 px-6 md:px-16 bg-white overflow-hidden border-t border-gray-100">
      <div className="max-w-6xl mx-auto flex flex-col md:flex-row items-center gap-12 md:gap-20">

        {/* Doctor Image */}
        <div className="w-full md:w-5/12 flex justify-center doc-element">
          <div className="relative w-80 h-[28rem] md:w-full md:h-[36rem] rounded-3xl overflow-hidden shadow-2xl border-2 border-gray-100">
            <img
              src="/images/doctor.webp"
              alt="Gentle & Family-Friendly Dental Care in Sirsa"
              loading="lazy"
              decoding="async"
              onError={(e) => { e.currentTarget.onerror = null; e.currentTarget.src = '/images/fallback.webp'; }}
              className="w-full h-full object-cover object-center hover:scale-105 transition-transform duration-700"
            />
            {/* Experience overlay */}
            <div className="absolute bottom-6 left-6 right-6 bg-white/95 backdrop-blur-md p-5 rounded-2xl shadow-lg border border-gray-100">
              <div className="flex justify-between items-center w-full">
                <div className="w-full">
                  <h4 className="font-bold text-xl text-dark mb-1">Dr. Nandini Bansal</h4>
                  <p className="text-sm text-muted font-medium">BDS, Root Canal Specialist</p>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Doctor Info */}
        <div className="w-full md:w-7/12 flex flex-col items-center md:items-start text-center md:text-left doc-element">
          <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4">Gentle & Family-Friendly Dental Care</h3>
          <h2 className="font-display text-4xl md:text-5xl font-bold text-dark tracking-tight mb-8 leading-tight">
            "I understand dental fear. My sole goal is your <span className="text-[#9A7B4F]">pain-free treatment.</span>"
          </h2>

          <div className="font-sans text-muted text-lg leading-relaxed mb-6 space-y-4">
            <p>
              Many patients arrive at our clinic terrified of the dentist chair. I get it. That's exactly why Elite Dental Clinic was built around one core philosophy: absolute zero discomfort.
            </p>
            <p>
              Using the latest laser technology and a highly gentle approach, my team and I ensure that every procedure—from basic scaling , root canals to complex implant placements—is done securely and beautifully, without the stress.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full mt-4 mb-10">
            <div className="flex items-center gap-3 bg-graybg p-4 rounded-xl border border-gray-100">
              <Award className="text-[#9A7B4F]" size={24} />
              <div className="text-sm font-bold text-dark">BDS, Root Canal Specialist</div>
            </div>
            <div className="flex items-center gap-3 bg-graybg p-4 rounded-xl border border-gray-100">
              <ShieldCheck className="text-[#9A7B4F]" size={24} />
              <div className="text-sm font-bold text-dark">Advanced Laser Specialist</div>
            </div>
          </div>

          <a href="#book" className="flex items-center justify-center gap-2 bg-[#9A7B4F] text-white font-bold py-4 px-10 rounded-full hover:bg-dark transition-colors shadow-lg active:scale-95 duration-200">
            <Heart size={18} /> Book a Gentle Consultation
          </a>
        </div>

      </div>
    </section>
  );
}
