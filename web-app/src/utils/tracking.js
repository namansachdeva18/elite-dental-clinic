/**
 * Centralized Conversion & Attribution Tracking Utility
 * Handles Google Ads Conversions, GA4 events, Meta Pixel, and UTM persistence
 */

import { CAMPAIGN_CONFIG } from '../config/campaignConfig';

const UTM_KEYS = ['utm_source', 'utm_medium', 'utm_campaign', 'utm_term', 'utm_content', 'gclid', 'fbclid'];
const STORAGE_KEY = 'elite_dental_attribution';

/**
 * Capture and persist UTM parameters from URL
 */
export function initAttributionTracking() {
  if (typeof window === 'undefined') return;

  try {
    const urlParams = new URLSearchParams(window.location.search);
    const existingAttribution = getStoredAttribution();
    const newAttribution = { ...existingAttribution };
    let hasNewData = false;

    UTM_KEYS.forEach(key => {
      const val = urlParams.get(key);
      if (val) {
        newAttribution[key] = val;
        hasNewData = true;
      }
    });

    if (hasNewData || !newAttribution.first_visited_at) {
      if (!newAttribution.first_visited_at) {
        newAttribution.first_visited_at = new Date().toISOString();
        newAttribution.landing_page = window.location.pathname + window.location.search;
        newAttribution.referrer = document.referrer || 'direct';
      }
      newAttribution.last_visited_at = new Date().toISOString();
      sessionStorage.setItem(STORAGE_KEY, JSON.stringify(newAttribution));
      localStorage.setItem(STORAGE_KEY, JSON.stringify(newAttribution));
    }
  } catch (e) {
    console.warn('Attribution tracking initialization warning:', e);
  }
}

/**
 * Get stored UTM and click ID attribution
 */
export function getStoredAttribution() {
  if (typeof window === 'undefined') return {};
  try {
    const sessionData = sessionStorage.getItem(STORAGE_KEY);
    if (sessionData) return JSON.parse(sessionData);

    const localData = localStorage.getItem(STORAGE_KEY);
    if (localData) return JSON.parse(localData);
  } catch (e) {
    console.warn('Error reading attribution data:', e);
  }
  return {};
}

/**
 * Universal Event Tracker for Google Ads, GA4 & Custom Analytics
 * 
 * Events:
 * 1. landing_page_view
 * 2. offer_cta_click
 * 3. form_started
 * 4. form_submitted
 * 5. offer_unlocked
 * 6. whatsapp_click
 * 7. phone_click
 * 8. appointment_cta_click
 * 9. treatment_selected
 */
export function trackConversionEvent(eventName, eventParams = {}) {
  const attribution = getStoredAttribution();
  const payload = {
    campaign_id: CAMPAIGN_CONFIG.campaignId,
    campaign_name: CAMPAIGN_CONFIG.campaignName,
    event_timestamp: new Date().toISOString(),
    ...attribution,
    ...eventParams
  };

  if (CAMPAIGN_CONFIG.tracking.debug) {
    console.log(`[Campaign Tracking] Event: "${eventName}"`, payload);
  }

  // 1. Google Analytics 4 (gtag.js)
  if (typeof window !== 'undefined' && typeof window.gtag === 'function') {
    window.gtag('event', eventName, payload);

    // Google Ads Conversion Specific Event
    if (eventName === 'offer_unlocked' || eventName === 'form_submitted') {
      if (CAMPAIGN_CONFIG.tracking.googleAdsSendTo) {
        window.gtag('event', 'conversion', {
          send_to: CAMPAIGN_CONFIG.tracking.googleAdsSendTo,
          value: eventParams.value || 1.0,
          currency: 'INR'
        });
      }
    }
  }

  // 2. Google Tag Manager (dataLayer)
  if (typeof window !== 'undefined' && Array.isArray(window.dataLayer)) {
    window.dataLayer.push({
      event: eventName,
      ...payload
    });
  }

  // 3. Meta Pixel (fbq) if present
  if (typeof window !== 'undefined' && typeof window.fbq === 'function') {
    if (eventName === 'offer_unlocked' || eventName === 'form_submitted') {
      window.fbq('track', 'Lead', payload);
    } else {
      window.fbq('trackCustom', eventName, payload);
    }
  }
}
