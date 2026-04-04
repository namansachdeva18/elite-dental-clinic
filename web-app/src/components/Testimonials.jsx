import React, { useRef, useEffect, useState } from 'react';
import gsap from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';
import { Star, Quote, ChevronLeft, ChevronRight, CheckCircle2 } from 'lucide-react';

gsap.registerPlugin(ScrollTrigger);

const REVIEWS = [
  {
    name: "Naman Sachdeva",
    text: "I’ve visited this clinic a couple of times now, and every time the experience has been really good... Overall, a very reliable place for dental treatment.",
  },
  {
    name: "Jai Singh",
    text: "It’s really hard to find the best clinic in Sirsa, but Elite Dental Clinic is truly top-notch because of its hygiene and environment…",
  },
  {
    name: "Sushma Grover",
    text: "Had a wonderful experience… truly the best dental clinic in Sirsa… painless and reliable dental care!",
  },
  {
    name: "Sana Husain",
    text: "…care and treatment like no other… professionalism… highly recommended!!!",
  },
  {
    name: "Sneha Arora",
    text: "Best Dental Clinic! … latest technology… completely comfortable…",
  },
  {
    name: "Snehu Arora",
    text: "…best dental clinic I’ve ever visited… painless… highly recommended…",
  },
  {
    name: "Gulesh Kumar",
    text: "Excellent experience… hygiene standards… modern and calming…",
  },
  {
    name: "Orion Sutar",
    text: "Absolutely loved my experience… super clean… amazing dentist…",
  },
  {
    name: "Deepak",
    text: "…wonderful experience… painless treatment… best dental clinic in Sirsa…",
  },
  {
    name: "Rajinder Bajaj",
    text: "…Dr. Nandini is very knowledgeable… clean and organized… friendly staff…",
  }
];

export default function Testimonials() {
  const sectionRef = useRef(null);
  const sliderRef = useRef(null);
  const [activeDot, setActiveDot] = useState(0);

  // GSAP Entrance
  useEffect(() => {
    const ctx = gsap.context(() => {
      gsap.from('.test-element', {
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

  // Update dots dynamically on scroll
  const handleScroll = () => {
    if (!sliderRef.current) return;
    const { scrollLeft, scrollWidth, clientWidth } = sliderRef.current;
    
    // Total scrollable width
    const maxScroll = scrollWidth - clientWidth;
    if (maxScroll <= 0) return;
    
    // Current fraction of scroll completion
    const scrollFraction = scrollLeft / maxScroll;
    
    // There are REVIEWS.length total dots, but since we see multiple items, 
    // the max dot index is realistically less, but we can map the fraction precisely across the available dots
    // Or simpler: map dots directly to each review index to support 1-card mobile view perfectly
    const index = Math.round(scrollFraction * (REVIEWS.length - 1));
    setActiveDot(Math.min(Math.max(index, 0), REVIEWS.length - 1));
  };

  const scrollLeft = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].getBoundingClientRect().width;
      sliderRef.current.scrollBy({ left: -(cardWidth + 24), behavior: 'smooth' }); // 24 = gap-6
    }
  };

  const scrollRight = () => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].getBoundingClientRect().width;
      sliderRef.current.scrollBy({ left: (cardWidth + 24), behavior: 'smooth' });
    }
  };

  const scrollToDot = (idx) => {
    if (sliderRef.current) {
      const cardWidth = sliderRef.current.children[0].getBoundingClientRect().width;
      sliderRef.current.scrollTo({ left: (cardWidth + 24) * idx, behavior: 'smooth' });
    }
  };

  // Build JSON-LD Structured Data payload
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "LocalBusiness",
    "name": "Elite Dental Clinic",
    "review": REVIEWS.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5"
      }
    }))
  };

  return (
    <section ref={sectionRef} id="testimonials" className="py-24 px-6 md:px-16 bg-[#FDFBF7] border-y border-[#9A7B4F]/10 relative overflow-hidden">
      
      {/* Search Engine Optimization */}
      <h2 className="sr-only">Real Patient Reviews – Best Dental Clinic in Sirsa</h2>
      <script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

      <div className="max-w-7xl mx-auto flex flex-col items-center">
        
        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 test-element">
          Verified Reviews
        </h3>
        <h3 className="font-display text-4xl md:text-5xl font-bold text-dark mb-16 tracking-tight text-center test-element">
          Real Patient Experiences
        </h3>

        {/* --- Slider Component --- */}
        <div className="w-full relative test-element mb-24">
          
          {/* Controls */}
          <button 
            onClick={scrollLeft} 
            aria-label="Previous reviews"
            className="hidden md:flex absolute -left-6 lg:-left-16 inset-y-0 my-auto bg-white border border-gray-200 text-dark w-12 h-12 rounded-full items-center justify-center shadow-md hover:bg-gray-50 hover:scale-105 transition-all z-20"
          >
            <ChevronLeft size={24} />
          </button>
          
          <button 
            onClick={scrollRight} 
            aria-label="Next reviews"
            className="hidden md:flex absolute -right-6 lg:-right-16 inset-y-0 my-auto bg-white border border-gray-200 text-dark w-12 h-12 rounded-full items-center justify-center shadow-md hover:bg-gray-50 hover:scale-105 transition-all z-20"
          >
            <ChevronRight size={24} />
          </button>

          {/* Cards Track */}
          <div 
            ref={sliderRef}
            onScroll={handleScroll}
            style={{ scrollbarWidth: 'none', msOverflowStyle: 'none' }}
            className="flex overflow-x-auto snap-x snap-mandatory gap-6 pb-8 pt-4 w-full"
          >
            {REVIEWS.map((review, idx) => (
              <div 
                key={idx} 
                className="flex-shrink-0 w-full sm:w-[calc(100%/2-12px)] lg:w-[calc(100%/3-16px)] snap-center bg-white rounded-2xl p-6 md:p-8 shadow-[0_4px_25px_rgba(0,0,0,0.04)] border border-gray-100 flex flex-col justify-between"
              >
                <div>
                  <Quote size={32} className="text-[#9A7B4F]/20 mb-4" />
                  <div className="flex gap-1 mb-4">
                    {[...Array(5)].map((_, i) => (
                      <Star key={i} size={16} className="fill-[#9A7B4F] text-[#9A7B4F]" />
                    ))}
                  </div>
                  <p className="font-sans text-dark/80 font-medium leading-relaxed mb-6 line-clamp-4">
                    "{review.text}"
                  </p>
                </div>

                <div className="flex items-center gap-4 mt-auto">
                   <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center border border-gray-200 uppercase font-bold text-[#9A7B4F] text-sm">
                     {review.name.charAt(0)}
                   </div>
                   <div>
                     <div className="font-bold text-dark text-sm">{review.name}</div>
                     <div className="flex items-center gap-1 mt-0.5">
                       <CheckCircle2 size={12} className="text-green-500 fill-green-50" />
                       <span className="text-[11px] font-bold text-muted uppercase tracking-wider">Verified Patient</span>
                     </div>
                   </div>
                </div>
              </div>
            ))}
          </div>

          {/* Pagination Dots */}
          <div className="flex justify-center gap-2 mt-4 hidden md:flex">
             {REVIEWS.map((_, i) => (
               <button
                 key={i}
                 onClick={() => scrollToDot(i)}
                 aria-label={`Go to review ${i + 1}`}
                 className={`transition-all duration-300 rounded-full ${
                   activeDot === i ? 'w-8 h-2 bg-[#9A7B4F]' : 'w-2 h-2 bg-gray-300 hover:bg-gray-400'
                 }`}
               />
             ))}
          </div>

        </div>

        {/* --- Single Integrated Mobile-Ratio Video Testimonial --- */}
        <div className="w-full max-w-[450px] mx-auto flex flex-col items-center test-element">
          
          <h3 className="sr-only">International Patient Testimonial video</h3>
          <p className="sr-only">Experienced dentist in Sirsa performing pain-free root canal treatment.</p>

          <div 
            className="w-full relative rounded-3xl overflow-hidden shadow-2xl border border-gray-100 bg-black/5 flex items-center justify-center cursor-pointer group"
            style={{ aspectRatio: '9/16' }}
          >
            <video
              className="w-full h-full object-cover rounded-3xl"
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

          <div className="mt-8 text-center px-2">
            <h4 className="font-display font-bold text-2xl text-dark mb-2 tracking-tight">Prabhnoor Kaur’s Smile Journey</h4>
            <p className="font-sans text-sm text-muted font-medium mb-5 leading-relaxed px-4">
              "Happy patient from Australia sharing her pain-free dental experience"
            </p>
            <div className="inline-flex bg-[#9A7B4F]/10 text-[#9A7B4F] text-xs font-bold px-4 py-2 rounded-xl items-center gap-2 uppercase tracking-widest shadow-sm">
               Verified International Patient
            </div>
          </div>
        </div>

      </div>
    </section>
  );
}
