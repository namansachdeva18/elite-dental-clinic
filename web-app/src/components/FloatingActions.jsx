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
      {/* Sticky WhatsApp Floating Action (Desktop & Mobile, only on main site to avoid collision with campaign sticky bar) */}
      {!isCampaignPage && (
        <button 
          onClick={handleWhatsAppClick}
          className="fixed bottom-20 md:bottom-6 right-5 sm:right-6 z-[100] bg-[#25D366] text-white p-3.5 sm:p-4 rounded-full shadow-[0_8px_30px_rgb(37,211,102,0.4)] hover:bg-[#20BE5C] hover:scale-110 active:scale-95 transition-all duration-300 flex items-center justify-center group cursor-pointer"
          aria-label="Chat on WhatsApp with Elite Dental Clinic"
        >
          <MessageCircle size={28} className="sm:w-8 sm:h-8" />
          <span className="absolute right-full mr-3 bg-white text-dark text-xs sm:text-sm font-bold px-3 py-1.5 rounded-lg shadow-md whitespace-nowrap opacity-0 group-hover:opacity-100 transition-opacity pointer-events-none border border-gray-100">
            Chat With Us
          </span>
        </button>
      )}

      {/* Mobile Sticky Bottom Conversion Bar (Hidden on Campaign page since campaign page has its own dedicated sticky bar) */}
      {!isCampaignPage && (
        <aside aria-label="Quick Actions" className="fixed bottom-0 left-0 w-full z-[90] bg-white/95 backdrop-blur-md border-t border-gray-200 p-2.5 sm:p-3 flex md:hidden shadow-[0_-4px_20px_rgba(0,0,0,0.08)] justify-between items-center gap-2.5">
          <a 
            href={`tel:${CAMPAIGN_CONFIG.phone}`} 
            onClick={handlePhoneClick}
            className="flex-1 bg-gray-100 active:bg-gray-200 text-dark font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm transition-colors"
          >
            <Phone size={16} /> Call
          </a>

          {active ? (
            <Link 
              to="/anniversary-offer"
              onClick={() => trackConversionEvent('sticky_mobile_campaign_cta', { source: 'homepage_sticky_bottom' })}
              className="flex-[2] bg-gradient-to-r from-[#9A7B4F] to-[#80633C] text-white font-bold py-3 rounded-xl flex items-center justify-center gap-1.5 text-xs sm:text-sm shadow-md"
            >
              <Sparkles size={15} />
              <span>Claim 20% Offer</span>
            </Link>
          ) : (
            <a 
              href="#book"
              className="flex-[2] bg-[#9A7B4F] text-white font-bold py-3 rounded-xl flex items-center justify-center text-xs sm:text-sm shadow-md"
            >
              Book Appointment
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
