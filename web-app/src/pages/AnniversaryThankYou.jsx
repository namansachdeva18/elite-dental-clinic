import React, { useEffect, useState } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { CheckCircle2, Sparkles, MessageCircle, Phone, ArrowLeft, ShieldCheck, MapPin, Calendar } from 'lucide-react';
import { CAMPAIGN_CONFIG, getCampaignWhatsAppUrl } from '../config/campaignConfig';
import { trackConversionEvent, initAttributionTracking } from '../utils/tracking';

export default function AnniversaryThankYou() {
  const [leadData, setLeadData] = useState(null);

  useEffect(() => {
    initAttributionTracking();

    // Read cached lead submission data
    try {
      const stored = sessionStorage.getItem('elite_unlocked_lead');
      if (stored) {
        setLeadData(JSON.parse(stored));
      }
    } catch (e) {
      console.warn('Error reading lead session:', e);
    }

    // Fire Google Ads primary conversion event specifically on successful thank you load
    trackConversionEvent('offer_unlocked_thank_you_view', {
      conversion_page: '/anniversary-offer/thank-you'
    });
  }, []);

  const handleWhatsApp = () => {
    trackConversionEvent('whatsapp_click', { source: 'thank_you_page', treatment: leadData?.treatment });
    const waUrl = getCampaignWhatsAppUrl(leadData?.treatment || '', `[VOUCHER CODE: ${CAMPAIGN_CONFIG.discountCode}]`);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCall = () => {
    trackConversionEvent('phone_click', { source: 'thank_you_page' });
    window.location.href = `tel:${CAMPAIGN_CONFIG.phone}`;
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-[#FAF7F2] via-white to-[#FAF7F2] py-16 px-4 sm:px-6 flex flex-col justify-between">
      
      <Helmet>
        <title>Anniversary Offer Unlocked | Elite Dental Clinic Sirsa</title>
        <meta name="description" content="Your 20% Anniversary Offer has been unlocked. Elite Dental Clinic will contact you shortly." />
        <meta name="robots" content="noindex, follow" />
      </Helmet>

      {/* Header Back Link */}
      <div className="max-w-4xl mx-auto w-full mb-8">
        <Link to="/" className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-muted hover:text-[#9A7B4F] transition-colors">
          <ArrowLeft size={16} />
          <span>Return to Clinic Website</span>
        </Link>
      </div>

      {/* Main Conversion Card */}
      <div className="max-w-xl mx-auto w-full bg-white rounded-3xl p-6 sm:p-10 shadow-2xl border-2 border-[#9A7B4F]/20 relative overflow-hidden text-center my-auto">
        
        <div className="absolute top-0 left-0 right-0 h-2 bg-gradient-to-r from-[#9A7B4F] via-[#D4AF37] to-[#9A7B4F]" />

        {/* Success Icon */}
        <div className="w-20 h-20 rounded-full bg-green-50 border-2 border-green-200 text-green-600 flex items-center justify-center mx-auto mb-5 shadow-inner animate-in zoom-in duration-300">
          <CheckCircle2 size={44} />
        </div>

        {/* Badge */}
        <div className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-4 py-1.5 rounded-full text-xs uppercase tracking-wider mb-3">
          <Sparkles size={14} className="text-[#9A7B4F]" />
          <span>Anniversary Offer Unlocked</span>
        </div>

        <h1 className="font-display text-3xl sm:text-4xl font-extrabold text-dark tracking-tight mb-2">
          Your Smile Journey Starts Here.
        </h1>

        <p className="font-sans text-muted text-sm sm:text-base leading-relaxed mb-6">
          Thank you, <strong className="text-dark font-semibold">{leadData?.name || 'Valued Patient'}</strong>. Your anniversary offer request has been logged successfully.
        </p>

        {/* Unlocked Voucher Card */}
        <div className="bg-[#FAF8F5] rounded-2xl p-6 border border-[#9A7B4F]/30 mb-8 text-left relative overflow-hidden">
          <div className="flex justify-between items-start mb-3">
            <div>
              <span className="text-[11px] font-mono uppercase tracking-widest text-[#9A7B4F] font-bold block">
                Elite Dental Clinic Special
              </span>
              <span className="font-display text-3xl font-black text-dark block">
                20% OFF BENEFIT
              </span>
            </div>
            <div className="bg-[#2B2317] text-[#EADBB6] font-mono text-xs px-3 py-1.5 rounded-lg font-bold border border-[#9A7B4F]/30">
              {CAMPAIGN_CONFIG.discountCode}
            </div>
          </div>

          <div className="space-y-2 pt-3 border-t border-gray-200 text-xs text-gray-700">
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
              <span>Enquiry received and routed to clinical team.</span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
              <span>Selected Treatment: <strong>{leadData?.treatment || 'Premium Dental Services'}</strong></span>
            </div>
            <div className="flex items-center gap-2">
              <CheckCircle2 size={14} className="text-green-600 flex-shrink-0" />
              <span>Clinic coordinator will reach out shortly to confirm your time.</span>
            </div>
          </div>

          <div className="mt-4 pt-3 border-t border-dashed border-gray-300 text-[11px] text-muted italic">
            * Please mention code <strong>"{CAMPAIGN_CONFIG.discountCode}"</strong> or <strong>"ANNIVERSARY OFFER"</strong> when contacting the clinic.
          </div>
        </div>

        {/* Action CTAs */}
        <div className="flex flex-col sm:flex-row gap-3 w-full mb-6">
          <button 
            onClick={handleWhatsApp}
            className="flex-1 bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
          >
            <MessageCircle size={18} />
            <span>Chat on WhatsApp Now</span>
          </button>

          <button 
            onClick={handleCall}
            className="flex-1 bg-dark hover:bg-black text-white font-bold py-4 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
          >
            <Phone size={18} />
            <span>Call Clinic ({CAMPAIGN_CONFIG.phoneDisplay})</span>
          </button>
        </div>

        {/* Location & Trust */}
        <div className="flex flex-col items-center gap-1.5 text-xs text-muted pt-4 border-t border-gray-100">
          <span className="flex items-center gap-1.5 font-medium text-gray-700">
            <MapPin size={14} className="text-[#9A7B4F]" />
            <span>Near Dr. Lal Path Lab, Dabwali Road, Sirsa</span>
          </span>
          <span className="flex items-center gap-1.5 text-[11px]">
            <ShieldCheck size={13} className="text-green-600" />
            <span>100% Pain-Free Gentle Care • Dr. Nandini Bansal</span>
          </span>
        </div>

      </div>

      {/* Footer */}
      <div className="text-center text-xs text-gray-400 mt-8">
        © {new Date().getFullYear()} Elite Dental Clinic Sirsa. All Rights Reserved.
      </div>

    </div>
  );
}
