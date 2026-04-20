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
import { REVIEWS } from './components/Testimonials';

// A mock placeholder for the SEO pages
function ServiceSEOPage({ title }) {
  return (
    <div className="py-32 px-6 text-center min-h-[60vh] flex flex-col items-center justify-center">
      <Helmet>
        <title>{title} | Elite Dental Clinic Sirsa</title>
        <meta name="description" content={`Expert ${title} at Elite Dental Clinic. Book your pain-free appointment with the best dentist in Sirsa.`} />
      </Helmet>
      <h1 className="text-4xl font-display font-bold text-dark mb-4">{title}</h1>
      <p className="text-muted">Detailed SEO content (Cost, Recovery, FAQs) for {title} will be rendered here.</p>
      <a href="/" className="mt-8 text-[#9A7B4F] font-bold underline">Return to Home</a>
    </div>
  );
}

// Scroll restoration component
function ScrollToTop() {
  const { pathname } = useLocation();
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  return null;
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
    "@type": "Dentist",
    "name": "Elite Dental Clinic",
    "image": "https://www.elitedentalclinic.info/images/logo.webp",
    "@id": "https://www.elitedentalclinic.info/#dentist",
    "url": "https://www.elitedentalclinic.info",
    "telephone": "+919306299901",
    "priceRange": "$$",
    "address": {
      "@type": "PostalAddress",
      "streetAddress": "Street Number 2, Multani Colony",
      "addressLocality": "Sirsa",
      "postalCode": "125055",
      "addressCountry": "IN"
    },
    "openingHoursSpecification": {
      "@type": "OpeningHoursSpecification",
      "dayOfWeek": [
        "Monday",
        "Tuesday",
        "Wednesday",
        "Thursday",
        "Friday",
        "Saturday"
      ],
      "opens": "09:00",
      "closes": "20:00"
    },
    "sameAs": [
      "https://www.instagram.com/elitedentalclinic.sirsa"
    ],
    "aggregateRating": {
      "@type": "AggregateRating",
      "ratingValue": "5.0",
      "reviewCount": REVIEWS.length.toString(),
      "bestRating": "5",
      "worstRating": "1"
    },
    "review": REVIEWS.map((review) => ({
      "@type": "Review",
      "author": {
        "@type": "Person",
        "name": review.name
      },
      "reviewBody": review.text,
      "reviewRating": {
        "@type": "Rating",
        "ratingValue": "5",
        "bestRating": "5",
        "worstRating": "1"
      }
    }))
  };

  return (
    <BrowserRouter>
      <ScrollToTop />
      <Helmet>
        <title>Best Dental Clinic in Sirsa | Pain-Free Dentist | Elite Dental Clinic</title>
        <meta name="description" content="Looking for the best dentist in Sirsa? Elite Dental Clinic offers pain-free RCT, implants, braces, and teeth whitening. Book your appointment today!" />
        <meta name="keywords" content="dentist in Sirsa, best dental clinic in Sirsa, Root Canal Treatment, RCT, dental implants Sirsa, braces, teeth whitening, pain-free dentistry" />
        <link rel="canonical" href="https://www.elitedentalclinic.info/" />
        <meta property="og:title" content="Best Dental Clinic in Sirsa | Pain-Free Dentist | Elite Dental Clinic" />
        <meta property="og:description" content="Elite Dental Clinic offers top-notch, pain-free dental treatments in Sirsa. Contact us for RCT, implants, braces, and more." />
        <meta property="og:type" content="website" />
        <meta property="og:url" content="https://www.elitedentalclinic.info/" />
        <script type="application/ld+json">
          {JSON.stringify(schemaData)}
        </script>
      </Helmet>
      <CustomCursor />
      
      {/* Global Elements */}
      <TopBanner />
      <Navbar />
      <FloatingActions />
      
      <main className="w-full min-h-screen bg-[#FDFBF7] selection:bg-[#9A7B4F]/20 selection:text-[#9A7B4F]">
        <Routes>
          <Route path="/" element={<Home />} />
          
          {/* SEO Service Pages */}
          <Route path="/rct-treatment-sirsa" element={<ServiceSEOPage title="Root Canal Treatment in Sirsa" />} />
          <Route path="/teeth-whitening-sirsa" element={<ServiceSEOPage title="Teeth Whitening in Sirsa" />} />
          <Route path="/dental-implants-sirsa" element={<ServiceSEOPage title="Dental Implants in Sirsa" />} />
          <Route path="/videos/prabhnoor-testimonial" element={<VideoPage />} />
        </Routes>
        <Footer />
      </main>
    </BrowserRouter>
  );
}

export default App;
