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

  // Smart Popup / Exit Intent trigger for organic visitors
  useEffect(() => {
    // Only fire popup if not already dismissed in this session
    const hasSeenPopup = sessionStorage.getItem('elite_popup_seen');
    if (hasSeenPopup) return;

    // 1. Desktop Exit Intent (cursor moving to top)
    const handleMouseLeave = (e) => {
      if (e.clientY <= 0 && !exitIntentDismissed && !sessionStorage.getItem('elite_popup_seen')) {
        setExitIntentDismissed(true);
        sessionStorage.setItem('elite_popup_seen', 'true');
        if (active) {
          setCampaignModalOpen(true);
        } else {
          window.dispatchEvent(new Event('open-booking-modal'));
        }
      }
    };

    // 2. Engagement Delay Trigger (after 35 seconds of meaningful browsing)
    const timer = setTimeout(() => {
      if (!sessionStorage.getItem('elite_popup_seen')) {
        sessionStorage.setItem('elite_popup_seen', 'true');
        if (active && !isCampaignPage) {
          setCampaignModalOpen(true);
        }
      }
    }, 35000);

    document.addEventListener('mouseleave', handleMouseLeave);
    return () => {
      document.removeEventListener('mouseleave', handleMouseLeave);
      clearTimeout(timer);
    };
  }, [exitIntentDismissed, active, isCampaignPage]);

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
            <span className="text-[#EA4335] text-[13px] leading-none">📍</span>
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
