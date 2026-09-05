import React, { useEffect } from 'react';
import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';
import { Helmet } from 'react-helmet-async';
import gsap from 'gsap';
import Lenis from 'lenis';

import CustomCursor from './components/CustomCursor';
import TopBanner from './components/TopBanner';
import Navbar from './components/Navbar';
import FloatingActions from './components/FloatingActions';
import Home from './components/Home';
import Footer from './components/Footer';
import VideoPage from './components/VideoPage';
import AnniversaryOffer from './pages/AnniversaryOffer';
import AnniversaryThankYou from './pages/AnniversaryThankYou';
import RootCanalPage from './pages/RootCanalPage';
import DentalImplantsPage from './pages/DentalImplantsPage';
import BracesAlignersPage from './pages/BracesAlignersPage';
import TeethWhiteningPage from './pages/TeethWhiteningPage';
import CrownsBridgesPage from './pages/CrownsBridgesPage';
import WisdomToothPage from './pages/WisdomToothPage';
import VeneersPage from './pages/VeneersPage';
import SmileMakeoverPage from './pages/SmileMakeoverPage';
import ContactPage from './pages/ContactPage';
import { REVIEWS } from './components/Testimonials';
import { initAttributionTracking } from './utils/tracking';

// Scroll restoration component and UTM attribution initializer
function ScrollToTop() {
  const { pathname, search } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
    initAttributionTracking();
  }, [pathname, search]);
  return null;
}

// Layout Wrapper to conditionally show standard Navbar & Footer only on non-campaign routes
function AppLayout() {
  const { pathname } = useLocation();
  const isDedicatedCampaign = pathname.startsWith('/anniversary-offer') || pathname.startsWith('/wedding-smile-offer');

  return (
    <>
      <CustomCursor />
      
      {/* Global Top Banner */}
      <TopBanner />

      {/* Main website navigation (kept on organic routes, simplified on dedicated landing pages) */}
      {!isDedicatedCampaign && <Navbar />}

      {/* Floating Action Buttons */}
      <FloatingActions />
      
      <main className="w-full min-h-screen bg-[#FDFBF7] selection:bg-[#9A7B4F]/20 selection:text-[#9A7B4F]">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* Dedicated Google Ads Campaign Routes */}
          <Route path="/anniversary-offer" element={<AnniversaryOffer />} />
          <Route path="/wedding-smile-offer" element={<AnniversaryOffer />} />
          <Route path="/anniversary-offer/thank-you" element={<AnniversaryThankYou />} />
          <Route path="/wedding-smile-offer/thank-you" element={<AnniversaryThankYou />} />

          {/* High-Intent Service Landing Pages (Google Ads & Local SEO) */}
          <Route path="/services/root-canal-treatment" element={<RootCanalPage />} />
          <Route path="/services/dental-implants" element={<DentalImplantsPage />} />
          <Route path="/services/braces-and-aligners" element={<BracesAlignersPage />} />
          <Route path="/services/teeth-whitening" element={<TeethWhiteningPage />} />
          <Route path="/services/dental-crowns-and-bridges" element={<CrownsBridgesPage />} />
          <Route path="/services/wisdom-tooth-extraction" element={<WisdomToothPage />} />
          <Route path="/services/porcelain-veneers" element={<VeneersPage />} />
          <Route path="/services/smile-makeover" element={<SmileMakeoverPage />} />
          
          {/* Dedicated Location & Contact Page */}
          <Route path="/contact" element={<ContactPage />} />

          {/* Legacy / Alias URL Redirects */}
          <Route path="/rct-treatment-sirsa" element={<RootCanalPage />} />
          <Route path="/teeth-whitening-sirsa" element={<TeethWhiteningPage />} />
          <Route path="/dental-implants-sirsa" element={<DentalImplantsPage />} />
          <Route path="/videos/prabhnoor-testimonial" element={<VideoPage />} />
        </Routes>
        
        {/* Main Website Footer */}
        {!isDedicatedCampaign && <Footer />}
      </main>
    </>
  );
}

function App() {
  useEffect(() => {
    // 1. Lenis Smooth Scroll Setup
    const lenis = new Lenis({ 
      duration: 1.2, 
      easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)) 
    });

    // 2. Sync Lenis to GSAP
    gsap.ticker.add((time) => {
      lenis.raf(time * 1000);
    });
    gsap.ticker.lagSmoothing(0);

    return () => {
      lenis.destroy();
      gsap.ticker.remove((time) => lenis.raf(time * 1000));
    };
  }, []);

  const schemaData = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        "@id": "https://www.elitedentalclinic.info/#dentist",
        "name": "Elite Dental Clinic",
        "legalName": "Elite Dental Clinic Sirsa",
        "image": "https://www.elitedentalclinic.info/images/hero-doctor.webp",
        "logo": "https://www.elitedentalclinic.info/images/logo.webp",
        "url": "https://www.elitedentalclinic.info",
        "telephone": "+919467624898",
        "priceRange": "₹₹",
        "address": {
          "@type": "PostalAddress",
          "streetAddress": "Opp. City Diagnostic Centre, Near Dr. Lal Path Lab, Dabwali Road",
          "addressLocality": "Sirsa",
          "addressRegion": "Haryana",
          "postalCode": "125055",
          "addressCountry": "IN"
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": 29.5350,
          "longitude": 75.0290
        },
        "openingHoursSpecification": [
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
            "opens": "10:00",
            "closes": "19:30"
          },
          {
            "@type": "OpeningHoursSpecification",
            "dayOfWeek": "Sunday",
            "opens": "10:00",
            "closes": "14:30"
          }
        ],
        "sameAs": [
          "https://www.instagram.com/elitedentalclinic.sirsa"
        ],
        "employee": {
          "@type": "Person",
          "@id": "https://www.elitedentalclinic.info/#dr-nandini-bansal",
          "name": "Dr. Nandini Bansal",
          "jobTitle": "Chief Dental Surgeon",
          "honorificPrefix": "Dr.",
          "knowsAbout": ["Root Canal Treatment", "Dental Implants", "Laser Dentistry", "Cosmetic Smile Design", "Orthodontics"]
        }
      },
      {
        "@type": "WebSite",
        "@id": "https://www.elitedentalclinic.info/#website",
        "url": "https://www.elitedentalclinic.info",
        "name": "Elite Dental Clinic Sirsa"
      }
    ]
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Helmet>
        <title>Best Dental Clinic in Sirsa | Pain-Free Dentist | Elite Dental Clinic</title>
        <meta name="description" content="Elite Dental Clinic in Sirsa offers painless laser root canal treatment (RCT), dental implants, clear aligners, teeth whitening, and crowns by Dr. Nandini Bansal. Book your visit!" />
        <meta name="keywords" content="dentist in Sirsa, dental clinic in Sirsa, best dentist in Sirsa, root canal treatment Sirsa, dental implants Sirsa, clear aligners, teeth whitening, pain-free dentistry" />
        <link rel="canonical" href="https://www.elitedentalclinic.info/" />
        <meta name="geo.region" content="IN-HR" />
        <meta name="geo.placename" content="Sirsa" />
        <meta name="geo.position" content="29.5350;75.0290" />
        <meta name="ICBM" content="29.5350, 75.0290" />
        <meta property="og:title" content="Best Dental Clinic in Sirsa | Pain-Free Dentist | Elite Dental Clinic" />
        <meta property="og:description" content="Elite Dental Clinic offers painless laser root canals, dental implants, clear aligners, and restorative dental care in Sirsa, Haryana." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.elitedentalclinic.info/" />
        <meta property="og:image" content="https://www.elitedentalclinic.info/images/logo.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      
      <AppLayout />
    </BrowserRouter>
  );
}

export default App;
