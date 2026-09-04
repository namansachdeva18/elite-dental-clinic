import React, { useEffect, useState } from 'react';
import { Sparkles, ArrowRight, X, Phone, MessageCircle } from 'lucide-react';
import { Link } from 'react-router-dom';
import { CAMPAIGN_CONFIG, isCampaignActive, getFormattedEndDate } from '../config/campaignConfig';
import { trackConversionEvent } from '../utils/tracking';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const active = isCampaignActive();
  const formattedEndDate = getFormattedEndDate();

  if (!isVisible) return null;

  // When campaign is enabled and active, show the rich anniversary campaign bar
  if (active) {
    return (
      <aside 
        aria-label="Anniversary Announcement" 
        className="bg-gradient-to-r from-[#2B2317] via-[#3D311F] to-[#2B2317] text-white w-full z-[100] relative border-b border-[#9A7B4F]/30 shadow-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 py-2 sm:py-2.5 flex items-center justify-between gap-3 text-xs sm:text-sm">
          
          {/* Campaign Message */}
          <div className="flex items-center gap-2 flex-1 overflow-hidden">
            <span className="inline-flex items-center justify-center bg-[#9A7B4F] text-white px-2 py-0.5 rounded text-[10px] font-bold uppercase tracking-wider flex-shrink-0 animate-pulse">
              🎉 20% OFF
            </span>
            <p className="truncate font-sans font-medium text-cream text-[11px] sm:text-xs md:text-sm">
              <strong className="text-[#EADBB6] font-semibold">Anniversary Special:</strong> 20% OFF Eligible Premium Dental Treatments • Wedding Season Smile Offer {formattedEndDate ? `• Valid Till ${formattedEndDate}` : ''}
            </p>
          </div>

          {/* CTA Link to Dedicated Campaign Landing Page */}
          <div className="flex items-center gap-2 sm:gap-4 flex-shrink-0">
            <Link 
              to="/anniversary-offer"
              onClick={() => trackConversionEvent('top_banner_cta_click', { source: 'top_banner' })}
              className="bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#9A7B4F] hover:brightness-110 text-[#1B140A] font-bold px-3 sm:px-4 py-1 sm:py-1.5 rounded-full text-[11px] sm:text-xs flex items-center gap-1 shadow-sm transition-all duration-200"
            >
              <span>Claim 20% Offer</span>
              <ArrowRight size={13} />
            </Link>

            <button 
              onClick={() => setIsVisible(false)}
              className="text-white/60 hover:text-white p-1 transition-colors"
              aria-label="Dismiss banner"
            >
              <X size={14} />
            </button>
          </div>

        </div>
      </aside>
    );
  }

  // Fallback to minimal branding bar if campaign is turned off
  return (
    <aside aria-label="Clinic Information" className="bg-[#A38A5F] text-white w-full z-[100] relative">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs sm:text-sm font-semibold">
        <div className="flex items-center gap-2">
          <span className="header-clinic-name">ELITE DENTAL CLINIC</span>
        </div>
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 opacity-90">Sirsa, Haryana</span>
        </div>
      </div>
    </aside>
  );
}
