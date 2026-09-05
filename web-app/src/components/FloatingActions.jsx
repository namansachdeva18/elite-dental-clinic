import React, { useEffect, useState } from 'react';
import { MessageCircle, Phone, Sparkles } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import BookingModal from './BookingModal';
import CampaignLeadModal from './CampaignLeadModal';
import { CAMPAIGN_CONFIG, isCampaignActive, getCampaignWhatsAppUrl } from '../config/campaignConfig';
import { trackConversionEvent } from '../utils/tracking';

export default function FloatingActions() {
  const location = useLocation();
  const isCampaignPage = location.pathname.startsWith('/anniversary-offer') || location.pathname.startsWith('/wedding-smile-offer');
  const active = isCampaignActive();

  const [campaignModalOpen, setCampaignModalOpen] = useState(false);
  const [exitIntentDismissed, setExitIntentDismissed] = useState(false);

  // Global trigger listener
  useEffect(() => {
    const handleOpen = () => setCampaignModalOpen(true);
    window.addEventListener('open-campaign-modal-internal', handleOpen);
    return () => window.removeEventListener('open-campaign-modal-internal', handleOpen);
  }, []);

  // Calibrated Lead Generation Trigger:
  // Automatically pops up the 20% Offer booking form on page load / reload after a brief smooth delay (1.2s)
  // Ensures maximum lead capture while allowing the luxury hero aesthetics to paint smoothly first.
  useEffect(() => {
    // Don't auto-pop if on thank-you confirmation page
    if (location.pathname.includes('/thank-you')) return;

    const autoOpenTimer = setTimeout(() => {
      setCampaignModalOpen(true);
    }, 1200);

    // Desktop Exit-Intent trigger (cursor moving toward browser top bar)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentDismissed) {
        setExitIntentDismissed(true);
        setCampaignModalOpen(true);
      }
    };

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      clearTimeout(autoOpenTimer);
      document.removeEventListener('mouseleave', handleMouseLeave);
    };
  }, [exitIntentDismissed, location.pathname]);

  // Handle WhatsApp Click
  const handleWhatsAppClick = () => {
    trackConversionEvent('whatsapp_click', { source: 'floating_whatsapp_btn' });
    const waLink = active 
      ? getCampaignWhatsAppUrl('', '[Website Inquiry]')
      : `https://wa.me/${CAMPAIGN_CONFIG.whatsappNumber}?text=Hi%20Elite%20Dental%20Clinic,%20I%20want%20to%20book%20an%20appointment`;
    window.open(waLink, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = () => {
    trackConversionEvent('phone_click', { source: 'mobile_sticky_bar' });
  };

  return (
    <>
      {/* Sticky WhatsApp Floating Action (Desktop only to prevent mobile screen clashing) */}
      {!isCampaignPage && (
        <button 
          onClick={handleWhatsAppClick}
          className="hidden md:flex fixed bottom-6 right-6 z-[100] bg-[#25D366] text-white p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#20BE5C] hover:scale-110 active:scale-95 transition-all duration-300 items-center justify-center group cursor-pointer"
          aria-label="Chat on WhatsApp with Elite Dental Clinic"
        >
          <MessageCircle size={28} />
          <span className="absolute right-full mr-3 bg-white text-dark text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
            Chat With Us
          </span>
        </button>
      )}

      {/* Floating 20% Offer Badge on Mobile (Right Side, above sticky bar, subtle and animated) */}
      {!isCampaignPage && active && (
        <aside aria-label="Special Offer" className="md:hidden fixed bottom-16 right-3.5 z-[95] pointer-events-auto">
          <Link
            to="/anniversary-offer"
            onClick={() => trackConversionEvent('floating_badge_click', { source: 'mobile_right_floating_offer' })}
            className="group relative flex items-center gap-1.5 bg-gradient-to-r from-[#1C1813] via-[#262017] to-[#14110E] text-white pl-2.5 pr-3 py-1.5 rounded-full border border-[#D4AF37]/50 shadow-[0_6px_20px_rgba(212,175,55,0.35)] active:scale-95 transition-all duration-300 animate-floatSlow overflow-hidden"
            aria-label="Claim 20% Anniversary Offer"
          >
            {/* Animated Golden Breathing Radar Ring */}
            <span className="absolute -inset-0.5 rounded-full bg-gradient-to-r from-[#D4AF37]/30 to-[#9A7B4F]/30 blur-xs opacity-75 animate-pulse pointer-events-none" />

            {/* Shimmer Light Sweep */}
            <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/25 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />

            {/* Glowing Percent Badge Pill */}
            <div className="relative w-6 h-6 rounded-full bg-gradient-to-br from-[#D4AF37] via-[#F3E5AB] to-[#C59B27] flex items-center justify-center text-[#1C1813] font-extrabold text-[10px] shadow-xs shrink-0">
              <span className="tracking-tighter">20%</span>
            </div>

            {/* Text Copy & Icon */}
            <div className="relative flex flex-col items-start leading-none pr-0.5">
              <div className="flex items-center gap-1">
                <span className="font-display font-extrabold text-[11px] bg-gradient-to-r from-[#F3E5AB] via-[#FFFFFF] to-[#D4AF37] bg-clip-text text-transparent">
                  OFFER
                </span>
                <Sparkles size={10} className="text-[#D4AF37] animate-spin" style={{ animationDuration: '6s' }} />
              </div>
              <span className="font-mono text-[7.5px] uppercase tracking-wider text-white/70 font-semibold mt-0.5">
                Claim Now &rarr;
              </span>
            </div>
          </Link>
        </aside>
      )}

      {/* Mobile Slim Sticky Bottom Conversion Bar with Google Maps, Call, WhatsApp, and Claim 20% */}
      {!isCampaignPage && (
        <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 w-full z-[90] bg-white/95 backdrop-blur-md border-t border-[#9A7B4F]/25 py-2 px-2.5 flex md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.12)] justify-between items-center gap-1.5">
          {/* Call */}
          <a 
            href={`tel:${CAMPAIGN_CONFIG.phone}`} 
            onClick={handlePhoneClick}
            className="flex-1 bg-gray-100 active:bg-gray-200 text-dark font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all border border-gray-200/80 active:scale-95"
            aria-label="Call Clinic"
          >
            <Phone size={13} className="text-[#9A7B4F]" />
            <span className="leading-tight font-semibold">Call</span>
          </a>

          {/* Google Maps Directions */}
          <a 
            href="https://www.google.com/maps/search/?api=1&query=Elite+Dental+Clinic+Sirsa"
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackConversionEvent('maps_click', { source: 'homepage_sticky_bar' })}
            className="flex-1 bg-[#EEF4FE] text-[#1A73E8] font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all border border-[#1A73E8]/25 active:scale-95"
            aria-label="Directions on Google Maps"
          >
            {/* Official Google Maps Multi-Color Pin Icon */}
            <svg className="w-3.5 h-3.5 shrink-0" viewBox="0 0 24 24" fill="none">
              <path d="M12 2C8.13 2 5 5.13 5 9c0 5.25 7 13 7 13s7-7.75 7-13c0-3.87-3.13-7-7-7z" fill="#4285F4"/>
              <path d="M12 2C8.13 2 5 5.13 5 9c0 1.74.5 3.37 1.41 4.84l5.59 7.16c.3.38.78.38 1.08 0l.92-1.18V6.15A4.47 4.47 0 0 0 12 2z" fill="#EA4335"/>
              <path d="M14 6.15v13.82c.3-.38.64-.84.97-1.32 1.34-1.95 4.03-6.23 4.03-9.65 0-1.74-.5-3.37-1.41-4.84A4.47 4.47 0 0 0 14 6.15z" fill="#FBBC04"/>
              <path d="M12 17.5c-2.48 0-4.5-2.02-4.5-4.5 0-1.17.45-2.24 1.19-3.04l5.31 6.8c-.62.46-1.37.74-2 .74z" fill="#34A853"/>
              <circle cx="12" cy="9" r="2.5" fill="#FFFFFF"/>
            </svg>
            <span className="leading-tight font-semibold text-[#1A73E8]">Maps</span>
          </a>

          {/* WhatsApp Direct */}
          <button 
            onClick={handleWhatsAppClick}
            className="flex-[1.1] bg-[#25D366] text-white font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all shadow-sm active:scale-95 cursor-pointer"
            aria-label="WhatsApp Us"
          >
            <MessageCircle size={13} />
            <span className="leading-tight font-semibold">WhatsApp</span>
          </button>

          {/* Claim 20% Offer with Liquid Shimmer */}
          {active ? (
            <Link 
              to="/anniversary-offer"
              onClick={() => trackConversionEvent('sticky_mobile_campaign_cta', { source: 'homepage_sticky_bottom' })}
              className="flex-[1.6] relative overflow-hidden bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] text-white font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-md active:scale-95"
            >
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />
              <Sparkles size={12} className="text-[#F3E5AB]" />
              <span className="font-bold tracking-tight">Claim 20%</span>
            </Link>
          ) : (
            <a 
              href="#book"
              className="flex-[1.6] bg-gradient-to-r from-[#9A7B4F] to-[#80633C] text-white font-bold py-2.5 px-2 rounded-xl flex items-center justify-center text-xs shadow-md"
            >
              Book Visit
            </a>
          )}
        </aside>
      )}

      {/* Global Modals */}
      <BookingModal />
      <CampaignLeadModal 
        isOpen={campaignModalOpen} 
        onClose={() => setCampaignModalOpen(false)} 
        source="exit_intent_or_delay_popup"
      />
    </>
  );
}
