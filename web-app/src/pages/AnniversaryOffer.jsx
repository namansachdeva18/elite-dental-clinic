import React, { useState, useEffect, useRef } from 'react';
import { Helmet } from 'react-helmet-async';
import { Link } from 'react-router-dom';
import { 
  Sparkles, CheckCircle2, ShieldCheck, Star, Award, Phone, MessageCircle, 
  Clock, ArrowRight, ChevronDown, ChevronLeft, ChevronRight, Heart, 
  MapPin, AlertCircle, Quote, Shield, Lock, Layers, Zap, Crown, UserCheck,
  Calendar, Check, Gift, ArrowUpRight
} from 'lucide-react';
import { 
  CAMPAIGN_CONFIG, 
  isCampaignActive, 
  getFormattedEndDate, 
  getTimeRemaining, 
  getCampaignWhatsAppUrl 
} from '../config/campaignConfig';
import { trackConversionEvent, initAttributionTracking } from '../utils/tracking';
import CampaignLeadModal from '../components/CampaignLeadModal';
import { REVIEWS } from '../components/Testimonials';

// Authentic Transformations from clinic assets
const TRANSFORMATIONS = [
  {
    category: "Smile Makeover",
    title: "Chipped & Uneven Teeth Restoration",
    desc: "Restored symmetry and radiance using natural-looking cosmetic laminates designed for high-definition photography.",
    imgBefore: "/images/before-3.webp",
    imgAfter: "/images/after-3.webp",
    timeframe: "Cosmetic Dentistry"
  },
  {
    category: "Crowns & Bridges",
    title: "Zirconia Aesthetic Restoration",
    desc: "Replaced broken and compromised teeth with custom-shaded zirconia crowns for complete functional and smile restoration.",
    imgBefore: "/images/crowns-before.webp",
    imgAfter: "/images/crowns-after.webp",
    timeframe: "Fixed Prosthodontics"
  },
  {
    category: "Teeth Whitening",
    title: "6-Shade Laser Teeth Whitening",
    desc: "Achieved immediate noticeable brightening in a single 45-minute painless clinical session without post-procedure sensitivity.",
    imgBefore: "/images/before-1.webp",
    imgAfter: "/images/after-1.webp",
    timeframe: "Laser Whitening"
  },
  {
    category: "Orthodontic Transformation",
    title: "Precision Alignment Correction",
    desc: "Corrected crowding and bite misalignment with customized modern orthodontics for a lifetime confident smile.",
    imgBefore: "/images/before-2.webp",
    imgAfter: "/images/after-2.webp",
    timeframe: "Orthodontics"
  }
];

const CLINIC_GALLERY = [
  { title: "Advanced Treatment Operatory", desc: "Modern laser dentistry and digital scanning suites", src: "/images/gallery-1.webp", tag: "Treatment Suite" },
  { title: "Private Consultation Lounge", desc: "Comfortable, calm doctor-patient evaluation rooms", src: "/images/gallery-2.webp", tag: "Consultation" },
  { title: "Hygienic Sterilization Bay", desc: "Hospital-grade multi-tier autoclave sterilization", src: "/images/gallery-3.webp", tag: "Hygiene Protocol" },
  { title: "Patient Welcome Lounge", desc: "Relaxed, anxiety-free clinic reception", src: "/images/gallery-4.webp", tag: "Waiting Lounge" },
  { title: "Gentle Family Care Bay", desc: "Equipped for children, teenagers, and adult care", src: "/images/gallery-5.webp", tag: "Family Dentistry" },
  { title: "Modern Clinic Exterior", desc: "Conveniently located on Dabwali Road, Sirsa", src: "/images/gallery-6.webp", tag: "Sirsa Location" }
];

export default function AnniversaryOffer() {
  const active = isCampaignActive();
  const formattedEndDate = getFormattedEndDate();

  // State
  const [timeLeft, setTimeLeft] = useState(getTimeRemaining());
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedTreatment, setSelectedTreatment] = useState('');
  const [activeFaqIndex, setActiveFaqIndex] = useState(0);
  const [activeTransformation, setActiveTransformation] = useState(0);
  const [activeClinicPhoto, setActiveClinicPhoto] = useState(0);
  const [isGalleryPaused, setIsGalleryPaused] = useState(false);
  const [activeReview, setActiveReview] = useState(0);
  const [isReviewPaused, setIsReviewPaused] = useState(false);
  const [activeFilter, setActiveFilter] = useState('ALL');
  const formSectionRef = useRef(null);

  // Auto-scroll / rotate clinic gallery every 4 seconds
  useEffect(() => {
    if (isGalleryPaused) return;
    const galleryInterval = setInterval(() => {
      setActiveClinicPhoto(prev => (prev + 1) % CLINIC_GALLERY.length);
    }, 4000);
    return () => clearInterval(galleryInterval);
  }, [isGalleryPaused]);

  // Auto-scroll / rotate reviews every 3.8 seconds
  useEffect(() => {
    if (isReviewPaused) return;
    const interval = setInterval(() => {
      setActiveReview(prev => (prev + 1) % REVIEWS.length);
    }, 3800);
    return () => clearInterval(interval);
  }, [isReviewPaused]);

  // Initialize UTM Attribution and fire landing_page_view
  useEffect(() => {
    initAttributionTracking();
    trackConversionEvent('landing_page_view', {
      page: '/anniversary-offer',
      is_active: active
    });
  }, [active]);

  // Dynamic Countdown Timer (Real, accurate ticking without fake resets)
  useEffect(() => {
    if (!CAMPAIGN_CONFIG.endDate) return;

    const timer = setInterval(() => {
      const remaining = getTimeRemaining();
      setTimeLeft(remaining);
      if (remaining && remaining.isExpired) {
        clearInterval(timer);
      }
    }, 1000);

    return () => clearInterval(timer);
  }, []);

  const handleOpenLeadModal = (treatmentName = '', ctaSource = 'campaign_cta') => {
    setSelectedTreatment(treatmentName);
    setIsModalOpen(true);
    trackConversionEvent('offer_cta_click', {
      source: ctaSource,
      treatment: treatmentName
    });
  };

  const scrollToForm = (treatmentName = '') => {
    if (treatmentName) setSelectedTreatment(treatmentName);
    if (formSectionRef.current) {
      formSectionRef.current.scrollIntoView({ behavior: 'smooth', block: 'start' });
    } else {
      handleOpenLeadModal(treatmentName, 'hero_cta');
    }
  };

  const handleWhatsAppClick = (treatment = '', ctaLocation = 'campaign_page') => {
    trackConversionEvent('whatsapp_click', { source: ctaLocation, treatment });
    const url = getCampaignWhatsAppUrl(treatment, `[Anniversary Special ${CAMPAIGN_CONFIG.discountPercentage}% OFF]`);
    window.open(url, '_blank', 'noopener,noreferrer');
  };

  const handlePhoneClick = (ctaLocation = 'campaign_page') => {
    trackConversionEvent('phone_click', { source: ctaLocation });
  };

  const canonicalUrl = "https://www.elitedentalclinic.info/anniversary-offer";

  // Treatment list without consultation placeholder
  const treatmentList = CAMPAIGN_CONFIG.eligibleTreatments.filter(t => t.id !== 'general-consultation');

  return (
    <div className="w-full min-h-screen bg-[#FDFBF7] text-dark font-sans selection:bg-[#9A7B4F]/20 selection:text-[#9A7B4F] pb-16 md:pb-0">
      
      {/* Dynamic SEO Tags */}
      <Helmet>
        <title>20% Off Premium Dental Treatments in Sirsa | Elite Dental Clinic</title>
        <meta name="description" content="Celebrate Elite Dental Clinic's Anniversary Month with 20% off eligible premium dental treatments in Sirsa. Explore implants, smile makeovers, cosmetic dentistry and more." />
        <meta name="keywords" content="dental clinic in Sirsa, dental implants in Sirsa, smile makeover in Sirsa, cosmetic dentistry in Sirsa, smile designing in Sirsa, teeth whitening in Sirsa, braces in Sirsa, clear aligners in Sirsa, anniversary dental offer" />
        <link rel="canonical" href={canonicalUrl} />
        
        {/* Open Graph */}
        <meta property="og:title" content="20% Off Premium Dental Treatments | Elite Dental Clinic Anniversary" />
        <meta property="og:description" content="Your Wedding-Ready Smile Starts Here. Unlock 20% OFF eligible dental implants, smile designing, veneers, and teeth whitening in Sirsa." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content={canonicalUrl} />
        <meta property="og:image" content="https://www.elitedentalclinic.info/images/logo.webp" />
      </Helmet>

      {/* =========================================================================
          CAMPAIGN HEADER (Drastically simplified for Google Ads conversion focus)
          ========================================================================= */}
      <header className="sticky top-0 z-[80] bg-white/95 backdrop-blur-md border-b border-[#9A7B4F]/15 shadow-sm py-2.5 px-4 sm:px-8">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          
          {/* Logo */}
          <Link to="/" className="flex items-center gap-2.5 group">
            <img 
              src="/images/logo.webp" 
              alt="Elite Dental Clinic Logo" 
              className="h-8 sm:h-10 w-auto object-contain" 
            />
            <div className="flex flex-col">
              <span className="font-display font-bold text-base sm:text-lg text-[#A38A5F] tracking-tight navbar-brand-text leading-tight">
                Elite Dental Clinic
              </span>
              <span className="text-[9px] sm:text-[10px] font-mono tracking-widest text-muted uppercase">
                Sirsa, Haryana
              </span>
            </div>
          </Link>

          {/* Action CTAs */}
          <div className="flex items-center gap-2 sm:gap-3">
            <a 
              href={`tel:${CAMPAIGN_CONFIG.phone}`} 
              onClick={() => handlePhoneClick('header_call_button')}
              className="hidden sm:flex items-center gap-1.5 bg-gray-50 hover:bg-gray-100 text-dark px-3 py-1.5 rounded-full text-xs font-bold border border-gray-200 transition-colors"
              aria-label="Call Elite Dental Clinic"
            >
              <Phone size={13} className="text-[#9A7B4F]" />
              <span>{CAMPAIGN_CONFIG.phoneDisplay}</span>
            </a>

            <button 
              onClick={() => handleWhatsAppClick('', 'header_whatsapp_button')}
              className="hidden xs:flex items-center gap-1.5 bg-[#25D366] hover:bg-[#20bd5a] text-white px-3 sm:px-3.5 py-1.5 rounded-full text-xs font-bold transition-all shadow-sm cursor-pointer"
              aria-label="Chat on WhatsApp"
            >
              <MessageCircle size={14} />
              <span>WhatsApp</span>
            </button>

            <button 
              onClick={() => handleOpenLeadModal('', 'header_claim_offer')}
              className="bg-gradient-to-r from-[#9A7B4F] to-[#80633C] hover:from-[#8A6D43] hover:to-[#6E5431] text-white px-3.5 sm:px-4 py-1.5 rounded-full text-xs sm:text-sm font-bold shadow-md shadow-[#9A7B4F]/20 hover:scale-105 active:scale-95 transition-all cursor-pointer flex items-center gap-1"
            >
              <Gift size={13} />
              <span>Claim 20% Offer</span>
            </button>
          </div>

        </div>
      </header>

      {/* =========================================================================
          SECTION 1 — COMPACT & INNOVATIVE HERO
          ========================================================================= */}
      <section className="relative overflow-hidden pt-6 pb-12 sm:py-14 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white via-[#FAF7F2] to-[#FDFBF7]">
        
        {/* Soft champagne glow background motifs */}
        <div className="absolute top-0 right-0 w-96 h-96 bg-[#9A7B4F]/5 rounded-full blur-3xl pointer-events-none -mr-20 -mt-20" />
        <div className="absolute bottom-0 left-0 w-80 h-80 bg-[#D4AF37]/5 rounded-full blur-3xl pointer-events-none -ml-20 -mb-20" />

        <div className="max-w-7xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-8 items-center relative z-10">
          
          {/* Left Column Text & CTAs */}
          <div className="lg:col-span-7 flex flex-col items-start text-left">
            
            {/* Premium Badges */}
            <div className="flex flex-wrap items-center gap-2 mb-4">
              <span className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 border border-[#9A7B4F]/25 text-[#80633C] px-3 py-1 rounded-full text-xs font-bold tracking-wider uppercase shadow-sm">
                <Sparkles size={12} className="text-[#9A7B4F]" />
                <span>{CAMPAIGN_CONFIG.badgeText}</span>
              </span>

              <span className="inline-flex items-center gap-1.5 bg-[#2B2317] text-[#EADBB6] px-3 py-1 rounded-full text-xs font-bold tracking-wide">
                <span className="w-1.5 h-1.5 rounded-full bg-green-400 animate-ping" />
                <span>20% OFF BENEFIT</span>
              </span>
            </div>

            {/* Headline */}
            <h1 className="font-display text-3xl sm:text-5xl lg:text-6xl font-extrabold text-dark tracking-tight leading-[1.12] mb-3">
              Your Wedding-Ready <br className="hidden sm:block" />
              <span className="bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] bg-clip-text text-transparent">
                Smile Starts Here.
              </span>
            </h1>

            {/* Subheadline */}
            <p className="font-sans text-base sm:text-lg text-dark/90 font-medium leading-snug mb-3 max-w-2xl">
              Celebrate Elite Dental Clinic's Anniversary Month with <strong className="text-[#80633C] font-bold">20% OFF eligible premium dental treatments</strong> in Sirsa.
            </p>

            <blockquote className="font-sans italic text-muted text-xs sm:text-sm border-l-2 border-[#9A7B4F]/40 pl-3 py-0.5 mb-3 max-w-xl">
              “For the bride. For the groom. For the family photos. For the smile you'll remember forever.”
            </blockquote>

            {/* Inclusivity Pill - Not just for weddings */}
            <div className="inline-flex items-center gap-2 bg-[#F3ECE1] border border-[#9A7B4F]/30 text-[#6B502C] px-3.5 py-1.5 rounded-xl text-xs font-semibold mb-6 max-w-xl shadow-2xs">
              <Sparkles size={14} className="text-[#9A7B4F] flex-shrink-0" />
              <span><strong>Not just for weddings!</strong> Our 20% Anniversary Special is open to anyone looking to improve their smile or replace missing teeth.</span>
            </div>

            {/* Action CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 w-full sm:w-auto mb-6">
              <button 
                onClick={() => handleOpenLeadModal('', 'hero_primary_cta')}
                className="bg-gradient-to-r from-[#9A7B4F] to-[#80633C] hover:from-[#8A6D43] hover:to-[#6E5431] text-white font-bold text-sm sm:text-base px-7 py-3.5 rounded-xl shadow-lg shadow-[#9A7B4F]/25 hover:shadow-xl hover:scale-[1.02] active:scale-[0.99] transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>Claim My 20% Offer</span>
                <ArrowRight size={17} />
              </button>

              <button 
                onClick={() => handleWhatsAppClick('', 'hero_whatsapp_cta')}
                className="bg-[#25D366] hover:bg-[#20BE5C] text-white font-bold text-sm sm:text-base px-6 py-3.5 rounded-xl shadow-md hover:shadow-lg transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <MessageCircle size={18} />
                <span>WhatsApp Us</span>
              </button>
            </div>

            {/* Verified Trust Strip */}
            <div className="flex flex-wrap items-center gap-y-2 gap-x-5 text-xs font-semibold text-gray-700 pt-2 border-t border-gray-200/60 w-full">
              <div className="flex items-center gap-1.5">
                <Star size={15} className="fill-[#9A7B4F] text-[#9A7B4F]" />
                <span>5.0 Rated Google Clinic</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck size={15} className="text-green-600" />
                <span>Pain-Free Laser Tech</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 size={15} className="text-[#9A7B4F]" />
                <span>Thousands of Happy Customers</span>
              </div>
            </div>

          </div>

          {/* Right Column Hero Visual with Interactive Glow */}
          <div className="lg:col-span-5 relative flex justify-center">
            
            <div className="relative w-full max-w-sm rounded-[2rem] overflow-hidden shadow-2xl border-4 border-white bg-white group hover:shadow-3xl transition-all duration-500">
              
              <img 
                src="/images/before-3.webp" 
                alt="Radiant Smile Transformation at Elite Dental Clinic Sirsa" 
                className="w-full h-72 sm:h-80 object-cover object-center group-hover:scale-105 transition-transform duration-700"
                loading="eager"
              />

              {/* Bottom Doctor Overlay */}
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/25 to-transparent flex flex-col justify-end p-5 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-[10px] font-mono tracking-wider uppercase text-[#EADBB6]">Lead Cosmetic Dentist</div>
                    <div className="font-display text-lg font-bold">Dr. Nandini Bansal</div>
                    <div className="text-[11px] text-white/80">BDS, Root Canal & Aesthetic Specialist</div>
                  </div>
                  <div className="bg-white/15 backdrop-blur-md px-2.5 py-1 rounded-xl text-center border border-white/20">
                    <span className="block text-xs font-bold text-[#EADBB6]">Thousands</span>
                    <span className="text-[9px] text-white/90 uppercase tracking-tight">of Cases</span>
                  </div>
                </div>
              </div>

              {/* Luxury 20% OFF Floating Badge */}
              <div className="absolute top-3 right-3 bg-gradient-to-br from-[#2B2317] to-[#14100B] text-white px-3.5 py-2.5 rounded-xl border border-[#9A7B4F]/40 shadow-xl text-center backdrop-blur-sm">
                <span className="block text-[9px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
                  ANNIVERSARY
                </span>
                <span className="block font-display text-2xl font-extrabold text-white leading-none my-0.5">
                  20% OFF
                </span>
                <span className="block text-[9px] font-sans text-gray-300">
                  Premium Care
                </span>
              </div>

            </div>

            {/* Decorative Gold Ring Motif */}
            <div className="absolute -bottom-4 -left-4 w-20 h-20 rounded-full border-2 border-[#9A7B4F]/30 -z-10 hidden sm:block" />
            <div className="absolute -top-4 -right-4 w-24 h-24 rounded-full border border-[#D4AF37]/25 -z-10 hidden sm:block" />

          </div>

        </div>

      </section>

      {/* =========================================================================
          SECTION 2 — STREAMLINED URGENCY STRIP (Non-blocking, compact)
          ========================================================================= */}
      <section className="bg-gradient-to-r from-[#221B12] via-[#2B2317] to-[#221B12] text-white py-3 px-4 sm:px-6 border-y border-[#9A7B4F]/30 shadow-md">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-2.5 text-center md:text-left">
          
          {/* Urgency Copy */}
          <div className="flex items-center gap-2">
            <span className="w-2 h-2 rounded-full bg-green-400 animate-pulse flex-shrink-0" />
            <div className="text-xs sm:text-sm">
              <strong className="text-[#EADBB6]">Anniversary Offer:</strong> 20% OFF Eligible Premium Treatments 
              {formattedEndDate && <span className="text-white/90"> • Valid Until <span className="text-white font-semibold underline">{formattedEndDate}</span></span>}
              <span className="hidden lg:inline text-white/60 ml-2 font-light">• Form submission unlocks offer</span>
            </div>
          </div>

          {/* Compact Countdown Clock */}
          {active && timeLeft && !timeLeft.isExpired && (
            <div className="flex items-center gap-1.5 text-xs font-mono">
              <span className="text-[#EADBB6] uppercase tracking-wider text-[10px] font-bold mr-1 hidden sm:inline">Offer Ends:</span>
              <div className="flex items-center gap-1">
                <div className="bg-black/60 border border-[#9A7B4F]/40 px-1.5 py-0.5 rounded text-center min-w-[30px]">
                  <span className="font-bold text-xs text-white">{timeLeft.days}</span>
                  <span className="block text-[7px] text-[#EADBB6]">DAYS</span>
                </div>
                <span className="text-[#D4AF37] font-bold text-xs">:</span>
                <div className="bg-black/60 border border-[#9A7B4F]/40 px-1.5 py-0.5 rounded text-center min-w-[30px]">
                  <span className="font-bold text-xs text-white">{String(timeLeft.hours).padStart(2, '0')}</span>
                  <span className="block text-[7px] text-[#EADBB6]">HRS</span>
                </div>
                <span className="text-[#D4AF37] font-bold text-xs">:</span>
                <div className="bg-black/60 border border-[#9A7B4F]/40 px-1.5 py-0.5 rounded text-center min-w-[30px]">
                  <span className="font-bold text-xs text-white">{String(timeLeft.minutes).padStart(2, '0')}</span>
                  <span className="block text-[7px] text-[#EADBB6]">MIN</span>
                </div>
                <span className="text-[#D4AF37] font-bold text-xs">:</span>
                <div className="bg-black/60 border border-[#9A7B4F]/40 px-1.5 py-0.5 rounded text-center min-w-[30px]">
                  <span className="font-bold text-xs text-[#D4AF37]">{String(timeLeft.seconds).padStart(2, '0')}</span>
                  <span className="block text-[7px] text-[#EADBB6]">SEC</span>
                </div>
              </div>
            </div>
          )}

        </div>
      </section>

      {/* =========================================================================
          SECTION 3 — WEDDING SEASON HOOK (Subtle Luxury Dark-Espresso Cards)
          ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-3 py-0.5 rounded-full text-[11px] uppercase tracking-widest mb-2">
            <Heart size={11} className="text-[#9A7B4F]" />
            <span>The Wedding Season Angle</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-1.5">
            Wedding Season Is Coming. <span className="text-[#9A7B4F]">Your Smile Should Be Ready.</span>
          </h2>

          <p className="font-sans text-muted text-xs sm:text-sm max-w-xl mx-auto mb-3 leading-relaxed">
            Your wedding and family photos will last a lifetime. Whether you're the bride, groom, family member, or simply an individual who has been putting off their dental care, this anniversary month makes top-tier treatments 20% more accessible.
          </p>

          <p className="text-[11px] font-semibold text-[#80633C] mb-6">
            ✨ Open to all patients — wedding attendees, professionals, students, and families.
          </p>

          {/* 3 Audience Cards - Refined Subtle Dark/Espresso Theme */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4 items-stretch">
            
            {/* Card 1: Brides */}
            <div className="bg-gradient-to-b from-[#1F1912] to-[#14100C] text-white rounded-2xl p-5 border border-[#9A7B4F]/30 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(154,123,79,0.15)] hover:-translate-y-1 transition-all duration-300 text-left group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Sparkles size={16} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#EADBB6] uppercase font-bold bg-[#2B2317] px-2 py-0.5 rounded">For Brides</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">
                  Confident in Every Close-Up.
                </h3>
                <p className="font-sans text-gray-300 text-xs leading-relaxed mb-3">
                  Symmetrical radiance and sparkling camera confidence for high-definition photography.
                </p>
              </div>
              <div className="space-y-1 text-[11px] text-[#EADBB6] pt-2.5 border-t border-[#9A7B4F]/20 font-medium">
                <div className="flex items-center gap-1.5">✓ 45-Min Laser Whitening</div>
                <div className="flex items-center gap-1.5">✓ Aesthetic Veneers & Design</div>
              </div>
            </div>

            {/* Card 2: Grooms */}
            <div className="bg-gradient-to-b from-[#1F1912] to-[#14100C] text-white rounded-2xl p-5 border border-[#9A7B4F]/30 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(154,123,79,0.15)] hover:-translate-y-1 transition-all duration-300 text-left group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <Crown size={16} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#EADBB6] uppercase font-bold bg-[#2B2317] px-2 py-0.5 rounded">For Grooms</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">
                  Best From Every Angle.
                </h3>
                <p className="font-sans text-gray-300 text-xs leading-relaxed mb-3">
                  Fix stubborn stains, chipped corners, or visible gaps with swift cosmetic treatments.
                </p>
              </div>
              <div className="space-y-1 text-[11px] text-[#EADBB6] pt-2.5 border-t border-[#9A7B4F]/20 font-medium">
                <div className="flex items-center gap-1.5">✓ Quick Polish & Stain Removal</div>
                <div className="flex items-center gap-1.5">✓ Invisible Aligners Option</div>
              </div>
            </div>

            {/* Card 3: Family & Guests */}
            <div className="bg-gradient-to-b from-[#1F1912] to-[#14100C] text-white rounded-2xl p-5 border border-[#9A7B4F]/30 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_10px_30px_rgba(154,123,79,0.15)] hover:-translate-y-1 transition-all duration-300 text-left group relative overflow-hidden">
              <div className="absolute -top-10 -right-10 w-24 h-24 bg-[#D4AF37]/10 rounded-full blur-xl pointer-events-none group-hover:bg-[#D4AF37]/20 transition-colors" />
              <div>
                <div className="flex items-center justify-between mb-3">
                  <div className="w-8 h-8 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] group-hover:scale-110 transition-transform">
                    <UserCheck size={16} />
                  </div>
                  <span className="text-[10px] font-mono tracking-widest text-[#EADBB6] uppercase font-bold bg-[#2B2317] px-2 py-0.5 rounded">Family & Guests</span>
                </div>
                <h3 className="font-display text-lg font-bold text-white mb-1.5">
                  Celebrate With Ease.
                </h3>
                <p className="font-sans text-gray-300 text-xs leading-relaxed mb-3">
                  Parents & guests—enjoy banquets without missing teeth or chewing discomfort.
                </p>
              </div>
              <div className="space-y-1 text-[11px] text-[#EADBB6] pt-2.5 border-t border-[#9A7B4F]/20 font-medium">
                <div className="flex items-center gap-1.5">✓ Permanent Dental Implants</div>
                <div className="flex items-center gap-1.5">✓ Natural Ceramic Crowns</div>
              </div>
            </div>

          </div>

          <div className="mt-5">
            <button 
              onClick={() => handleOpenLeadModal('', 'wedding_hook_cta')}
              className="bg-dark hover:bg-black text-white font-bold px-5 py-2.5 rounded-full text-xs shadow-sm transition-all inline-flex items-center gap-1.5 cursor-pointer active:scale-95"
            >
              <span>Check Eligibility for Your Event Date</span>
              <ArrowRight size={13} className="text-[#D4AF37]" />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 4 — INTERACTIVE 20% OFFER SPOTLIGHT
          ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-[#FAF8F5] to-white border-y border-[#9A7B4F]/15">
        <div className="max-w-4xl mx-auto text-center">
          
          <div className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-3 py-0.5 rounded-full text-[11px] uppercase tracking-widest mb-2">
            <Gift size={12} className="text-[#9A7B4F]" />
            <span>Exclusive Anniversary Privilege</span>
          </div>

          <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-1">
            Your Smile. <span className="text-[#9A7B4F]">Our Anniversary Gift.</span>
          </h2>

          <p className="font-sans text-muted text-xs sm:text-sm max-w-lg mx-auto mb-6">
            Unlock your 20% Anniversary Benefit when you submit the campaign form.
          </p>

          {/* Interactive Card */}
          <div className="bg-gradient-to-br from-[#1C1712] via-[#241E17] to-[#18130E] text-white rounded-2xl p-5 sm:p-7 shadow-xl border border-[#9A7B4F]/40 relative overflow-hidden text-left max-w-3xl mx-auto">
            <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9A7B4F] via-[#F3E5AB] to-[#9A7B4F]" />

            <div className="grid grid-cols-1 sm:grid-cols-12 gap-5 items-center">
              
              {/* 20% Discount Stat */}
              <div className="sm:col-span-5 text-center sm:text-left border-b sm:border-b-0 sm:border-r border-[#9A7B4F]/30 pb-4 sm:pb-0 sm:pr-5">
                <span className="text-[10px] font-mono tracking-widest text-[#D4AF37] font-bold uppercase">
                  ANNIVERSARY SPECIAL
                </span>
                <div className="font-display text-4xl sm:text-5xl font-extrabold text-white tracking-tight my-0.5 leading-none">
                  20% <span className="text-xl sm:text-2xl text-[#D4AF37]">OFF</span>
                </div>
                <p className="text-[11px] font-semibold text-gray-300 uppercase tracking-wider mb-3">
                  Eligible Premium Care
                </p>

                <button 
                  onClick={() => handleOpenLeadModal('', 'offer_box_cta')}
                  className="w-full bg-gradient-to-r from-[#D4AF37] via-[#C59B27] to-[#9A7B4F] text-[#1B140A] font-bold py-2.5 px-4 rounded-xl shadow-md hover:brightness-110 transition-all flex items-center justify-center gap-1.5 text-xs cursor-pointer active:scale-95"
                >
                  <span>Unlock My 20% Offer</span>
                  <ArrowRight size={14} />
                </button>
              </div>

              {/* Eligible Services Dynamic List */}
              <div className="sm:col-span-7">
                <h4 className="font-display font-bold text-sm text-[#EADBB6] mb-2.5">
                  Eligible Premium Dental Services:
                </h4>

                <div className="grid grid-cols-2 gap-2">
                  {treatmentList.map((item) => (
                    <div 
                      key={item.id} 
                      onClick={() => handleOpenLeadModal(item.name, 'eligible_list_click')}
                      className="flex items-center gap-1.5 p-1.5 rounded-lg bg-white/5 hover:bg-white/10 border border-[#9A7B4F]/20 hover:border-[#D4AF37] transition-all cursor-pointer group"
                    >
                      <CheckCircle2 size={14} className="text-[#D4AF37] flex-shrink-0" />
                      <span className="text-[11px] sm:text-xs font-medium text-gray-200 group-hover:text-white transition-colors truncate">
                        {item.shortTitle}
                      </span>
                    </div>
                  ))}
                </div>

                <div className="mt-3.5 pt-2.5 border-t border-white/10 flex items-center justify-between text-[10px] text-gray-400">
                  <span className="flex items-center gap-1 text-[#EADBB6]">
                    <Lock size={11} className="text-[#D4AF37]" />
                    <span>Submission required to claim voucher</span>
                  </span>
                  <a href="#terms" className="text-[#D4AF37] hover:underline font-semibold">
                    Terms &rarr;
                  </a>
                </div>

              </div>

            </div>

          </div>

          <p className="text-[10px] text-muted max-w-md mx-auto mt-2 text-center">
            * Offer applies to eligible treatments and is subject to clinical evaluation by Dr. Nandini Bansal.
          </p>

        </div>
      </section>

      {/* =========================================================================
          SECTION 5 — COMPACT HIGH-VALUE TREATMENT CARDS (Subtle Dark Luxury Theme)
          ========================================================================= */}
      <section id="treatments" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-6xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-7">
            <span className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-3 py-0.5 rounded-full text-[11px] uppercase tracking-widest mb-1.5">
              <Sparkles size={11} className="text-[#9A7B4F]" />
              <span>Tailored Smile Solutions</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-1">
              Premium Treatments. <span className="text-[#9A7B4F]">Zero Discomfort.</span>
            </h2>
            <p className="font-sans text-muted text-xs">
              Click any treatment card below to check clinical eligibility.
            </p>
          </div>

          {/* Treatment Cards Grid - Compact Dark Luxury Aesthetic */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3.5 items-stretch">
            {treatmentList.map((treatment) => (
              <div 
                key={treatment.id} 
                className="bg-gradient-to-b from-[#1C1712] to-[#120E0A] text-white rounded-xl p-4 border border-[#9A7B4F]/25 flex flex-col justify-between hover:border-[#D4AF37] hover:shadow-[0_8px_25px_rgba(154,123,79,0.2)] transition-all duration-300 group relative overflow-hidden"
              >
                {/* Badge */}
                {treatment.badge && (
                  <div className="absolute top-3.5 right-3.5 bg-[#2B2317] border border-[#D4AF37]/30 text-[#D4AF37] text-[8px] font-mono tracking-wider font-bold px-2 py-0.5 rounded-full uppercase">
                    {treatment.badge}
                  </div>
                )}

                <div>
                  <span className="text-[9px] font-mono tracking-widest text-[#D4AF37] uppercase font-bold">
                    Anniversary 20% Eligible
                  </span>
                  
                  <h3 className="font-display text-base sm:text-lg font-bold text-white mt-0.5 mb-1 group-hover:text-[#EADBB6] transition-colors">
                    {treatment.name}
                  </h3>

                  <p className="font-sans text-gray-300 text-[11px] leading-relaxed mb-2.5">
                    {treatment.description}
                  </p>

                  {/* Wedding Callout */}
                  <div className="bg-white/5 border border-[#9A7B4F]/20 p-2 rounded-lg text-[10px] text-gray-200 mb-2.5 italic">
                    <span className="text-[#D4AF37] not-italic font-bold mr-1">Wedding Context:</span>
                    "{treatment.weddingAngle}"
                  </div>

                  {/* Benefits checkmarks */}
                  <div className="grid grid-cols-1 gap-1 mb-3">
                    {treatment.benefits.slice(0, 2).map((b, idx) => (
                      <div key={idx} className="flex items-center gap-1.5 text-[10px] text-gray-300">
                        <Check size={11} className="text-[#D4AF37] flex-shrink-0" />
                        <span className="truncate">{b}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Card CTA */}
                <div className="pt-2.5 border-t border-white/10">
                  <button 
                    onClick={() => handleOpenLeadModal(treatment.name, `treatment_card_${treatment.id}`)}
                    className="w-full bg-gradient-to-r from-[#9A7B4F] to-[#80633C] hover:from-[#B89355] hover:to-[#9A7B4F] text-white font-bold py-2 px-3 rounded-lg shadow-xs transition-all flex items-center justify-center gap-1 text-[11px] cursor-pointer active:scale-95"
                  >
                    <span>Check My Eligibility</span>
                    <ArrowRight size={12} />
                  </button>
                </div>

              </div>
            ))}
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 6 — TRUST PILLARS (Innovative Compact Badge Matrix)
          ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-y border-[#9A7B4F]/15">
        <div className="max-w-5xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
              The Highest Standard Of Care
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mt-1 mb-1">
              Why Patients Trust Elite Dental Clinic
            </h2>
            <p className="font-sans text-muted text-xs">
              Backed by verified clinic credentials and thousands of happy customers in Sirsa.
            </p>
          </div>

          {/* Compact 2x3 Interactive Trust Matrix */}
          <div className="grid grid-cols-2 md:grid-cols-3 gap-2.5 sm:gap-3">
            
            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Star size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">5.0-Star Google Clinic</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Consistent 5.0 rating from 80+ real patients for hygiene & gentle care.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Shield size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">Pain-Free Philosophy</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Laser protocols engineered specifically to eliminate dental chair anxiety.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Award size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">Thousands of Cases</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Led by Dr. Nandini Bansal (BDS, Root Canal & Laser Specialist).
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Zap size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">Digital Scanning Tech</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Precision scanners ensuring accurate fit for implants & aligners.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <ShieldCheck size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">100% Sterilization</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Multi-tier hospital grade autoclaving for complete patient safety.
              </p>
            </div>

            <div className="bg-gradient-to-b from-[#1E1913] to-[#130F0B] text-white p-3.5 sm:p-4 rounded-xl border border-[#9A7B4F]/30 hover:border-[#D4AF37] hover:shadow-md transition-all group">
              <div className="flex items-center gap-2 mb-1.5">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37] flex-shrink-0 group-hover:scale-110 transition-transform">
                  <Layers size={15} />
                </div>
                <h4 className="font-bold text-white text-xs sm:text-sm truncate">Zero-Interest EMI</h4>
              </div>
              <p className="text-gray-300 text-[10px] sm:text-[11px] leading-snug line-clamp-2">
                Flexible installment options for high-value treatments & makeovers.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 7 — REAL SMILE TRANSFORMATIONS (BEFORE / AFTER)
          ========================================================================= */}
      <section id="results" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto flex flex-col items-center">
          
          <div className="text-center max-w-xl mx-auto mb-8">
            <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
              Real Clinic Cases
            </span>
            <h2 className="font-display text-2xl sm:text-4xl font-bold text-dark tracking-tight mt-1 mb-2">
              Real Smile Transformations
            </h2>
            <p className="font-sans text-muted text-xs sm:text-sm">
              Actual before and after treatment outcomes achieved at Elite Dental Clinic Sirsa.
            </p>
          </div>

          {/* Interactive Slider */}
          <div className="bg-[#FAF8F5] rounded-2xl border border-gray-200/80 p-4 sm:p-6 w-full shadow-md">
            
            <div className="flex flex-col sm:flex-row gap-4 items-center">
              
              {/* Before Img */}
              <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden bg-gray-100 h-56 sm:h-64 shadow-inner">
                <img 
                  src={TRANSFORMATIONS[activeTransformation].imgBefore} 
                  alt={`Before ${TRANSFORMATIONS[activeTransformation].category} at Elite Dental Clinic`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2.5 left-2.5 bg-black/80 backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider z-10">
                  BEFORE
                </div>
              </div>

              {/* After Img */}
              <div className="w-full sm:w-1/2 relative rounded-xl overflow-hidden bg-gray-100 h-56 sm:h-64 shadow-inner">
                <img 
                  src={TRANSFORMATIONS[activeTransformation].imgAfter} 
                  alt={`After ${TRANSFORMATIONS[activeTransformation].category} at Elite Dental Clinic`}
                  className="w-full h-full object-cover"
                  loading="lazy"
                />
                <div className="absolute top-2.5 right-2.5 bg-[#9A7B4F] backdrop-blur-md text-white px-2.5 py-0.5 rounded-full text-[10px] font-bold tracking-wider z-10 shadow-xs">
                  AFTER (TRANSFORMED)
                </div>
              </div>

            </div>

            {/* Slider Controls */}
            <div className="mt-5 flex flex-col sm:flex-row justify-between items-center gap-3 pt-4 border-t border-gray-200">
              <div>
                <span className="text-[10px] font-mono font-bold uppercase text-[#9A7B4F]">
                  {TRANSFORMATIONS[activeTransformation].timeframe}
                </span>
                <h3 className="font-display font-bold text-lg text-dark">
                  {TRANSFORMATIONS[activeTransformation].title}
                </h3>
              </div>

              <div className="flex items-center gap-2">
                <button 
                  onClick={() => setActiveTransformation(prev => prev === 0 ? TRANSFORMATIONS.length - 1 : prev - 1)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-dark flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors shadow-xs"
                  aria-label="Previous transformation"
                >
                  <ChevronLeft size={16} />
                </button>
                <span className="font-mono text-xs font-bold text-dark px-1">
                  {activeTransformation + 1} / {TRANSFORMATIONS.length}
                </span>
                <button 
                  onClick={() => setActiveTransformation(prev => (prev + 1) % TRANSFORMATIONS.length)}
                  className="w-8 h-8 rounded-full bg-white border border-gray-200 text-dark flex items-center justify-center hover:bg-[#9A7B4F] hover:text-white transition-colors shadow-xs"
                  aria-label="Next transformation"
                >
                  <ChevronRight size={16} />
                </button>
              </div>

            </div>

          </div>

          {/* Under Results CTA */}
          <div className="mt-8 text-center">
            <button 
              onClick={() => handleOpenLeadModal('Smile Makeover / Smile Designing', 'results_section_cta')}
              className="bg-gradient-to-r from-[#9A7B4F] to-[#80633C] text-white font-bold px-6 py-3 rounded-full text-xs sm:text-sm shadow-md hover:scale-105 active:scale-95 transition-all inline-flex items-center gap-2 cursor-pointer"
            >
              <span>Book My Smile Consultation</span>
              <ArrowRight size={14} />
            </button>
          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 8 — INNOVATIVE & COMPACT REVIEWS SLIDER
          ========================================================================= */}
      <section id="reviews" className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-[#FAF8F5] border-y border-[#9A7B4F]/15">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
              Patient Satisfaction
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mt-1 mb-1.5">
              Why Patients Choose Elite Dental Clinic
            </h2>
            <div className="flex items-center justify-center gap-2">
              <div className="flex gap-0.5">
                {[...Array(5)].map((_, i) => (
                  <Star key={i} size={14} className="fill-[#9A7B4F] text-[#9A7B4F]" />
                ))}
              </div>
              <span className="font-bold text-dark text-xs sm:text-sm">5.0 / 5.0 Google Rating</span>
              <span className="text-[11px] text-muted font-medium">({CAMPAIGN_CONFIG.googleReviewCount} Reviews)</span>
            </div>
          </div>

          {/* Compact Interactive Review Slider Card */}
          <div 
            className="relative bg-gradient-to-b from-[#1E1812] to-[#120E0A] text-white rounded-2xl p-5 sm:p-7 shadow-xl border border-[#9A7B4F]/40 overflow-hidden"
            onMouseEnter={() => setIsReviewPaused(true)}
            onMouseLeave={() => setIsReviewPaused(false)}
            onTouchStart={() => setIsReviewPaused(true)}
            onTouchEnd={() => setIsReviewPaused(false)}
          >
            {/* Subtle Gold Ambient Glow */}
            <div className="absolute -top-12 -right-12 w-32 h-32 bg-[#D4AF37]/15 rounded-full blur-2xl pointer-events-none" />

            {/* Top Auto-Progress Live Bar */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-white/10 overflow-hidden">
              <div 
                key={activeReview}
                className={`h-full bg-gradient-to-r from-[#9A7B4F] via-[#D4AF37] to-[#F3E5AB] ${isReviewPaused ? 'w-full' : 'animate-progressLive'}`}
              />
            </div>

            <div className="flex justify-between items-center mb-3">
              <div className="flex items-center gap-2">
                <div className="w-7 h-7 rounded-lg bg-[#2B2317] border border-[#9A7B4F]/40 flex items-center justify-center text-[#D4AF37]">
                  <Quote size={15} />
                </div>
                <div className="flex gap-0.5">
                  {[...Array(5)].map((_, i) => (
                    <Star key={i} size={12} className="fill-[#D4AF37] text-[#D4AF37]" />
                  ))}
                </div>
                <span className="text-[10px] text-emerald-400 font-mono tracking-wider flex items-center gap-1 ml-1 bg-emerald-950/50 border border-emerald-500/25 px-1.5 py-0.5 rounded">
                  <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                  Auto-Advancing
                </span>
              </div>

              {/* Slider Controls */}
              <div className="flex items-center gap-1.5">
                <button 
                  onClick={() => setActiveReview(prev => prev === 0 ? REVIEWS.length - 1 : prev - 1)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#EADBB6] flex items-center justify-center transition-colors cursor-pointer border border-white/10 active:scale-90"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={15} />
                </button>
                <span className="font-mono text-[10px] text-[#D4AF37] font-bold px-1 min-w-[32px] text-center">
                  {activeReview + 1}/{REVIEWS.length}
                </span>
                <button 
                  onClick={() => setActiveReview(prev => (prev + 1) % REVIEWS.length)}
                  className="w-7 h-7 rounded-full bg-white/10 hover:bg-white/20 text-[#EADBB6] flex items-center justify-center transition-colors cursor-pointer border border-white/10 active:scale-90"
                  aria-label="Next review"
                >
                  <ChevronRight size={15} />
                </button>
              </div>
            </div>

            {/* Active Review Quote with fade-in key */}
            <div key={activeReview} className="animate-fadeInReview min-h-[72px] sm:min-h-[58px] flex items-center mb-4">
              <p className="font-sans text-gray-200 text-xs sm:text-sm leading-relaxed font-normal italic">
                "{REVIEWS[activeReview].text}"
              </p>
            </div>

            {/* Reviewer Details */}
            <div className="flex items-center justify-between pt-3 border-t border-white/10">
              <div className="flex items-center gap-2.5">
                <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-[#9A7B4F] to-[#D4AF37] text-dark font-bold text-xs flex items-center justify-center shadow-xs">
                  {REVIEWS[activeReview].name.charAt(0)}
                </div>
                <div>
                  <div className="font-bold text-white text-xs sm:text-sm">{REVIEWS[activeReview].name}</div>
                  <div className="flex items-center gap-1 text-[10px] text-[#D4AF37]">
                    <CheckCircle2 size={11} className="text-green-400" />
                    <span>Verified Google Patient</span>
                  </div>
                </div>
              </div>

              <span className="text-[10px] text-gray-400 hidden xs:inline">
                Pain-Free Care in Sirsa
              </span>
            </div>

            {/* Micro Progress Dots */}
            <div className="flex justify-center gap-1.5 mt-4">
              {REVIEWS.map((_, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveReview(idx)}
                  className={`h-1.5 rounded-full transition-all duration-300 cursor-pointer ${activeReview === idx ? 'w-6 bg-[#D4AF37] shadow-[0_0_8px_rgba(212,175,55,0.6)]' : 'w-1.5 bg-white/20 hover:bg-white/40'}`}
                  aria-label={`Go to slide ${idx + 1}`}
                />
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          INNOVATIVE CLINIC TOUR & FACILITY SHOWCASE (Compact Interactive Showcase)
          ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-white border-b border-[#9A7B4F]/15">
        <div className="max-w-4xl mx-auto">
          
          <div className="text-center max-w-xl mx-auto mb-6">
            <span className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-3 py-0.5 rounded-full text-[11px] uppercase tracking-widest mb-1.5">
              <Sparkles size={11} className="text-[#9A7B4F]" />
              <span>World-Class Infrastructure</span>
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mb-1">
              Inside Elite Dental Clinic
            </h2>
            <p className="font-sans text-muted text-xs sm:text-sm">
              Take a virtual tour of our modern, pain-free facility in Sirsa, Haryana.
            </p>
          </div>

          {/* Interactive Showcase Card */}
          <div 
            className="bg-[#FAF8F5] rounded-2xl p-4 sm:p-5 border border-gray-200/80 shadow-md relative overflow-hidden"
            onMouseEnter={() => setIsGalleryPaused(true)}
            onMouseLeave={() => setIsGalleryPaused(false)}
            onTouchStart={() => setIsGalleryPaused(true)}
            onTouchEnd={() => setIsGalleryPaused(false)}
          >
            {/* Live Progress Bar for Clinic Tour */}
            <div className="absolute top-0 left-0 right-0 h-[2.5px] bg-black/10 overflow-hidden">
              <div 
                key={activeClinicPhoto}
                className={`h-full bg-gradient-to-r from-[#9A7B4F] via-[#D4AF37] to-[#80633C] ${isGalleryPaused ? 'w-full' : 'animate-galleryProgress'}`}
              />
            </div>
            
            {/* Spotlight Image with Gradient Metadata Overlay */}
            <div className="relative rounded-xl overflow-hidden aspect-[16/9] sm:aspect-[21/9] bg-gray-900 shadow-inner group">
              <img 
                key={activeClinicPhoto}
                src={CLINIC_GALLERY[activeClinicPhoto].src} 
                alt={CLINIC_GALLERY[activeClinicPhoto].title}
                className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700 animate-fadeInReview"
                loading="lazy"
              />
              
              <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/20 to-transparent flex flex-col justify-end p-4 sm:p-6 text-white">
                <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-2">
                  <div key={`info-${activeClinicPhoto}`} className="animate-fadeInReview">
                    <div className="flex items-center gap-2 mb-1">
                      <span className="inline-block bg-[#D4AF37] text-[#1B140A] text-[9px] font-mono font-bold uppercase px-2 py-0.5 rounded">
                        {CLINIC_GALLERY[activeClinicPhoto].tag}
                      </span>
                      <span className="text-[9px] text-emerald-300 font-mono tracking-wider flex items-center gap-1 bg-black/40 px-1.5 py-0.5 rounded">
                        <span className="w-1.5 h-1.5 rounded-full bg-emerald-400 animate-pulse" />
                        Auto-Tour
                      </span>
                    </div>
                    <h3 className="font-display text-lg sm:text-xl font-bold text-white leading-tight">
                      {CLINIC_GALLERY[activeClinicPhoto].title}
                    </h3>
                    <p className="font-sans text-xs text-gray-300 max-w-md hidden xs:block">
                      {CLINIC_GALLERY[activeClinicPhoto].desc}
                    </p>
                  </div>

                  {/* Navigation Arrows */}
                  <div className="flex items-center gap-1.5 self-end sm:self-auto">
                    <button 
                      onClick={() => setActiveClinicPhoto(prev => prev === 0 ? CLINIC_GALLERY.length - 1 : prev - 1)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-dark flex items-center justify-center backdrop-blur-sm transition-all shadow-xs cursor-pointer active:scale-90"
                      aria-label="Previous clinic photo"
                    >
                      <ChevronLeft size={16} />
                    </button>
                    <span className="font-mono text-[10px] text-white/90 font-bold px-1 min-w-[30px] text-center">
                      {activeClinicPhoto + 1}/{CLINIC_GALLERY.length}
                    </span>
                    <button 
                      onClick={() => setActiveClinicPhoto(prev => (prev + 1) % CLINIC_GALLERY.length)}
                      className="w-8 h-8 rounded-full bg-white/20 hover:bg-white text-white hover:text-dark flex items-center justify-center backdrop-blur-sm transition-all shadow-xs cursor-pointer active:scale-90"
                      aria-label="Next clinic photo"
                    >
                      <ChevronRight size={16} />
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Thumbnail Strip for Instant Interactive Switching */}
            <div className="grid grid-cols-6 gap-2 mt-3">
              {CLINIC_GALLERY.map((item, idx) => (
                <button
                  key={idx}
                  onClick={() => setActiveClinicPhoto(idx)}
                  className={`relative rounded-lg overflow-hidden aspect-[4/3] border-2 transition-all duration-200 cursor-pointer ${
                    activeClinicPhoto === idx 
                      ? 'border-[#9A7B4F] shadow-sm scale-[1.03]' 
                      : 'border-transparent opacity-60 hover:opacity-100'
                  }`}
                  aria-label={`View ${item.title}`}
                >
                  <img src={item.src} alt={item.title} className="w-full h-full object-cover" />
                  {activeClinicPhoto === idx && (
                    <div className="absolute inset-0 bg-[#9A7B4F]/20 pointer-events-none" />
                  )}
                </button>
              ))}
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 9 — 3-STEP UNLOCK PROCESS
          ========================================================================= */}
      <section className="py-10 sm:py-12 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-4xl mx-auto text-center">
          
          <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
            How It Works
          </span>
          <h2 className="font-display text-2xl sm:text-4xl font-bold text-dark tracking-tight mt-1 mb-8">
            3 Simple Steps to Your New Smile
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5 text-left">
            
            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200/80">
              <span className="font-display text-3xl font-extrabold text-[#9A7B4F]/40 block mb-2">01</span>
              <h3 className="font-display text-base font-bold text-dark mb-1">Submit Your Details</h3>
              <p className="font-sans text-muted text-xs leading-relaxed">
                Tell us what you're looking to improve and choose your treatment of interest.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200/80">
              <span className="font-display text-3xl font-extrabold text-[#9A7B4F]/40 block mb-2">02</span>
              <h3 className="font-display text-base font-bold text-dark mb-1">Get Your Consultation</h3>
              <p className="font-sans text-muted text-xs leading-relaxed">
                Our clinic team will contact you to plan your consultation and assess suitability.
              </p>
            </div>

            <div className="bg-[#FAF8F5] p-5 rounded-2xl border border-gray-200/80">
              <span className="font-display text-3xl font-extrabold text-[#9A7B4F]/40 block mb-2">03</span>
              <h3 className="font-display text-base font-bold text-dark mb-1">Unlock 20% Benefit</h3>
              <p className="font-sans text-muted text-xs leading-relaxed">
                Eligible treatments receive the applicable 20% anniversary benefit according to campaign terms.
              </p>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 10 — COMPACT LEAD TRIGGER
          ========================================================================= */}
      <section ref={formSectionRef} id="claim-offer" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-gradient-to-b from-white to-[#FAF8F5] border-t border-[#9A7B4F]/15">
        <div className="max-w-2xl mx-auto">
          
          <div className="bg-white rounded-2xl p-6 sm:p-8 shadow-xl border-2 border-[#9A7B4F]/20 relative overflow-hidden text-center">
            
            <div className="absolute top-0 left-0 right-0 h-1.5 bg-gradient-to-r from-[#9A7B4F] via-[#D4AF37] to-[#9A7B4F]" />

            <div className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#80633C] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
              <Sparkles size={12} className="text-[#9A7B4F]" />
              <span>ANNIVERSARY 20% BENEFIT FORM</span>
            </div>
            
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-2 tracking-tight">
              Unlock Your 20% Anniversary Offer
            </h2>
            
            <p className="font-sans text-muted text-xs sm:text-sm max-w-md mx-auto mb-6">
              Tell us what you'd like to improve. Our team will contact you to help plan your visit.
            </p>

            <button 
              onClick={() => handleOpenLeadModal(selectedTreatment || '', 'embedded_form_trigger')}
              className="relative overflow-hidden w-full bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] hover:brightness-110 text-white font-bold text-base sm:text-lg py-4 rounded-xl shadow-[0_8px_25px_rgba(154,123,79,0.35)] hover:shadow-[0_12px_32px_rgba(154,123,79,0.5)] transition-all flex items-center justify-center gap-2 cursor-pointer active:scale-95 group"
            >
              {/* Dynamic Light Sweep Shimmer */}
              <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />

              <Sparkles size={18} className="text-[#F3E5AB] group-hover:rotate-45 transition-transform" />
              <span className="relative z-10 font-bold tracking-wide">Click to Open Official Offer Form</span>
              <ArrowRight size={18} className="relative z-10 group-hover:translate-x-1 transition-transform" />
            </button>

            <div className="mt-4 flex items-center justify-center gap-2 text-xs text-muted pt-3 border-t border-gray-100">
              <ShieldCheck size={14} className="text-green-600" />
              <span>100% Confidential • Doctor-Led Clinic in Sirsa</span>
            </div>

          </div>

        </div>
      </section>

      {/* =========================================================================
          SECTION 11 — FAQ & TERMS AND CONDITIONS
          ========================================================================= */}
      <section id="faq" className="py-14 sm:py-16 px-4 sm:px-6 lg:px-12 bg-white">
        <div className="max-w-3xl mx-auto">
          
          <div className="text-center mb-8">
            <span className="font-mono text-xs tracking-widest text-[#9A7B4F] uppercase font-bold">
              Common Queries
            </span>
            <h2 className="font-display text-2xl sm:text-3xl font-bold text-dark tracking-tight mt-1 mb-2">
              Campaign FAQs
            </h2>
          </div>

          <div className="space-y-3 mb-10">
            {[
              {
                q: "How do I claim the 20% Anniversary Offer?",
                a: "Submit your details on the campaign form. Our coordinator will contact you to schedule your consultation, where the 20% anniversary benefit will be applied to eligible treatment plans."
              },
              {
                q: "Which treatments are eligible for the 20% discount?",
                a: "The campaign applies to eligible high-value procedures, including Dental Implants, Smile Makeovers, Veneers, Teeth Whitening, Braces/Aligners, and Ceramic Crowns as specified under campaign terms."
              },
              {
                q: "Is there any pain involved in smile makeover or implant treatments?",
                a: "At Elite Dental Clinic, our core philosophy is zero discomfort. We use advanced laser-assisted technology and gentle anesthetics to ensure your procedures are completely comfortable."
              },
              {
                q: "Can I get my smile ready in time for my upcoming wedding date?",
                a: "Yes! Single-visit procedures like Teeth Whitening take just 45 minutes, while veneers and smile designing can be completed in tailored fast-track sessions. Mention your date in the form."
              },
              {
                q: "Do you offer zero-interest EMI for high-value treatments?",
                a: "Yes, flexible EMI options are available for major treatments like dental implants and clear aligners."
              }
            ].map((faq, i) => (
              <div 
                key={i} 
                className="border border-gray-200 rounded-xl overflow-hidden bg-[#FAF8F5]"
              >
                <button 
                  onClick={() => setActiveFaqIndex(activeFaqIndex === i ? -1 : i)}
                  className="w-full px-5 py-4 flex items-center justify-between text-left font-bold text-sm sm:text-base text-dark cursor-pointer"
                >
                  <span>{faq.q}</span>
                  <ChevronDown 
                    size={18} 
                    className={`text-[#9A7B4F] transition-transform duration-200 ${activeFaqIndex === i ? 'rotate-180' : ''}`} 
                  />
                </button>
                {activeFaqIndex === i && (
                  <div className="px-5 pb-4 text-xs sm:text-sm text-muted leading-relaxed">
                    {faq.a}
                  </div>
                )}
              </div>
            ))}
          </div>

          {/* Terms */}
          <div id="terms" className="bg-[#FAF8F5] rounded-2xl p-5 sm:p-6 border border-gray-200 text-left">
            <h3 className="font-display font-bold text-base text-dark mb-3 flex items-center gap-1.5">
              <ShieldCheck size={17} className="text-[#9A7B4F]" />
              <span>Anniversary Offer — Terms & Conditions</span>
            </h3>
            
            <ol className="space-y-1.5 text-[11px] text-muted leading-relaxed list-decimal pl-4">
              {CAMPAIGN_CONFIG.terms.map((term, idx) => (
                <li key={idx}>{term}</li>
              ))}
            </ol>
            
            <div className="mt-4 pt-3 border-t border-gray-200 text-[10px] text-gray-400">
              Elite Dental Clinic, Near Dr. Lal Path Lab, Opposite City Diagnostic Centre, Dabwali Road, Sirsa – 125055 (Haryana).
            </div>
          </div>

        </div>
      </section>

      {/* =========================================================================
          CAMPAIGN FOOTER
          ========================================================================= */}
      <footer className="bg-[#14100B] text-white py-10 px-4 sm:px-6 lg:px-12 border-t border-[#9A7B4F]/20">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row items-center justify-between gap-4 text-center md:text-left">
          
          <div className="flex items-center gap-2.5">
            <img src="/images/logo.webp" alt="Elite Dental Clinic Logo" className="h-9 w-auto" />
            <div>
              <span className="font-display font-bold text-base text-[#EADBB6] block">Elite Dental Clinic</span>
              <span className="text-[11px] text-gray-400">Premium Cosmetic & Family Dentistry • Sirsa</span>
            </div>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-xs text-gray-400">
            <Link to="/" className="hover:text-white transition-colors">Main Website</Link>
            <a href="#treatments" className="hover:text-white transition-colors">Eligible Treatments</a>
            <a href="#results" className="hover:text-white transition-colors">Before / After</a>
            <a href="#faq" className="hover:text-white transition-colors">FAQs</a>
            <a href="#terms" className="hover:text-white transition-colors">Terms</a>
          </div>

          <div className="text-[11px] text-gray-500">
            © {new Date().getFullYear()} Elite Dental Clinic. All Rights Reserved.
          </div>

        </div>
      </footer>

      {/* =========================================================================
          SLIM STICKY BOTTOM CONVERSION BAR (Mobile Only, completely non-blocking)
          ========================================================================= */}
      <aside aria-label="Campaign Mobile Actions" className="fixed bottom-0 left-0 w-full z-[90] bg-white/95 backdrop-blur-md border-t border-[#9A7B4F]/25 py-2 px-2.5 flex md:hidden shadow-[0_-8px_30px_rgba(0,0,0,0.12)] justify-between items-center gap-1.5">
        
        {/* 1. Direct Phone Call Button */}
        <a 
          href={`tel:${CAMPAIGN_CONFIG.phone}`} 
          onClick={() => handlePhoneClick('mobile_sticky_campaign_call')}
          className="flex-1 bg-gray-100 hover:bg-gray-200 active:bg-gray-300 text-dark font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all border border-gray-200/80 active:scale-95 group"
          aria-label="Call Clinic"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#9A7B4F] shadow-xs group-hover:rotate-12 transition-transform">
            <Phone size={12} />
          </div>
          <span className="leading-tight font-semibold">Call</span>
        </a>

        {/* 2. Google Maps Directions Button */}
        <a 
          href="https://www.google.com/maps/search/?api=1&query=Elite+Dental+Clinic+Sirsa" 
          target="_blank" 
          rel="noopener noreferrer"
          onClick={() => trackConversionEvent('maps_click', { source: 'mobile_sticky_bar' })}
          className="flex-1 bg-[#EEF4FE] hover:bg-[#DDEBFE] text-[#1A73E8] font-bold py-2 px-1 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all border border-[#1A73E8]/25 active:scale-95 group animate-mapGlow relative"
          aria-label="Directions on Google Maps"
        >
          <div className="w-6 h-6 rounded-full bg-white flex items-center justify-center text-[#EA4335] shadow-xs group-hover:scale-110 transition-transform">
            <MapPin size={13} className="text-[#EA4335] fill-[#EA4335]" />
          </div>
          <span className="leading-tight font-semibold text-[#1A73E8]">Maps</span>
        </a>

        {/* 3. WhatsApp Direct Chat Button */}
        <button 
          onClick={() => handleWhatsAppClick('', 'mobile_sticky_campaign_whatsapp')}
          className="flex-[1.1] bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-2 px-1.5 rounded-xl flex flex-col items-center justify-center gap-0.5 text-[10px] transition-all shadow-sm active:scale-95 cursor-pointer relative overflow-hidden group"
          aria-label="WhatsApp Us"
        >
          <div className="w-6 h-6 rounded-full bg-white/20 flex items-center justify-center text-white group-hover:scale-110 transition-transform">
            <MessageCircle size={13} />
          </div>
          <span className="leading-tight font-semibold">WhatsApp</span>
        </button>

        {/* 4. Tempting Golden "Claim 20%" Offer Unlock CTA */}
        <button 
          onClick={() => handleOpenLeadModal('', 'mobile_sticky_campaign_claim')}
          className="flex-[1.6] relative overflow-hidden bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] text-white font-bold py-2.5 px-2 rounded-xl flex items-center justify-center gap-1.5 text-xs shadow-[0_4px_15px_rgba(154,123,79,0.4)] active:scale-95 transition-all cursor-pointer group"
          aria-label="Claim 20% Offer"
        >
          {/* Animated Light Sweep Shimmer */}
          <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/35 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />
          
          <div className="w-5 h-5 rounded-full bg-white/20 flex items-center justify-center text-[#FDFBF7] flex-shrink-0 group-hover:rotate-45 transition-transform">
            <Sparkles size={11} className="text-[#F3E5AB]" />
          </div>
          <span className="tracking-tight font-bold">Claim 20%</span>
        </button>
      </aside>

      {/* Campaign Lead Modal */}
      <CampaignLeadModal 
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        initialTreatment={selectedTreatment}
        source="campaign_landing_page"
      />

    </div>
  );
}
