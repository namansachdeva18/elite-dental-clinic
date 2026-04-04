import React, { useState } from 'react';
import { Clock, MapPin } from 'lucide-react';

export default function TopBanner() {
  const [isVisible, setIsVisible] = useState(true);

  if (!isVisible) return null;

  return (
    <div className="bg-[#A38A5F] text-white w-full z-[100] relative">
      <div className="max-w-7xl mx-auto px-6 py-2 flex items-center justify-between text-xs sm:text-sm font-semibold">

        {/* Urgent Offer */}
        <div className="flex items-center gap-2">
          {/* <Clock size={16} /> */}
          <span>ELITE DENTAL CLINIC</span>
        </div>

        {/* Action & Location */}
        <div className="flex items-center gap-4">
          <span className="flex items-center gap-1 opacity-90"><MapPin size={14} /> Sirsa, Haryana</span>
          {/* <a href="#book" className="bg-white text-[#A38A5F] px-4 py-1 rounded-md text-xs font-bold hover:bg-gray-100 transition-colors">
            Claim Offer
          </a> */}
        </div>

      </div>
    </div>
  );
}
