/**
 * Centralized Campaign Configuration
 * Elite Dental Clinic - "The Elite Smile Season" Anniversary Special
 * 
 * Modify settings here to control the campaign across the landing page, 
 * announcement bar, popups, and conversion tracking.
 */

export const CAMPAIGN_CONFIG = {
  // Master toggle: set to false to gracefully turn off all campaign elements
  enabled: true,

  // Campaign Identifiers
  campaignId: "anniversary_wedding_2026",
  campaignName: "The Elite Smile Season",
  badgeText: "ANNIVERSARY SPECIAL",
  subBadgeText: "WEDDING SEASON SPECIAL",
  
  // Discount details
  discountPercentage: 20,
  discountCode: "ANNIVERSARY20",
  
  // Dynamic Timeline (YYYY-MM-DD or ISO format)
  // If undefined or empty string, the countdown will automatically hide
  startDate: "2026-09-01",
  endDate: "2026-09-30", // Clear configuration variable for end date

  // Core Copywriting
  heroHeadline: "Your Wedding-Ready Smile Starts Here.",
  heroSubheadline: "Celebrate our anniversary with 20% OFF eligible premium dental treatments.",
  heroEmotionalCopy: "For the bride. For the groom. For the family photos. For the smile you'll remember forever.",
  
  // Offer Claim Copy
  offerUnlockHeadline: "Submit your details to unlock your Anniversary Offer.",
  offerUnlockedHeadline: "Your 20% Anniversary Offer is Unlocked 🎉",
  
  // Clinic Contact Info (preserves existing clinic numbers)
  phone: "+919306299901",
  phoneDisplay: "+91 93062 99901",
  whatsappNumber: "919306299901",
  clinicAddress: "Near Dr. Lal Path Lab, Opposite City Diagnostic Centre, Dabwali Road, Sirsa – 125055 (Haryana)",
  googleReviewRating: "5.0",
  googleReviewCount: "80+",
  happyPatientsCount: "Thousands of Happy Customers",

  // Web3Forms Integration Key (preserving verified active key from project)
  web3FormsKey: "981e01b6-99a1-4747-8bcf-ce1921d63780",

  // Analytics & Tracking IDs (Centrally configured)
  tracking: {
    googleAdsConversionId: "", // Replace with live Google Ads ID if provided
    googleAdsSendTo: "", 
    ga4MeasurementId: "",
    debug: false
  },

  // Eligible High-Value Treatments
  eligibleTreatments: [
    {
      id: "implants",
      name: "Dental Implants",
      shortTitle: "Dental Implants",
      tagline: "Permanent, Natural-Looking Tooth Replacement",
      description: "Restore your smile with a natural-looking, long-term tooth replacement solution backed by precision digital scanning.",
      intent: "HIGH",
      badge: "Most Popular",
      benefits: ["Permanent stability", "Natural tooth aesthetics", "Preserves jawbone structure", "Pain-free procedure"],
      weddingAngle: "Eat, laugh, and smile with absolute confidence at every banquet."
    },
    {
      id: "smile-makeover",
      name: "Smile Makeover / Smile Designing",
      shortTitle: "Smile Makeover",
      tagline: "Custom Aesthetic Smile Designing",
      description: "Create a more balanced, confident smile with a personalized cosmetic treatment plan tailored to your facial aesthetics.",
      intent: "HIGH",
      badge: "Signature Treatment",
      benefits: ["Digital smile preview", "Fixes gaps & alignment", "Personalized shade matching", "Minimal appointments"],
      weddingAngle: "Flawless symmetry engineered for high-definition close-up photography."
    },
    {
      id: "veneers",
      name: "Veneers / Cosmetic Dentistry",
      shortTitle: "Cosmetic Veneers",
      tagline: "Ultra-Thin Porcelain & Composite Laminates",
      description: "Refine the appearance of your smile with personalized cosmetic dentistry for chipped, discolored, or uneven teeth.",
      intent: "HIGH",
      badge: "Cosmetic Choice",
      benefits: ["Stain resistant", "Instant aesthetic transformation", "Natural translucency", "Long-lasting finish"],
      weddingAngle: "Radiant, red-carpet-worthy smiles ready in time for your ceremonies."
    },
    {
      id: "teeth-whitening",
      name: "Teeth Whitening",
      shortTitle: "Teeth Whitening",
      tagline: "Professional Laser Whitening",
      description: "Brighten your smile with professional teeth whitening for immediate, noticeable results in a comfortable session.",
      intent: "MEDIUM",
      badge: "Instant Glow",
      benefits: ["Up to 6 shades brighter", "Fast 45-min in-clinic procedure", "Enamel-safe formula", "Zero post-op sensitivity"],
      weddingAngle: "A quick, stunning glow-up for couples and wedding guests alike."
    },
    {
      id: "crowns-caps",
      name: "Crowns & Caps",
      shortTitle: "Dental Crowns & Caps",
      tagline: "Durable Ceramic & Zirconia Restorations",
      description: "Restore damaged or weakened teeth with strength, function, and aesthetic perfection using high-grade zirconia.",
      intent: "MEDIUM",
      badge: "Restoration",
      benefits: ["Metal-free aesthetics", "Exceptional bite strength", "Seamless natural match", "Precision CAD/CAM fit"],
      weddingAngle: "Full functional strength so you never hesitate before a camera."
    },
    {
      id: "braces-aligners",
      name: "Braces / Clear Aligners",
      shortTitle: "Braces & Clear Aligners",
      tagline: "Discreet Orthodontic Straightening",
      description: "Work toward a straighter, more confident smile with customized orthodontic care and invisible aligner options.",
      intent: "MEDIUM",
      badge: "Alignment",
      benefits: ["Virtually invisible options", "Gentle tooth movement", "Custom digital plan", "Flexible EMI available"],
      weddingAngle: "Start your alignment journey early for a transformed lifetime smile."
    },
    {
      id: "general-consultation",
      name: "Not Sure — Help Me Choose",
      shortTitle: "Doctor Consultation",
      tagline: "Comprehensive Smile & Oral Assessment",
      description: "Discuss your goals with Dr. Nandini Bansal and discover the best treatment tailored to your event timeline and budget.",
      intent: "GENERAL",
      badge: "Consultation",
      benefits: ["1-on-1 specialist evaluation", "Digital oral screening", "Customized quote with 20% benefit", "Transparent advice"],
      weddingAngle: "Let our expert team map out your personalized smile transformation timeline."
    }
  ],

  // Terms & Conditions (Strict Ethical & Legal Healthcare compliance)
  terms: [
    "The 20% Anniversary Offer is available only during the campaign period specified by Elite Dental Clinic.",
    "The offer is applicable only to treatments/services specifically marked as eligible under the campaign.",
    "The customer must submit the campaign enquiry form to claim/unlock the campaign offer.",
    "Submission of the form does not constitute confirmation of treatment or appointment.",
    "Treatment suitability, treatment planning and final treatment recommendations are determined by the treating dentist after consultation and clinical evaluation.",
    "The offer cannot be exchanged for cash.",
    "The offer cannot be transferred unless explicitly permitted by Elite Dental Clinic.",
    "The offer cannot be combined with another discount, promotional offer or special pricing unless explicitly stated by the clinic.",
    "Any applicable exclusions must be displayed clearly before the customer confirms treatment.",
    "The offer is subject to availability and the clinic's appointment schedule.",
    "The final payable amount will depend on the treatment plan and services recommended after clinical assessment.",
    "Elite Dental Clinic reserves the right to modify or withdraw the campaign according to applicable terms.",
    "The campaign is intended for genuine treatment enquiries and is not a substitute for professional dental diagnosis."
  ]
};

/**
 * Check if the campaign is currently active
 */
export function isCampaignActive() {
  if (!CAMPAIGN_CONFIG.enabled) return false;
  if (!CAMPAIGN_CONFIG.endDate) return true; // Active if no end date specified
  
  const end = new Date(CAMPAIGN_CONFIG.endDate + "T23:59:59+05:30");
  const now = new Date();
  return now <= end;
}

/**
 * Format end date for display (e.g. "31st May 2026")
 */
export function getFormattedEndDate() {
  if (!CAMPAIGN_CONFIG.endDate) return "";
  try {
    const date = new Date(CAMPAIGN_CONFIG.endDate + "T00:00:00");
    return date.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric"
    });
  } catch (e) {
    return CAMPAIGN_CONFIG.endDate;
  }
}

/**
 * Calculate remaining time until campaign end date
 */
export function getTimeRemaining() {
  if (!CAMPAIGN_CONFIG.endDate) return null;
  const total = Date.parse(CAMPAIGN_CONFIG.endDate + "T23:59:59+05:30") - Date.parse(new Date());
  if (total <= 0) return { total: 0, days: 0, hours: 0, minutes: 0, seconds: 0, isExpired: true };

  const seconds = Math.floor((total / 1000) % 60);
  const minutes = Math.floor((total / 1000 / 60) % 60);
  const hours = Math.floor((total / (1000 * 60 * 60)) % 24);
  const days = Math.floor(total / (1000 * 60 * 60 * 24));

  return { total, days, hours, minutes, seconds, isExpired: false };
}

/**
 * Generate contextual WhatsApp click link
 */
export function getCampaignWhatsAppUrl(treatment = "", messagePrefix = "") {
  let message = "";
  if (treatment && treatment !== "Not Sure — Help Me Choose") {
    message = `Hi Elite Dental Clinic, I’m interested in the Anniversary 20% Offer. I’d like to know more about ${treatment}.`;
  } else {
    message = "Hi Elite Dental Clinic, I’m interested in the Anniversary 20% Premium Dental Offer. I’d like to know more.";
  }
  
  if (messagePrefix) {
    message = `${messagePrefix} ${message}`;
  }

  return `https://wa.me/${CAMPAIGN_CONFIG.whatsappNumber}?text=${encodeURIComponent(message)}`;
}
