import React, { useRef, useEffect } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

export const REVIEWS = [
  {
    name: "Naman Sachdeva",
    treatment: "Laser Root Canal",
    rating: 5,
    date: "1 week ago",
    text: "I’ve visited Elite Dental Clinic a couple of times now, and every time the experience has been genuinely painless. Dr. Nandini Bansal explained everything clearly. Truly the best dental clinic in Sirsa!",
  },
  {
    name: "Pooja Verma",
    treatment: "Teeth Whitening & Cleaning",
    rating: 5,
    date: "2 weeks ago",
    text: "Got teeth scaling and polishing done. Zero sensitivity and super clean clinic with strict sterilization protocols. Visible results in just one 30-min visit!",
  },
  {
    name: "Jai Singh",
    treatment: "Dental Implants & Crowns",
    rating: 5,
    date: "1 month ago",
    text: "It’s hard to find a trustworthy dental hospital in Sirsa, but Elite Dental Clinic is top-notch. World-class PGI standards, modern equipment, and 100% gentle hands.",
  },
  {
    name: "Sushma Grover",
    treatment: "Single-Sitting RCT",
    rating: 5,
    date: "3 weeks ago",
    text: "Had severe toothache and was terrified of root canal. Dr. Nandini completed it in a single visit with zero pain! Highly recommend for anyone with dental fear.",
  },
  {
    name: "Sneha Arora",
    treatment: "Invisible Braces & Alignment",
    rating: 5,
    date: "1 month ago",
    text: "Best orthodontics and smile correction in Sirsa. Completely comfortable experience and very transparent pricing without any hidden charges.",
  },
  {
    name: "Gulesh Kumar",
    treatment: "Crowns & Bridges",
    rating: 5,
    date: "2 months ago",
    text: "Excellent zirconia crown fitting! Natural feel and bite alignment was calibrated perfectly using digital scanner. Elite Dental Clinic lives up to its name.",
  },
  {
    name: "Sana Husain",
    treatment: "Cosmetic Smile Makeover",
    rating: 5,
    date: "1 month ago",
    text: "Patient care and clinical professionalism like no other. Modern soothing ambience and gentle doctor. Recommended to all my family and friends.",
  },
  {
    name: "Rajinder Bajaj",
    treatment: "Wisdom Tooth Extraction",
    rating: 5,
    date: "3 months ago",
    text: "Quick, painless wisdom tooth removal with instant relief. Dr. Nandini is very knowledgeable, friendly, and attentive. 5 stars all the way!",
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-element', {
        scrollTrigger: {
          trigger: sectionRef.current,
          start: 'top 80%',
        },
        y: 25,
        opacity: 0,
        duration: 0.7,
        stagger: 0.15,
        ease: 'power2.out',
      });
    }, sectionRef);
    return () => ctx.revert();
  }, []);

  return (
    <section ref={sectionRef} id="reviews" className="py-7 md:py-9 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#FAF8F5] via-white to-[#FAF8F5] border-b border-[#9A7B4F]/15 relative overflow-hidden">
      
      {/* Search Engine Optimization */}
      <h2 className="sr-only">Google Reviews & Patient Testimonials – Elite Dental Clinic Sirsa</h2>

      <div className="max-w-6xl mx-auto flex flex-col items-center">
        
        {/* Header with Google Trust Badge */}
        <div className="text-center max-w-xl mx-auto mb-4 test-element flex flex-col items-center">
          <div className="inline-flex items-center gap-2 px-3.5 py-1 rounded-full bg-white border border-[#9A7B4F]/25 shadow-xs mb-2 hover:border-[#9A7B4F]/60 transition-colors">
            <svg className="w-4 h-4 shrink-0" viewBox="0 0 24 24">
              <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
              <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
              <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
              <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
            </svg>
            <span className="text-[11px] font-bold text-dark tracking-wide">4.9 / 5.0 Rating • 80+ Real Patient Reviews</span>
          </div>

          <h3 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight">
            Real Patient <span className="bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] bg-clip-text text-transparent">Experiences</span>
          </h3>
          <p className="font-sans text-muted text-[11px] sm:text-xs mt-1">
            Verified experiences from patients treated at Elite Dental Clinic Sirsa.
          </p>
        </div>

        {/* --- Continuous Stream Reviews Marquee --- */}
        <div className="w-full relative test-element mb-3 overflow-hidden group">
          
          {/* Edge Fades */}
          <div className="absolute inset-y-0 left-0 w-16 sm:w-28 bg-gradient-to-r from-[#FAF8F5] to-transparent z-10 pointer-events-none" />
          <div className="absolute inset-y-0 right-0 w-16 sm:w-28 bg-gradient-to-l from-[#FAF8F5] to-transparent z-10 pointer-events-none" />

          {/* Seamless Infinite Marquee Track */}
          <div className="flex w-max animate-[reviewsMarquee_42s_linear_infinite] hover:[animation-play-state:paused] items-stretch gap-4 py-2.5 px-1">
            {[...REVIEWS, ...REVIEWS, ...REVIEWS].map((review, idx) => (
              <div 
                key={idx} 
                className="w-72 sm:w-80 md:w-88 shrink-0 bg-white rounded-2xl p-4 sm:p-5 shadow-[0_2px_15px_rgba(0,0,0,0.04)] hover:shadow-md border border-[#9A7B4F]/20 hover:border-[#9A7B4F]/50 transition-all duration-300 flex flex-col justify-between relative overflow-hidden group/card hover:-translate-y-0.5"
              >
                {/* Top Subtle Luxury Gold Bar */}
                <div className="absolute top-0 inset-x-0 h-1 bg-gradient-to-r from-[#9A7B4F]/40 via-[#9A7B4F] to-[#9A7B4F]/40 opacity-80 group-hover/card:opacity-100 transition-opacity" />

                <div>
                  {/* Rating Stars & Treatment Tag for SEO */}
                  <div className="flex items-center justify-between gap-2 mb-2">
                    <div className="flex gap-0.5">
                      {[...Array(review.rating)].map((_, i) => (
                        <Star key={i} size={13} className="fill-[#E5A93C] text-[#E5A93C]" />
                      ))}
                    </div>
                    <span className="text-[9.5px] font-semibold text-[#80633C] bg-[#FAF6EE] border border-[#9A7B4F]/20 px-2 py-0.5 rounded-full truncate max-w-[140px]">
                      {review.treatment}
                    </span>
                  </div>

                  {/* Review Text */}
                  <p className="font-sans text-dark/85 text-[12px] sm:text-[12.5px] font-normal leading-relaxed mb-3.5 line-clamp-3 italic">
                    "{review.text}"
                  </p>
                </div>

                {/* Patient Details & Google Badge */}
                <div className="flex items-center justify-between pt-3 border-t border-gray-100 mt-auto">
                  <div className="flex items-center gap-2.5 min-w-0">
                    <div className="w-8 h-8 rounded-full bg-gradient-to-br from-[#9A7B4F] to-[#6E5535] flex items-center justify-center font-bold text-white text-xs shrink-0 shadow-xs">
                      {review.name.charAt(0)}
                    </div>
                    <div className="min-w-0">
                      <div className="font-bold text-dark text-xs truncate">{review.name}</div>
                      <div className="flex items-center gap-1">
                        <CheckCircle2 size={11} className="text-emerald-600 fill-emerald-50 shrink-0" />
                        <span className="text-[9px] font-semibold text-emerald-700 uppercase tracking-wider">Verified Patient</span>
                      </div>
                    </div>
                  </div>

                  <div className="flex items-center gap-1 bg-[#F8F9FA] border border-gray-200/80 px-2 py-0.5 rounded-full shrink-0">
                    <svg className="w-3 h-3" viewBox="0 0 24 24">
                      <path fill="#4285F4" d="M22.56 12.25c0-.78-.07-1.53-.2-2.25H12v4.26h5.92c-.26 1.37-1.04 2.53-2.21 3.31v2.77h3.57c2.08-1.92 3.28-4.74 3.28-8.09z"/>
                      <path fill="#34A853" d="M12 23c2.97 0 5.46-.98 7.28-2.66l-3.57-2.77c-.98.66-2.23 1.06-3.71 1.06-2.86 0-5.29-1.93-6.16-4.53H2.18v2.84C3.99 20.53 7.7 23 12 23z"/>
                      <path fill="#FBBC05" d="M5.84 14.09c-.22-.66-.35-1.36-.35-2.09s.13-1.43.35-2.09V7.06H2.18C1.43 8.55 1 10.22 1 12s.43 3.45 1.18 4.94l2.85-2.22.81-.63z"/>
                      <path fill="#EA4335" d="M12 5.38c1.62 0 3.06.56 4.21 1.64l3.15-3.15C17.45 2.09 14.97 1 12 1 7.7 1 3.99 3.47 2.18 7.06l3.66 2.84c.87-2.6 3.3-4.52 6.16-4.52z"/>
                    </svg>
                    <span className="text-[9.5px] font-medium text-gray-500">Google</span>
                  </div>
                </div>
              </div>
            ))}
          </div>

        </div>

        <style jsx>{`
          @keyframes reviewsMarquee {
            0% { transform: translateX(0); }
            100% { transform: translateX(-33.333333%); }
          }
        `}</style>

        {/* --- Compact Horizontal Video Testimonial Card --- */}
        <div className="w-full max-w-xl mx-auto test-element mt-2">
          
          <h3 className="sr-only">International Patient Testimonial video</h3>
          <p className="sr-only">Experienced dentist in Sirsa performing pain-free root canal treatment.</p>

          <div className="bg-white rounded-2xl p-3 sm:p-4 border border-[#9A7B4F]/25 shadow-sm flex flex-col sm:flex-row items-center gap-3.5">
            
            {/* Compact Video Frame (16:9 / Landscape) */}
            <div 
              className="w-full sm:w-5/12 relative rounded-xl overflow-hidden shadow-xs border border-gray-100 bg-black/5 shrink-0"
              style={{ aspectRatio: '16/10' }}
            >
              <video
                className="w-full h-full object-cover"
                controls
                preload="none"
                title="Prabhnoor Kaur Testimonial"
                aria-label="Prabhnoor Kaur speaking about her pain-free international dental experience at Elite Dental Clinic"
                poster="/images/logo.webp"
              >
                <source src="/videos/prabhnoor-testimonial.mp4" type="video/mp4" />
                Your browser does not support HTML5 video element.
              </video>
            </div>

            {/* Compact Content */}
            <div className="flex flex-col text-center sm:text-left flex-1 min-w-0">
              <div className="inline-flex items-center gap-1.5 text-[9.5px] font-bold text-[#80633C] uppercase tracking-wider mb-1 sm:mx-0 mx-auto bg-[#FAF6EE] border border-[#9A7B4F]/20 px-2 py-0.5 rounded-full w-max">
                <span>✈️ International Patient</span>
              </div>

              <h4 className="font-display font-bold text-sm sm:text-base text-dark tracking-tight leading-tight mb-1">
                Prabhnoor Kaur’s Smile Journey
              </h4>

              <p className="font-sans text-[11px] text-muted leading-relaxed mb-2.5 line-clamp-2">
                "Happy patient from Australia sharing her pain-free dental experience at Elite Dental Clinic."
              </p>

              <div>
                <a 
                  href="/videos/prabhnoor-testimonial" 
                  className="inline-flex items-center gap-1 text-[11.5px] font-bold text-[#9A7B4F] hover:text-[#7A5F3A] hover:underline"
                >
                  <span>Watch Full Video Story</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

          </div>
        </div>

      </div>
    </section>
  );
}
