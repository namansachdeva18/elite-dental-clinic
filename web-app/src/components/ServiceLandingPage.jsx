import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  Phone, 
  MessageCircle, 
  Calendar, 
  CheckCircle2, 
  ChevronDown, 
  Clock, 
  Shield, 
  MapPin, 
  Award, 
  Sparkles,
  ArrowRight,
  AlertCircle
} from 'lucide-react';
import SEOHead, { CLINIC_NAP } from '../components/SEOHead';
import { trackPhoneCall, trackWhatsAppClick, trackConversionEvent } from '../utils/tracking';

/**
 * Production-Grade Service Landing Page Template
 * Optimized for:
 * 1. Google Ads Intent & Quality Score
 * 2. Local Organic SEO & Google Maps Entity Reinforcement
 * 3. AI Search (Perplexity, ChatGPT, SGE/AI Overviews) Semantic Extractability
 * 4. Conversion Rate Optimization (Call, WhatsApp, Appointment Booking)
 */
export default function ServiceLandingPage({
  title,
  metaTitle,
  metaDescription,
  canonicalUrl,
  breadcrumbs,
  heroBadge,
  h1,
  leadIntro,
  quickFacts,
  whoIsThisFor,
  whatItSolves,
  symptomsList,
  procedureSteps,
  technologyUsed,
  timelineAndRecovery,
  risksAndLimitations,
  treatmentAlternatives,
  faqs,
  relatedTreatments = [],
  schemaProcedureType
}) {
  const [openFaq, setOpenFaq] = useState(-1);

  const handlePhoneClick = () => {
    trackPhoneCall(`service_page_${canonicalUrl}`);
  };

  const handleWhatsAppClick = () => {
    trackWhatsAppClick(`service_page_${canonicalUrl}`);
    const message = `Hi Elite Dental Clinic, I am inquiring about ${title} in Sirsa. Please share consultation slot availability.`;
    window.open(`https://wa.me/${CLINIC_NAP.whatsapp}?text=${encodeURIComponent(message)}`, '_blank', 'noopener,noreferrer');
  };

  const openBookingModal = (e) => {
    e.preventDefault();
    trackConversionEvent('appointment_start', { service: title, source: 'service_landing_page' });
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  // Treatment Schema definition
  const procedureSchema = {
    "@type": "MedicalProcedure",
    "@id": `https://www.elitedentalclinic.info${canonicalUrl}#procedure`,
    "name": title,
    "procedureType": schemaProcedureType || "http://schema.org/PercutaneousProcedure",
    "description": metaDescription,
    "howPerformed": procedureSteps?.map(step => step.title).join(". "),
    "provider": {
      "@id": "https://www.elitedentalclinic.info/#dentist"
    },
    "location": {
      "@type": "Place",
      "name": CLINIC_NAP.name,
      "address": {
        "@type": "PostalAddress",
        "streetAddress": CLINIC_NAP.streetAddress,
        "addressLocality": CLINIC_NAP.addressLocality,
        "addressRegion": CLINIC_NAP.addressRegion,
        "postalCode": CLINIC_NAP.postalCode,
        "addressCountry": CLINIC_NAP.addressCountry
      }
    }
  };

  const faqSchema = faqs && faqs.length > 0 ? {
    "@type": "FAQPage",
    "@id": `https://www.elitedentalclinic.info${canonicalUrl}#faq`,
    "mainEntity": faqs.map(faq => ({
      "@type": "Question",
      "name": faq.q,
      "acceptedAnswer": {
        "@type": "Answer",
        "text": faq.a
      }
    }))
  } : null;

  const pageSchemas = [procedureSchema];
  if (faqSchema) pageSchemas.push(faqSchema);

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-dark">
      <SEOHead 
        title={metaTitle}
        description={metaDescription}
        canonicalUrl={canonicalUrl}
        breadcrumbs={breadcrumbs}
        schema={pageSchemas}
      />

      {/* Breadcrumbs Navigation */}
      <div className="bg-white border-b border-[#9A7B4F]/15 py-2.5 px-4 sm:px-6 lg:px-12 text-xs">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-muted">
          <Link to="/" className="hover:text-[#9A7B4F] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-gray-400">Services</span>
          <span>/</span>
          <span className="text-dark font-semibold truncate">{title}</span>
        </div>
      </div>

      {/* Hero Section — Built for Google Ads High Relevance */}
      <section className="bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF8F5] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 border-b border-[#9A7B4F]/20">
        <div className="max-w-6xl mx-auto">
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
            
            {/* Left Content Area (7 Cols) */}
            <div className="lg:col-span-7 flex flex-col">
              
              <div className="inline-flex items-center gap-2 bg-[#FAF6EE] border border-[#9A7B4F]/30 px-3 py-1 rounded-full text-[11px] sm:text-xs font-bold text-[#80633C] w-max mb-3 shadow-2xs">
                <Sparkles size={13} className="text-[#9A7B4F]" />
                <span>{heroBadge || 'Elite Dental Care • Sirsa, Haryana'}</span>
              </div>

              <h1 className="font-display text-2xl sm:text-4xl lg:text-4xl font-extrabold text-dark tracking-tight leading-tight mb-3">
                {h1}
              </h1>

              <p className="font-sans text-muted text-sm sm:text-base leading-relaxed mb-6">
                {leadIntro}
              </p>

              {/* Conversion CTAs — High Intent Call, WhatsApp, Appointment */}
              <div className="flex flex-wrap items-center gap-3 mb-6">
                <button
                  onClick={openBookingModal}
                  className="bg-gradient-to-r from-[#9A7B4F] to-[#7D623C] hover:brightness-105 text-white font-bold py-3 px-6 rounded-xl shadow-md transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <Calendar size={15} />
                  <span>Book Consultation (₹200)</span>
                </button>

                <a
                  href={`tel:${CLINIC_NAP.phonePrimary}`}
                  onClick={handlePhoneClick}
                  className="bg-white border border-[#9A7B4F]/35 hover:border-[#9A7B4F] text-dark font-bold py-3 px-5 rounded-xl shadow-xs transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#FAF8F5]"
                >
                  <Phone size={15} className="text-[#9A7B4F]" />
                  <span>Call {CLINIC_NAP.phoneDisplay}</span>
                </a>

                <button
                  onClick={handleWhatsAppClick}
                  className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3 px-5 rounded-xl shadow-xs transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
                >
                  <MessageCircle size={15} />
                  <span>WhatsApp Doctor</span>
                </button>
              </div>

              {/* Verified Trust Pillars */}
              <div className="grid grid-cols-2 sm:grid-cols-3 gap-3 pt-4 border-t border-gray-200/80">
                <div className="flex items-center gap-2">
                  <CheckCircle2 size={16} className="text-emerald-600 shrink-0" />
                  <span className="text-xs font-semibold text-dark">PGI Strict Protocols</span>
                </div>
                <div className="flex items-center gap-2">
                  <Shield size={16} className="text-[#9A7B4F] shrink-0" />
                  <span className="text-xs font-semibold text-dark">100% Sterilization</span>
                </div>
                <div className="flex items-center gap-2 col-span-2 sm:col-span-1">
                  <Award size={16} className="text-[#D4AF37] shrink-0" />
                  <span className="text-xs font-semibold text-dark">Dr. Nandini Bansal (BDS)</span>
                </div>
              </div>

            </div>

            {/* Right Card / Fast Facts Box (5 Cols) — Highly Citable by AI Search */}
            <div className="lg:col-span-5 bg-white rounded-2xl p-5 sm:p-6 border border-[#9A7B4F]/25 shadow-md">
              <h3 className="font-display font-bold text-base sm:text-lg text-dark mb-4 pb-2 border-b border-gray-100 flex items-center justify-between">
                <span>Treatment Snapshot</span>
                <span className="text-[11px] font-mono text-[#9A7B4F] font-bold">SIRSA CLINIC</span>
              </h3>

              <div className="space-y-3.5 text-xs sm:text-sm">
                {quickFacts && quickFacts.map((fact, idx) => (
                  <div key={idx} className="flex items-start justify-between gap-3">
                    <span className="text-muted font-medium shrink-0">{fact.label}:</span>
                    <span className="font-semibold text-dark text-right">{fact.value}</span>
                  </div>
                ))}

                <div className="pt-3 border-t border-gray-100 flex items-start gap-2 text-muted text-[11px]">
                  <MapPin size={14} className="text-[#9A7B4F] shrink-0 mt-0.5" />
                  <span>Dabwali Road, Opp. City Diagnostic Centre, Sirsa (125055)</span>
                </div>
              </div>

              {/* Consultation Note */}
              <div className="mt-5 bg-[#FAF6EE] p-3 rounded-xl border border-[#9A7B4F]/20 text-[11px] text-[#80633C] leading-snug">
                <strong>Medical Assessment:</strong> Exact procedure requirements, crown type, and suitability are finalized during the initial in-clinic diagnostic assessment.
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* Main Semantic Content Architecture */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12">
          
          {/* Main Informational & Educational Flow (8 Cols) */}
          <div className="lg:col-span-8 space-y-10">

            {/* Section 1: Who It's For & What It Solves (Clear AI Search "WHAT" & "WHO") */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-4">
                Who Is This Treatment For & What Does It Solve?
              </h2>
              
              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm">
                <div>
                  <h3 className="font-bold text-dark mb-2 text-[#9A7B4F]">Recommended For:</h3>
                  <ul className="space-y-2 text-muted">
                    {whoIsThisFor?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#9A7B4F] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h3 className="font-bold text-dark mb-2 text-[#9A7B4F]">Dental Problems Solved:</h3>
                  <ul className="space-y-2 text-muted">
                    {whatItSolves?.map((item, i) => (
                      <li key={i} className="flex items-start gap-2">
                        <span className="text-[#9A7B4F] font-bold">✓</span>
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </div>
              </div>

              {symptomsList && symptomsList.length > 0 && (
                <div className="mt-6 pt-5 border-t border-gray-100">
                  <h3 className="font-bold text-dark text-xs sm:text-sm mb-2">Common Symptoms Indicating You Need Evaluation:</h3>
                  <div className="flex flex-wrap gap-2">
                    {symptomsList.map((symptom, i) => (
                      <span key={i} className="bg-gray-50 border border-gray-200 text-gray-700 px-2.5 py-1 rounded-lg text-xs">
                        {symptom}
                      </span>
                    ))}
                  </div>
                </div>
              )}
            </section>

            {/* Section 2: Step-by-Step Procedure Process (AI Search "HOW") */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-3">
                Treatment Procedure at Elite Dental Clinic
              </h2>
              <p className="font-sans text-muted text-xs sm:text-sm mb-6">
                Our clinical protocol focuses on gentle technique, strict hospital-grade sterilization, and complete patient comfort.
              </p>

              <div className="space-y-5">
                {procedureSteps?.map((step, idx) => (
                  <div key={idx} className="flex items-start gap-4">
                    <div className="w-8 h-8 rounded-full bg-[#FAF6EE] border border-[#9A7B4F]/40 text-[#9A7B4F] font-bold text-xs flex items-center justify-center shrink-0 mt-0.5">
                      {idx + 1}
                    </div>
                    <div>
                      <h3 className="font-bold text-dark text-sm sm:text-base mb-1">
                        {step.title}
                      </h3>
                      <p className="font-sans text-muted text-xs sm:text-sm leading-relaxed">
                        {step.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 3: Technology & Equipment */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-3">
                Technology & Protocols in Our Sirsa Suite
              </h2>
              <p className="font-sans text-muted text-xs sm:text-sm mb-4">
                We invest in verified modern dental equipment to ensure precision, lower chair time, and pain-free execution.
              </p>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {technologyUsed?.map((tech, i) => (
                  <div key={i} className="p-3.5 rounded-xl bg-[#FAF8F5] border border-[#9A7B4F]/20">
                    <div className="font-bold text-dark text-xs sm:text-sm mb-1 text-[#80633C]">{tech.title}</div>
                    <div className="text-muted text-xs leading-relaxed">{tech.benefit}</div>
                  </div>
                ))}
              </div>
            </section>

            {/* Section 4: Timeline, Recovery & Medically Responsible Care */}
            <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
              <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-4">
                Timeline, Recovery & Aftercare
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-6 text-xs sm:text-sm mb-6">
                <div>
                  <h3 className="font-bold text-dark mb-1 text-[#9A7B4F]">Expected Timeline:</h3>
                  <p className="text-muted leading-relaxed">{timelineAndRecovery?.timeline}</p>
                </div>
                <div>
                  <h3 className="font-bold text-dark mb-1 text-[#9A7B4F]">Aftercare Guidelines:</h3>
                  <p className="text-muted leading-relaxed">{timelineAndRecovery?.aftercare}</p>
                </div>
              </div>

              {/* Medically Responsible Disclaimer */}
              <div className="bg-amber-50/70 border border-amber-200/80 rounded-xl p-4 text-xs text-amber-900 flex items-start gap-2.5">
                <AlertCircle size={17} className="shrink-0 text-amber-700 mt-0.5" />
                <div>
                  <strong>Medical Disclaimer:</strong> Every patient's oral anatomy is unique. Clinical outcomes, recovery times, and candidacy depend on thorough dental evaluation by our surgeon. We do not make misleading claims or guarantee outcomes without diagnostic inspection.
                </div>
              </div>
            </section>

            {/* Section 5: Alternatives & Comparison */}
            {treatmentAlternatives && treatmentAlternatives.length > 0 && (
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-3">
                  Treatment Alternatives & Comparisons
                </h2>
                <p className="text-muted text-xs sm:text-sm mb-4">
                  We believe in transparent patient guidance so you can make informed health decisions:
                </p>

                <div className="space-y-3">
                  {treatmentAlternatives.map((alt, i) => (
                    <div key={i} className="p-3.5 rounded-xl border border-gray-100 bg-[#FAF8F5]">
                      <span className="font-bold text-dark text-xs sm:text-sm block mb-0.5">{alt.name}</span>
                      <p className="text-muted text-xs leading-relaxed">{alt.comparison}</p>
                    </div>
                  ))}
                </div>
              </section>
            )}

            {/* Section 6: Treatment Specific FAQs */}
            {faqs && faqs.length > 0 && (
              <section className="bg-white rounded-2xl p-6 sm:p-8 border border-gray-200/80 shadow-2xs">
                <h2 className="font-display text-xl sm:text-2xl font-bold text-dark mb-2">
                  Frequently Asked Questions About {title}
                </h2>
                <p className="font-sans text-muted text-xs sm:text-sm mb-6">
                  Clear answers based on common patient questions at our Sirsa dental clinic.
                </p>

                <div className="flex flex-col gap-2.5">
                  {faqs.map((faq, i) => (
                    <div 
                      key={i} 
                      className={`border rounded-xl overflow-hidden transition-all duration-200 ${openFaq === i ? 'border-[#9A7B4F]/50 bg-[#FAF8F5]' : 'border-gray-200 bg-white'}`}
                    >
                      <button 
                        onClick={() => setOpenFaq(openFaq === i ? -1 : i)}
                        className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer"
                      >
                        <span className="font-display font-bold text-xs sm:text-sm text-dark pr-2">{faq.q}</span>
                        <ChevronDown 
                          size={15} 
                          className={`text-[#9A7B4F] shrink-0 transition-transform ${openFaq === i ? 'rotate-180' : ''}`} 
                        />
                      </button>
                      
                      {openFaq === i && (
                        <div className="px-4 pb-4 pt-1 text-muted text-xs sm:text-sm leading-relaxed border-t border-gray-100">
                          {faq.a}
                        </div>
                      )}
                    </div>
                  ))}
                </div>
              </section>
            )}

          </div>

          {/* Right Sidebar — Sticky Conversion & Trust Modules (4 Cols) */}
          <div className="lg:col-span-4 space-y-6">

            {/* Doctor Card */}
            <div className="bg-white rounded-2xl p-5 border border-[#9A7B4F]/25 shadow-sm text-center">
              <div className="w-24 h-24 mx-auto rounded-full overflow-hidden border-2 border-[#9A7B4F]/40 shadow-xs mb-3">
                <img 
                  src="/images/doctor.webp" 
                  alt="Dr. Nandini Bansal - Elite Dental Clinic Sirsa" 
                  className="w-full h-full object-cover object-top"
                  loading="lazy"
                />
              </div>

              <h3 className="font-display font-bold text-base text-dark">
                Dr. Nandini Bansal
              </h3>
              <p className="text-xs font-semibold text-[#9A7B4F] mb-2">
                BDS • Chief Dental Surgeon
              </p>
              <p className="text-muted text-xs leading-relaxed mb-4">
                Specialized in single-sitting laser root canals, dental crowns, and restorative care in Sirsa.
              </p>

              <button
                onClick={openBookingModal}
                className="w-full bg-[#1C1813] hover:bg-black text-white font-bold py-2.5 px-4 rounded-xl text-xs transition-all active:scale-95 mb-2 cursor-pointer"
              >
                Schedule with Dr. Nandini
              </button>

              <a
                href={`tel:${CLINIC_NAP.phonePrimary}`}
                onClick={handlePhoneClick}
                className="block text-center text-xs font-bold text-[#9A7B4F] hover:underline"
              >
                Call: {CLINIC_NAP.phoneDisplay}
              </a>
            </div>

            {/* Clinic NAP Box */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs">
              <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#9A7B4F] mb-3">
                Clinic Location & Hours
              </h4>

              <div className="space-y-3 text-xs">
                <div className="flex items-start gap-2 text-muted">
                  <MapPin size={15} className="text-[#9A7B4F] shrink-0 mt-0.5" />
                  <span>Dabwali Road, Opp. City Diagnostic Centre, Near Dr. Lal Path Lab, Sirsa (125055)</span>
                </div>

                <div className="flex items-start gap-2 text-muted">
                  <Clock size={15} className="text-[#9A7B4F] shrink-0 mt-0.5" />
                  <div>
                    <div>Mon – Sat: 10:00 am – 7:30 pm</div>
                    <div>Sunday: 10:00 am – 2:30 pm</div>
                  </div>
                </div>

                <a 
                  href="https://www.google.com/maps/search/?api=1&query=Elite+Dental+Clinic+Sirsa"
                  target="_blank"
                  rel="noreferrer"
                  className="inline-flex items-center gap-1 text-xs font-bold text-[#80633C] hover:underline mt-1"
                >
                  <span>Open Google Maps Directions</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Internal Linking: Related Treatments */}
            {relatedTreatments && relatedTreatments.length > 0 && (
              <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs">
                <h4 className="font-display font-bold text-xs uppercase tracking-wider text-[#9A7B4F] mb-3">
                  Related Dental Treatments
                </h4>
                <div className="flex flex-col gap-2">
                  {relatedTreatments.map((item, idx) => (
                    <Link
                      key={idx}
                      to={item.url}
                      className="flex items-center justify-between p-2.5 rounded-lg hover:bg-[#FAF6EE] text-xs font-medium text-dark border border-transparent hover:border-[#9A7B4F]/20 transition-all group"
                    >
                      <span className="group-hover:text-[#9A7B4F] transition-colors">{item.title}</span>
                      <ArrowRight size={13} className="text-gray-400 group-hover:text-[#9A7B4F] group-hover:translate-x-0.5 transition-transform" />
                    </Link>
                  ))}
                </div>
              </div>
            )}

            {/* Quick Consultation CTA */}
            <div className="bg-gradient-to-br from-[#1C1813] to-[#2B2317] text-white rounded-2xl p-5 border border-[#D4AF37]/30 shadow-md text-center">
              <h4 className="font-display font-bold text-base mb-1">Need Urgent Advice?</h4>
              <p className="text-white/70 text-xs mb-4">
                Experiencing tooth pain or need guidance? WhatsApp our clinic team directly.
              </p>
              <button
                onClick={handleWhatsAppClick}
                className="w-full bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-4 rounded-xl text-xs flex items-center justify-center gap-2 cursor-pointer active:scale-95 transition-all shadow-xs"
              >
                <MessageCircle size={14} />
                <span>Chat with Clinic</span>
              </button>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
