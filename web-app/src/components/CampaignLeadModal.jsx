import React, { useState, useEffect } from 'react';
import { X, User, Phone, Stethoscope, Clock, CheckCircle2, MessageSquare, Loader2, Sparkles, ShieldCheck, Lock, ArrowRight } from 'lucide-react';
import { useNavigate } from 'react-router-dom';
import { CAMPAIGN_CONFIG, isCampaignActive, getCampaignWhatsAppUrl } from '../config/campaignConfig';
import { trackConversionEvent, getStoredAttribution } from '../utils/tracking';

export default function CampaignLeadModal({ 
  isOpen, 
  onClose, 
  initialTreatment = '',
  source = 'campaign_modal'
}) {
  const navigate = useNavigate();
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSuccess, setIsSuccess] = useState(false);
  const [errorMsg, setErrorMsg] = useState('');
  const active = isCampaignActive();

  // Spam protection: track modal open timestamp to block instant bot submissions
  const [openTime, setOpenTime] = useState(Date.now());
  // Honeypot field (hidden from humans, filled only by automated scrapers/bots)
  const [honeypot, setHoneypot] = useState('');

  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    treatment: initialTreatment || '',
    preferredTime: 'Anytime / First Available',
    requirement: ''
  });

  // Reset timestamp whenever modal opens
  useEffect(() => {
    if (isOpen) {
      setOpenTime(Date.now());
      setErrorMsg('');
      setHoneypot('');
    }
  }, [isOpen]);

  // Keep treatment in sync if changed by parent prop
  useEffect(() => {
    if (initialTreatment) {
      setFormData(prev => ({ ...prev, treatment: initialTreatment }));
    }
  }, [initialTreatment]);

  // Lock body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
      trackConversionEvent('modal_opened', { source });
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen, source]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    
    // Auto format / constrain phone to 10 digits maximum
    if (name === 'phone') {
      const numeric = value.replace(/\D/g, '').slice(0, 10);
      setFormData(prev => ({ ...prev, phone: numeric }));
      return;
    }

    setFormData(prev => ({ ...prev, [name]: value }));

    if (name === 'treatment') {
      trackConversionEvent('treatment_selected', { treatment: value, source });
    }
  };

  const handlePhoneFocus = () => {
    trackConversionEvent('form_started', { source });
  };

  // Anti-Spam Validation Engine
  const validateSubmission = (cleanPhone, name) => {
    // 1. Bot Honeypot Check
    if (honeypot.trim() !== '') {
      return { isValid: false, message: 'Invalid submission detected.' };
    }

    // 2. Minimum human interaction time (bots fill forms in < 1.5 seconds)
    const elapsedSeconds = (Date.now() - openTime) / 1000;
    if (elapsedSeconds < 1.5) {
      return { isValid: false, message: 'Please take a moment to review your details before submitting.' };
    }

    // 3. Name Validation (must contain at least 2 real alphabetic characters, no spam links/URLs)
    const trimmedName = name.trim();
    if (trimmedName.length < 2) {
      return { isValid: false, message: 'Please provide your genuine full name.' };
    }
    if (/https?:\/\/|www\.|\.com|\.net|\.org|<script/i.test(trimmedName)) {
      return { isValid: false, message: 'Links or website URLs are not allowed.' };
    }
    if (!/^[a-zA-Z\s.'-]+$/.test(trimmedName)) {
      return { isValid: false, message: 'Name should only contain letters and spaces.' };
    }

    // 4. Strict Indian Mobile Number Validation
    if (!/^[6-9]\d{9}$/.test(cleanPhone)) {
      return { isValid: false, message: 'Please enter a valid 10-digit mobile number starting with 6, 7, 8, or 9.' };
    }

    // 5. Block obvious dummy/spam test patterns
    const repeatedDigitPattern = /^(\d)\1{9}$/; // 9999999999, 8888888888, etc.
    const sequentialPattern = /^(?:0123456789|1234567890|9876543210)$/;
    const commonFakes = ['9876543210', '9123456780', '9000000000', '9999999999', '8888888888', '7777777777', '6666666666'];
    
    if (repeatedDigitPattern.test(cleanPhone) || sequentialPattern.test(cleanPhone) || commonFakes.includes(cleanPhone)) {
      return { isValid: false, message: 'Please enter a genuine, active mobile number to receive your offer voucher.' };
    }

    return { isValid: true };
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMsg('');

    const cleanPhone = formData.phone.replace(/\D/g, '');
    const validation = validateSubmission(cleanPhone, formData.name);

    if (!validation.isValid) {
      setErrorMsg(validation.message);
      setIsSubmitting(false);
      return;
    }

    const attribution = getStoredAttribution();

    try {
      // Submit lead to Web3Forms
      const submitData = new FormData();
      submitData.append('access_key', CAMPAIGN_CONFIG.web3FormsKey);
      submitData.append('subject', `🎉 20% Anniversary Offer Lead: ${formData.name.trim()} (${formData.treatment || 'General'})`);
      submitData.append('from_name', 'Elite Dental Anniversary Campaign');
      
      submitData.append('campaign_id', CAMPAIGN_CONFIG.campaignId);
      submitData.append('campaign_name', CAMPAIGN_CONFIG.campaignName);
      submitData.append('discount_code', CAMPAIGN_CONFIG.discountCode);
      submitData.append('discount_percentage', `${CAMPAIGN_CONFIG.discountPercentage}%`);
      submitData.append('name', formData.name.trim());
      submitData.append('phone', cleanPhone);
      submitData.append('treatment', formData.treatment || 'Not Specified / General');
      submitData.append('preferred_time', formData.preferredTime);
      if (formData.requirement) submitData.append('requirement', formData.requirement.trim());

      // Attribution metadata
      if (attribution.utm_source) submitData.append('utm_source', attribution.utm_source);
      if (attribution.utm_medium) submitData.append('utm_medium', attribution.utm_medium);
      if (attribution.utm_campaign) submitData.append('utm_campaign', attribution.utm_campaign);
      if (attribution.utm_term) submitData.append('utm_term', attribution.utm_term);
      if (attribution.utm_content) submitData.append('utm_content', attribution.utm_content);
      if (attribution.gclid) submitData.append('gclid', attribution.gclid);
      if (attribution.landing_page) submitData.append('landing_page', attribution.landing_page);

      const response = await fetch('https://api.web3forms.com/submit', {
        method: 'POST',
        body: submitData
      });

      if (!response.ok) {
        throw new Error('Form submission failed');
      }

      // Fire Conversion Tracking Events
      trackConversionEvent('form_submitted', {
        treatment: formData.treatment,
        lead_source: source,
        phone_masked: cleanPhone.substring(0, 3) + '****' + cleanPhone.substring(7)
      });
      trackConversionEvent('offer_unlocked', {
        discount: CAMPAIGN_CONFIG.discountPercentage,
        treatment: formData.treatment
      });

      // Save lead session so thank-you and success states render personalized data
      sessionStorage.setItem('elite_unlocked_lead', JSON.stringify({
        name: formData.name.trim(),
        phone: cleanPhone,
        treatment: formData.treatment,
        unlockedAt: new Date().toISOString()
      }));

      setIsSuccess(true);
      setIsSubmitting(false);

    } catch (err) {
      console.error('Lead form error:', err);
      setErrorMsg('We could not process your submission. Please call us or WhatsApp directly.');
      setIsSubmitting(false);
    }
  };

  const handleWhatsAppUnlockedClick = () => {
    trackConversionEvent('whatsapp_click', { source: 'modal_success_state', treatment: formData.treatment });
    const waUrl = getCampaignWhatsAppUrl(formData.treatment, `[VOUCHER: ${CAMPAIGN_CONFIG.discountCode}]`);
    window.open(waUrl, '_blank', 'noopener,noreferrer');
  };

  const handleCallClinic = () => {
    trackConversionEvent('phone_click', { source: 'modal_success_state' });
    window.location.href = `tel:${CAMPAIGN_CONFIG.phone}`;
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-[1000] flex items-center justify-center p-3 sm:p-4 bg-dark/85 backdrop-blur-md overflow-y-auto animate-in fade-in duration-200">
      
      {/* Outer ambient glow effect */}
      <div className="relative w-full max-w-md my-auto">
        <div className="absolute -inset-1 bg-gradient-to-r from-[#D4AF37] via-[#9A7B4F] to-[#EADBB6] rounded-[2.2rem] blur-lg opacity-40 animate-pulse pointer-events-none" />

        {/* Main Card Container with Luxury Glassmorphic & Cream Finish */}
        <div className="relative bg-[#FCFAF7] rounded-[2rem] w-full shadow-[0_25px_60px_-15px_rgba(0,0,0,0.5)] border border-[#D4AF37]/30 overflow-hidden">
          
          {/* Animated Gold Shimmer Top Bar */}
          <div className="h-2 w-full bg-gradient-to-r from-[#9A7B4F] via-[#F3E5AB] to-[#9A7B4F] bg-[length:200%_auto] animate-[gradient_3s_ease_infinite]" />

          {/* Close Button with gold hover ring */}
          <button 
            onClick={onClose}
            className="absolute top-4 right-4 z-20 text-gray-400 hover:text-dark hover:rotate-90 transition-all duration-300 bg-white/90 hover:bg-white rounded-full p-2 border border-gray-200/80 shadow-sm"
            aria-label="Close modal"
          >
            <X size={18} />
          </button>

          {!isSuccess ? (
            <div className="p-6 sm:p-8">
              
              {/* Modal Header with animated badge */}
              <div className="text-center mb-5 pt-1">
                <div className="inline-flex items-center gap-1.5 bg-gradient-to-r from-[#2B2317] to-[#1A140D] text-[#EADBB6] font-bold px-3.5 py-1 rounded-full text-xs uppercase tracking-wider mb-2.5 shadow-sm border border-[#9A7B4F]/40">
                  <Sparkles size={13} className="text-[#D4AF37] animate-spin" />
                  <span>{CAMPAIGN_CONFIG.badgeText} • 20% OFF</span>
                </div>
                
                <h3 className="font-display text-2xl sm:text-3xl font-extrabold text-dark tracking-tight leading-tight">
                  {active ? (
                    <>
                      Unlock Your <span className="bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] bg-clip-text text-transparent">20% Anniversary Offer</span>
                    </>
                  ) : "Book a Consultation"}
                </h3>
                
                <p className="font-sans text-muted text-xs sm:text-sm mt-1 max-w-xs mx-auto">
                  {active 
                    ? "Enter your details to claim your instant 20% Anniversary Benefit on eligible treatments."
                    : "Tell us about what you'd like to improve. Our team will contact you promptly."}
                </p>
              </div>

              {/* Error Message */}
              {errorMsg && (
                <div className="bg-red-50 text-red-700 border border-red-200 text-xs font-semibold p-2.5 rounded-xl mb-3.5 text-center animate-shake">
                  {errorMsg}
                </div>
              )}

              {/* Lead Form */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                
                {/* Anti-Bot Invisible Honeypot Field (Do NOT fill) */}
                <div className="opacity-0 absolute -left-[9999px] pointer-events-none h-0 w-0 overflow-hidden" aria-hidden="true" tabIndex={-1}>
                  <label htmlFor="website_hp">Leave empty</label>
                  <input 
                    id="website_hp"
                    type="text" 
                    name="website_hp" 
                    value={honeypot} 
                    onChange={(e) => setHoneypot(e.target.value)} 
                    autoComplete="off"
                    tabIndex={-1}
                  />
                </div>
                
                {/* Full Name */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9A7B4F] group-focus-within:text-[#D4AF37] group-focus-within:scale-110 transition-all duration-200">
                    <User size={17} />
                  </div>
                  <input 
                    type="text" 
                    name="name" 
                    value={formData.name} 
                    onChange={handleChange} 
                    required 
                    placeholder="Full Name *" 
                    className="w-full pl-10 pr-4 py-3 rounded-xl border border-gray-200/90 bg-white/95 focus:bg-white focus:border-[#9A7B4F] focus:ring-2 focus:ring-[#9A7B4F]/20 focus:shadow-[0_0_15px_rgba(154,123,79,0.15)] outline-none text-dark text-xs sm:text-sm transition-all shadow-xs"
                  />
                </div>

                {/* Mobile Number */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9A7B4F] group-focus-within:text-[#D4AF37] group-focus-within:scale-110 transition-all duration-200">
                    <Phone size={17} />
                  </div>
                  <input 
                    type="tel" 
                    name="phone" 
                    value={formData.phone} 
                    onChange={handleChange} 
                    onFocus={handlePhoneFocus}
                    required 
                    maxLength={10}
                    placeholder="10-Digit Mobile Number *" 
                    className="w-full pl-10 pr-16 py-3 rounded-xl border border-gray-200/90 bg-white/95 focus:bg-white focus:border-[#9A7B4F] focus:ring-2 focus:ring-[#9A7B4F]/20 focus:shadow-[0_0_15px_rgba(154,123,79,0.15)] outline-none text-dark text-xs sm:text-sm transition-all shadow-xs"
                  />
                  {formData.phone.length > 0 && (
                    <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-[10px] font-mono font-bold">
                      {formData.phone.length === 10 ? (
                        <span className="text-emerald-600 flex items-center gap-0.5">✓ 10/10</span>
                      ) : (
                        <span className="text-amber-600">{formData.phone.length}/10</span>
                      )}
                    </div>
                  )}
                </div>

                {/* Treatment Dropdown */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9A7B4F] group-focus-within:text-[#D4AF37] group-focus-within:scale-110 transition-all duration-200">
                    <Stethoscope size={17} />
                  </div>
                  <select 
                    name="treatment" 
                    value={formData.treatment} 
                    onChange={handleChange} 
                    required 
                    className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200/90 bg-white/95 focus:bg-white focus:border-[#9A7B4F] focus:ring-2 focus:ring-[#9A7B4F]/20 focus:shadow-[0_0_15px_rgba(154,123,79,0.15)] outline-none text-dark text-xs sm:text-sm transition-all shadow-xs appearance-none cursor-pointer"
                  >
                    <option value="" disabled>Select Treatment Interested In *</option>
                    {CAMPAIGN_CONFIG.eligibleTreatments.map((t) => (
                      <option key={t.id} value={t.name}>
                        {t.name}
                      </option>
                    ))}
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 group-hover:translate-y-0.5 transition-transform">
                    <ArrowRight size={13} className="rotate-90 text-[#9A7B4F]" />
                  </div>
                </div>

                {/* Preferred Appointment Time */}
                <div className="relative group">
                  <div className="absolute inset-y-0 left-0 pl-3.5 flex items-center pointer-events-none text-[#9A7B4F] group-focus-within:text-[#D4AF37] group-focus-within:scale-110 transition-all duration-200">
                    <Clock size={17} />
                  </div>
                  <select 
                    name="preferredTime" 
                    value={formData.preferredTime} 
                    onChange={handleChange} 
                    className="w-full pl-10 pr-8 py-3 rounded-xl border border-gray-200/90 bg-white/95 focus:bg-white focus:border-[#9A7B4F] focus:ring-2 focus:ring-[#9A7B4F]/20 focus:shadow-[0_0_15px_rgba(154,123,79,0.15)] outline-none text-dark text-xs sm:text-sm transition-all shadow-xs appearance-none cursor-pointer"
                  >
                    <option value="Anytime / First Available">Preferred Time: Anytime / First Available</option>
                    <option value="Morning (10:00 AM - 1:00 PM)">Morning (10:00 AM – 1:00 PM)</option>
                    <option value="Afternoon (1:00 PM - 4:00 PM)">Afternoon (1:00 PM – 4:00 PM)</option>
                    <option value="Evening (4:00 PM - 7:30 PM)">Evening (4:00 PM – 7:30 PM)</option>
                    <option value="Sunday Slot (10:00 AM - 2:30 PM)">Sunday (10:00 AM – 2:30 PM)</option>
                  </select>
                  <div className="absolute inset-y-0 right-0 pr-3.5 flex items-center pointer-events-none text-gray-400 group-hover:translate-y-0.5 transition-transform">
                    <ArrowRight size={13} className="rotate-90 text-[#9A7B4F]" />
                  </div>
                </div>

                {/* Requirement / Message (Optional) */}
                <div className="relative group">
                  <div className="absolute top-3 left-0 pl-3.5 pointer-events-none text-[#9A7B4F] group-focus-within:text-[#D4AF37] transition-colors">
                    <MessageSquare size={17} />
                  </div>
                  <textarea 
                    name="requirement" 
                    value={formData.requirement} 
                    onChange={handleChange} 
                    placeholder="Optional: Tell us about your goal or wedding/event date" 
                    rows={2} 
                    maxLength={300}
                    className="w-full pl-10 pr-4 py-2.5 rounded-xl border border-gray-200/90 bg-white/95 focus:bg-white focus:border-[#9A7B4F] focus:ring-2 focus:ring-[#9A7B4F]/20 focus:shadow-[0_0_15px_rgba(154,123,79,0.15)] outline-none text-dark text-xs sm:text-sm transition-all shadow-xs resize-none"
                  />
                </div>

                {/* Submit CTA with Luxury Gold Sweep Shimmer & Micro-Hover */}
                <button 
                  type="submit" 
                  disabled={isSubmitting} 
                  className="relative overflow-hidden w-full bg-gradient-to-r from-[#9A7B4F] via-[#B89355] to-[#80633C] hover:brightness-110 text-white font-bold text-sm sm:text-base py-3.5 rounded-xl shadow-[0_8px_25px_rgba(154,123,79,0.35)] hover:shadow-[0_12px_30px_rgba(154,123,79,0.45)] hover:scale-[1.01] active:scale-[0.98] transition-all duration-300 disabled:opacity-70 flex justify-center items-center gap-2 mt-1 cursor-pointer group"
                >
                  {/* Fluid Shimmer Wave Sweep */}
                  <div className="absolute inset-0 w-1/2 h-full bg-gradient-to-r from-transparent via-white/30 to-transparent skew-x-[-20deg] animate-shimmerSweep pointer-events-none" />

                  {isSubmitting ? (
                    <>
                      <Loader2 className="animate-spin" size={18} />
                      <span className="relative z-10">Securing Your Voucher...</span>
                    </>
                  ) : (
                    <>
                      <Sparkles size={16} className="text-[#F3E5AB] group-hover:rotate-45 transition-transform" />
                      <span className="relative z-10 font-bold tracking-wide">Unlock My 20% Offer</span>
                      <ArrowRight size={17} className="relative z-10 group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
              </form>

              {/* Micro Trust & Disclaimer */}
              <div className="mt-4 pt-3 border-t border-gray-200/70 flex flex-col items-center gap-1 text-center">
                <div className="flex items-center gap-1.5 text-[11px] text-muted font-medium">
                  <ShieldCheck size={13} className="text-green-600 flex-shrink-0" />
                  <span>100% Confidential • Doctor-Led Consultation in Sirsa</span>
                </div>
                <p className="text-[10px] text-gray-400 leading-tight">
                  By submitting, you agree to be contacted by Elite Dental Clinic regarding your enquiry.
                </p>
              </div>

            </div>
          ) : (
          /* Form Success State */
          <div className="p-6 sm:p-8 text-center flex flex-col items-center animate-in zoom-in-95 duration-300">
            
            <div className="w-16 h-16 rounded-full bg-green-50 border-2 border-green-200 flex items-center justify-center text-green-600 mb-4 shadow-inner">
              <CheckCircle2 size={36} />
            </div>

            <div className="inline-flex items-center gap-1.5 bg-[#9A7B4F]/10 text-[#9A7B4F] font-bold px-3 py-1 rounded-full text-xs uppercase tracking-wider mb-2">
              <Sparkles size={13} />
              <span>Voucher Code: {CAMPAIGN_CONFIG.discountCode}</span>
            </div>

            <h3 className="font-display text-2xl sm:text-3xl font-bold text-dark mb-1">
              Your Anniversary Offer Is Unlocked 🎉
            </h3>
            
            <p className="font-sans text-sm text-gray-600 mb-6 max-w-sm">
              Thank you, <strong className="text-dark">{formData.name || 'valued patient'}</strong>. Your request has been recorded. You can now discuss your eligibility for the 20% Anniversary Benefit with our clinical team.
            </p>

            {/* Voucher Card */}
            <div className="w-full bg-white rounded-2xl p-5 border border-[#9A7B4F]/30 shadow-md mb-6 relative overflow-hidden">
              <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-[#9A7B4F] to-[#D4AF37]" />
              <div className="text-[11px] font-mono tracking-widest text-[#9A7B4F] uppercase font-bold mb-1">
                Elite Dental Clinic Anniversary Special
              </div>
              <div className="text-3xl sm:text-4xl font-display font-extrabold text-dark tracking-tight my-1">
                20% OFF
              </div>
              <div className="text-xs font-semibold text-gray-700">
                Eligible Treatment: <span className="text-[#9A7B4F] font-bold">{formData.treatment || 'Premium Dental Services'}</span>
              </div>
              <div className="mt-3 pt-3 border-t border-dashed border-gray-200 text-[11px] text-muted">
                Please mention <strong>“ANNIVERSARY OFFER”</strong> when contacting or visiting us.
              </div>
            </div>

            {/* Quick Action CTAs */}
            <div className="flex flex-col sm:flex-row gap-3 w-full mb-3">
              <button 
                onClick={handleWhatsAppUnlockedClick}
                className="flex-1 bg-[#25D366] hover:bg-[#20bd5a] text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
              >
                <span>Chat on WhatsApp</span>
              </button>

              <button 
                onClick={handleCallClinic}
                className="flex-1 bg-dark hover:bg-black text-white font-bold py-3.5 rounded-xl flex items-center justify-center gap-2 shadow-md transition-all text-sm cursor-pointer"
              >
                <Phone size={16} />
                <span>Call Clinic</span>
              </button>
            </div>

            <button 
              onClick={() => {
                onClose();
                navigate('/anniversary-offer/thank-you');
              }}
              className="text-xs font-bold text-[#9A7B4F] hover:underline mt-2 inline-flex items-center gap-1"
            >
              <span>View Full Confirmation Summary &rarr;</span>
            </button>

          </div>
        )}

        </div>
      </div>
    </div>
  );
}
