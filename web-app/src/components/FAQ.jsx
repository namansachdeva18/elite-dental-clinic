import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

const FAQS = [
  {
    q: "Is RCT painful?",
    a: "No! We use advanced laser-assisted technology and premium local anesthetics to ensure your Root Canal Treatment is 100% pain-free and comfortable."
  },
  {
    q: "How long does treatment take?",
    a: "Most treatments, including professional Teeth Whitening and localized extractions, are completed in under 45 minutes in a single visit. Complex cases will have clear timelines provided during consultation."
  },
  {
    q: "Do you offer emergency services?",
    a: "Yes, we are open 24/7 for dental emergencies in Sirsa. If you are experiencing severe pain, contact us on WhatsApp immediately for priority scheduling."
  },
  {
    q: "What is the cost of a routine consultation?",
    a: "Our comprehensive consultation, which includes a detailed diagnosis by Dr. Nandini, is just ₹200."
  },
  {
    q: "Do you provide EMI options for Braces or Implants?",
    a: "Absolutely. We believe premium dental care should be accessible, so we offer flexible, zero-interest EMI plans for high-value treatments."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(0);

  return (
    <section id="faq" className="py-12 md:py-16 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
      <div className="max-w-4xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-8">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Patient Questions
          </span>
          <h2 className="font-display text-2xl sm:text-3xl lg:text-4xl font-bold text-dark tracking-tight mt-1 mb-1">
            Frequently <span className="text-[#9A7B4F]">Asked</span>
          </h2>
          <p className="font-sans text-muted text-xs sm:text-sm">
            Everything you need to know about visits, consultation costs, and pain-free procedures.
          </p>
        </div>

        <div className="flex flex-col gap-3">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-[#9A7B4F]/20 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'shadow-md border-[#D4AF37] bg-[#FAF8F5]' : 'hover:border-[#9A7B4F]/40 bg-white'}`}
            >
              <button 
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="w-full px-5 sm:px-6 py-4 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-display font-bold text-sm sm:text-base text-dark pr-4">{faq.q}</span>
                <ChevronDown 
                  size={18} 
                  className={`text-[#9A7B4F] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180 text-[#80633C]' : ''}`} 
                />
              </button>
              
              <div 
                className={`px-6 md:px-8 overflow-hidden transition-all duration-300 ease-in-out ${openIndex === i ? 'pb-6 max-h-[400px] opacity-100' : 'max-h-0 opacity-0'}`}
              >
                <p className="font-sans text-muted leading-relaxed">
                  {faq.a}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
