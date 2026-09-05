import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { 
  MapPin, 
  Phone, 
  Clock, 
  MessageCircle, 
  Navigation, 
  CheckCircle2, 
  Calendar,
  Mail,
  ShieldCheck,
  ChevronDown
} from 'lucide-react';
import SEOHead, { CLINIC_NAP } from '../components/SEOHead';
import { trackPhoneCall, trackWhatsAppClick, trackConversionEvent } from '../utils/tracking';

const LOCATION_FAQS = [
  {
    q: "Where exactly is Elite Dental Clinic located in Sirsa?",
    a: "Elite Dental Clinic is situated on Dabwali Road, directly opposite City Diagnostic Centre and near Dr. Lal Path Lab, Sirsa (125055). It is centrally accessible with roadside parking available."
  },
  {
    q: "What are the clinic opening and consultation hours?",
    a: "We are open Monday to Saturday from 10:00 am to 7:30 pm (Lunch break: 2:30 pm to 4:00 pm), and Sunday from 10:00 am to 2:30 pm. Emergency priority consultations can be scheduled via WhatsApp."
  },
  {
    q: "How can I book an appointment before visiting?",
    a: "You can book directly by calling +91 94676-24898, messaging on WhatsApp, or using the online consultation request modal on our website. The initial consultation fee is ₹200."
  },
  {
    q: "Is parking available at the clinic?",
    a: "Yes, dedicated and convenient front parking space is available for two-wheelers and cars directly outside the clinic facility on Dabwali Road."
  },
  {
    q: "Does Elite Dental Clinic handle dental emergencies in Sirsa?",
    a: "Yes. For severe dental trauma, acute pulpitis toothache, or facial swelling, please contact our emergency WhatsApp channel immediately for same-day priority relief."
  }
];

export default function ContactPage() {
  const [openFaq, setOpenFaq] = useState(-1);

  const handlePhoneClick = () => trackPhoneCall('contact_page_call');
  const handleWhatsAppClick = () => {
    trackWhatsAppClick('contact_page_whatsapp');
    window.open(`https://wa.me/${CLINIC_NAP.whatsapp}?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20visit%20the%20clinic%20in%20Sirsa%20for%20a%20consultation`, '_blank', 'noopener,noreferrer');
  };

  const openBookingModal = (e) => {
    e.preventDefault();
    trackConversionEvent('appointment_start', { source: 'contact_page' });
    window.dispatchEvent(new CustomEvent('open-booking-modal'));
  };

  const mapLink = "https://www.google.com/maps/search/?api=1&query=Elite+Dental+Clinic+Sirsa";

  return (
    <div className="bg-[#FAF8F5] min-h-screen text-dark">
      <SEOHead
        title="Contact & Location | Elite Dental Clinic Sirsa, Haryana"
        metaTitle="Contact & Clinic Location | Elite Dental Clinic Sirsa, Haryana"
        metaDescription="Visit Elite Dental Clinic on Dabwali Road, Sirsa (Opp. City Diagnostic Centre). Get directions, working hours, phone (+91 94676-24898), and book a visit with Dr. Nandini Bansal."
        canonicalUrl="/contact"
        breadcrumbs={[
          { name: "Home", url: "/" },
          { name: "Contact & Clinic Location", url: "/contact" }
        ]}
      />

      {/* Breadcrumbs */}
      <div className="bg-white border-b border-[#9A7B4F]/15 py-2.5 px-4 sm:px-6 lg:px-12 text-xs">
        <div className="max-w-6xl mx-auto flex items-center gap-2 text-muted">
          <Link to="/" className="hover:text-[#9A7B4F] transition-colors">Home</Link>
          <span>/</span>
          <span className="text-dark font-semibold">Contact & Clinic Location</span>
        </div>
      </div>

      {/* Hero Header */}
      <section className="bg-gradient-to-b from-white via-[#FDFBF7] to-[#FAF8F5] py-8 sm:py-12 px-4 sm:px-6 lg:px-12 border-b border-[#9A7B4F]/20">
        <div className="max-w-4xl mx-auto text-center">
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold bg-[#FAF6EE] border border-[#9A7B4F]/30 px-3 py-1 rounded-full inline-block mb-2 shadow-2xs">
            Sirsa, Haryana • Local Dental Entity
          </span>
          <h1 className="font-display text-2xl sm:text-4xl font-extrabold text-dark tracking-tight mb-2">
            Visit Elite Dental Clinic in Sirsa
          </h1>
          <p className="font-sans text-muted text-xs sm:text-sm max-w-xl mx-auto leading-relaxed">
            Conveniently situated on Dabwali Road, Opp. City Diagnostic Centre. State-of-the-art sterile dental suites led by Chief Dental Surgeon Dr. Nandini Bansal (BDS).
          </p>

          <div className="flex flex-wrap items-center justify-center gap-3 mt-6">
            <button
              onClick={openBookingModal}
              className="bg-gradient-to-r from-[#9A7B4F] to-[#7D623C] hover:brightness-105 text-white font-bold py-2.5 px-6 rounded-xl shadow-md transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <Calendar size={15} />
              <span>Book Appointment (₹200)</span>
            </button>
            <a
              href={`tel:${CLINIC_NAP.phonePrimary}`}
              onClick={handlePhoneClick}
              className="bg-white border border-[#9A7B4F]/35 hover:border-[#9A7B4F] text-dark font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 hover:bg-[#FAF8F5]"
            >
              <Phone size={15} className="text-[#9A7B4F]" />
              <span>Call {CLINIC_NAP.phoneDisplay}</span>
            </a>
            <button
              onClick={handleWhatsAppClick}
              className="bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2.5 px-5 rounded-xl shadow-xs transition-all active:scale-95 text-xs sm:text-sm flex items-center gap-2 cursor-pointer"
            >
              <MessageCircle size={15} />
              <span>WhatsApp Us</span>
            </button>
          </div>
        </div>
      </section>

      {/* Main Grid: Details + Map */}
      <div className="max-w-6xl mx-auto py-10 px-4 sm:px-6 lg:px-12">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          
          {/* Left Column: NAP & Hours (5 Cols) */}
          <div className="lg:col-span-5 space-y-4">
            
            {/* Address Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-2">
                <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#9A7B4F] flex items-center justify-center border border-[#9A7B4F]/30 shrink-0">
                  <MapPin size={17} />
                </div>
                <h3 className="font-display font-bold text-dark text-sm sm:text-base">
                  Clinic Address & Landmark
                </h3>
              </div>
              <p className="text-muted text-xs sm:text-sm leading-relaxed mb-3">
                <strong>Elite Dental Clinic</strong><br />
                Near Dr. Lal Path Lab, Opposite City Diagnostic Centre,<br />
                Dabwali Road, Sirsa – 125055 (Haryana), India
              </p>
              <a
                href={mapLink}
                target="_blank"
                rel="noreferrer"
                className="inline-flex items-center gap-1.5 text-xs font-bold text-[#80633C] hover:underline"
              >
                <Navigation size={13} className="text-[#9A7B4F]" />
                <span>Open in Google Maps Application &rarr;</span>
              </a>
            </div>

            {/* Operating Hours Card */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs">
              <div className="flex items-center gap-2.5 mb-3">
                <div className="w-8 h-8 rounded-xl bg-[#FAF6EE] text-[#9A7B4F] flex items-center justify-center border border-[#9A7B4F]/30 shrink-0">
                  <Clock size={17} />
                </div>
                <h3 className="font-display font-bold text-dark text-sm sm:text-base">
                  Operating Hours
                </h3>
              </div>
              <div className="space-y-2 text-xs text-muted">
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="font-semibold text-dark">Monday – Saturday:</span>
                  <span>10:00 am – 7:30 pm</span>
                </div>
                <div className="flex justify-between pb-1.5 border-b border-gray-100">
                  <span className="font-semibold text-dark">Sunday:</span>
                  <span>10:00 am – 2:30 pm</span>
                </div>
                <div className="flex justify-between text-amber-800 bg-amber-50 p-2 rounded-lg">
                  <span className="font-semibold">Daily Lunch Break:</span>
                  <span>2:30 pm – 4:00 pm</span>
                </div>
              </div>
            </div>

            {/* Direct Phone & Email */}
            <div className="bg-white rounded-2xl p-5 border border-gray-200/80 shadow-2xs">
              <h3 className="font-display font-bold text-dark text-xs uppercase tracking-wider text-[#9A7B4F] mb-3">
                Direct Contact Channels
              </h3>
              <div className="space-y-2.5 text-xs">
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#9A7B4F]" />
                  <a href="tel:+919467624898" className="font-bold text-dark hover:text-[#9A7B4F]">
                    +91 94676-24898 (Primary)
                  </a>
                </div>
                <div className="flex items-center gap-2">
                  <Phone size={14} className="text-[#9A7B4F]" />
                  <a href="tel:+919306299901" className="font-bold text-dark hover:text-[#9A7B4F]">
                    +91 93062-99901 (Clinic Line)
                  </a>
                </div>
                <div className="flex items-center gap-2 text-muted">
                  <Mail size={14} className="text-[#9A7B4F]" />
                  <span>elitedentalclinic30@gmail.com</span>
                </div>
              </div>
            </div>

          </div>

          {/* Right Column: Google Maps Embed & Location FAQs (7 Cols) */}
          <div className="lg:col-span-7 space-y-6">
            
            {/* Interactive Google Map Box */}
            <div className="bg-white rounded-2xl p-3 border border-[#9A7B4F]/25 shadow-md overflow-hidden">
              <div className="w-full h-72 sm:h-84 rounded-xl overflow-hidden relative border border-gray-100">
                <iframe 
                  src="https://maps.google.com/maps?width=100%25&amp;height=600&amp;hl=en&amp;q=Elite%20Dental%20Clinic,%20Sirsa,%20Haryana+(Elite%20Dental%20Clinic)&amp;t=&amp;z=14&amp;ie=UTF8&amp;iwloc=B&amp;output=embed"
                  width="100%" 
                  height="100%" 
                  style={{ border: 0 }}
                  allowFullScreen="" 
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                  title="Elite Dental Clinic Map Location Sirsa"
                  className="w-full h-full"
                />
              </div>
              <div className="pt-3 px-1 flex items-center justify-between text-xs">
                <span className="text-muted">Landmark: Opp. City Diagnostic Centre</span>
                <a
                  href={mapLink}
                  target="_blank"
                  rel="noreferrer"
                  className="font-bold text-[#80633C] hover:underline flex items-center gap-1"
                >
                  <span>Get Driving Directions</span>
                  <span>&rarr;</span>
                </a>
              </div>
            </div>

            {/* Location FAQs */}
            <div className="bg-white rounded-2xl p-5 sm:p-6 border border-gray-200/80 shadow-2xs">
              <h3 className="font-display font-bold text-base sm:text-lg text-dark mb-3">
                Location & Visiting FAQs
              </h3>

              <div className="space-y-2">
                {LOCATION_FAQS.map((faq, idx) => (
                  <div 
                    key={idx} 
                    className={`border rounded-xl overflow-hidden transition-all duration-200 ${openFaq === idx ? 'border-[#9A7B4F]/50 bg-[#FAF8F5]' : 'border-gray-200 bg-white'}`}
                  >
                    <button 
                      onClick={() => setOpenFaq(openFaq === idx ? -1 : idx)}
                      className="w-full px-4 py-3 flex items-center justify-between text-left cursor-pointer text-xs sm:text-sm font-bold text-dark"
                    >
                      <span>{faq.q}</span>
                      <ChevronDown size={15} className={`text-[#9A7B4F] shrink-0 transition-transform ${openFaq === idx ? 'rotate-180' : ''}`} />
                    </button>
                    {openFaq === idx && (
                      <div className="px-4 pb-4 pt-1 text-muted text-xs leading-relaxed border-t border-gray-100">
                        {faq.a}
                      </div>
                    )}
                  </div>
                ))}
              </div>
            </div>

          </div>

        </div>
      </div>
    </div>
  );
}
