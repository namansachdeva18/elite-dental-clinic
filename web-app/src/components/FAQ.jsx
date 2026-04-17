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
    <section id="faq" className="py-24 px-6 md:px-16 bg-white">
      <div className="max-w-4xl mx-auto">
        <h3 className="font-mono text-sm tracking-widest text-[#9A7B4F] uppercase mb-4 text-center">Questions?</h3>
        <h2 className="font-display text-4xl md:text-5xl font-bold text-dark text-center mb-16 tracking-tight">
          Frequently Asked.
        </h2>

        <div className="flex flex-col gap-4">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-gray-200 rounded-2xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'shadow-md border-[#9A7B4F]/30 bg-[#FDFBF7]' : 'hover:border-[#9A7B4F]/20 hover:bg-gray-50'}`}
            >
              <button 
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="w-full px-6 md:px-8 py-5 md:py-6 flex items-center justify-between text-left"
              >
                <span className="font-bold text-lg text-dark pr-8">{faq.q}</span>
                <ChevronDown 
                  size={24} 
                  className={`text-[#9A7B4F] flex-shrink-0 transition-transform duration-300 ${openIndex === i ? 'rotate-180' : ''}`} 
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
