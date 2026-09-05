import React, { useState } from 'react';
import { ChevronDown } from 'lucide-react';

export const FAQS = [
  {
    q: "Is root canal treatment (RCT) painful at Elite Dental Clinic?",
    a: "No. With targeted modern local anesthesia and precision rotary endodontics, root canal therapy is virtually painless and feels very similar to receiving a standard dental filling. We prioritize complete patient comfort."
  },
  {
    q: "Where is Elite Dental Clinic located and what are the clinic hours?",
    a: "We are located on Dabwali Road, opposite City Diagnostic Centre and near Dr. Lal Path Lab in Sirsa (125055). We are open Monday to Saturday from 10:00 am to 7:30 pm (Lunch: 2:30 pm to 4:00 pm) and Sunday from 10:00 am to 2:30 pm."
  },
  {
    q: "What is the consultation fee with Dr. Nandini Bansal?",
    a: "A comprehensive in-clinic dental examination and clinical diagnosis with Dr. Nandini Bansal (BDS) is ₹200. Transparent treatment recommendations and cost options are explained before any procedure begins."
  },
  {
    q: "How long does teeth whitening or a routine dental cleaning take?",
    a: "Ultrasonic scaling and teeth polishing typically take 30 minutes. In-clinic professional LED teeth whitening takes approximately 45 minutes in a single visit, brightening teeth by several shades safely."
  },
  {
    q: "Does the clinic offer zero-interest EMI options for braces or dental implants?",
    a: "Yes. To make advanced dental restorations and orthodontic clear aligners accessible, we offer flexible, zero-interest monthly payment schedules for eligible high-value treatment plans."
  },
  {
    q: "How do I book a priority appointment for severe toothache?",
    a: "You can book directly by calling +91 94676-24898, sending a message on WhatsApp, or submitting our online appointment request. We accommodate same-day urgent visits whenever possible."
  }
];

export default function FAQ() {
  const [openIndex, setOpenIndex] = useState(-1);

  return (
    <section id="faq" className="py-8 md:py-10 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
      <div className="max-w-3xl mx-auto">
        <div className="text-center max-w-xl mx-auto mb-5">
          <span className="font-mono text-[10px] sm:text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            Patient Questions
          </span>
          <h2 className="font-display text-xl sm:text-2xl lg:text-3xl font-bold text-dark tracking-tight mt-0.5 mb-1">
            Frequently <span className="text-[#9A7B4F]">Asked</span>
          </h2>
          <p className="font-sans text-muted text-[11px] sm:text-xs">
            Everything you need to know about visits, consultation costs, and pain-free procedures.
          </p>
        </div>

        <div className="flex flex-col gap-2">
          {FAQS.map((faq, i) => (
            <div 
              key={i} 
              className={`border border-[#9A7B4F]/20 rounded-xl overflow-hidden transition-all duration-300 ${openIndex === i ? 'shadow-sm border-[#D4AF37] bg-[#FAF8F5]' : 'hover:border-[#9A7B4F]/40 bg-white'}`}
            >
              <button 
                onClick={() => setOpenIndex(i === openIndex ? -1 : i)}
                className="w-full px-4 sm:px-5 py-3 flex items-center justify-between text-left cursor-pointer"
              >
                <span className="font-display font-bold text-xs sm:text-sm text-dark pr-3">{faq.q}</span>
                <ChevronDown 
                  size={16} 
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
