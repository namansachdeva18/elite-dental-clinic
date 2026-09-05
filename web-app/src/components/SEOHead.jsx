import React from 'react';
import { Helmet } from 'react-helmet-async';

export const BASE_URL = 'https://www.elitedentalclinic.info';

export const CLINIC_NAP = {
  name: "Elite Dental Clinic",
  legalName: "Elite Dental Clinic Sirsa",
  doctorName: "Dr. Nandini Bansal",
  doctorQualification: "BDS",
  doctorRole: "Chief Dental Surgeon & Specialist in Laser RCT and Restorative Dentistry",
  phonePrimary: "+919467624898",
  phoneSecondary: "+919306299901",
  phoneDisplay: "+91 94676-24898",
  whatsapp: "919467624898",
  whatsappUrl: "https://wa.me/919467624898",
  email: "elitedentalclinic30@gmail.com",
  streetAddress: "Opp. City Diagnostic Centre, Near Dr. Lal Path Lab, Dabwali Road",
  addressLocality: "Sirsa",
  addressRegion: "Haryana",
  postalCode: "125055",
  addressCountry: "IN",
  latitude: 29.5350, // Sirsa coordinates
  longitude: 75.0290,
  openingHours: [
    { days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"], opens: "10:00", closes: "19:30" },
    { days: ["Sunday"], opens: "10:00", closes: "14:30" }
  ],
  priceRange: "₹₹",
  ratingValue: "4.9",
  reviewCount: "80"
};

/**
 * SEO & Head Management Component
 */
export default function SEOHead({
  title,
  description,
  canonicalUrl,
  ogType = 'website',
  ogImage = `${BASE_URL}/images/logo.webp`,
  schema,
  breadcrumbs = []
}) {
  const fullTitle = title.includes('Elite Dental Clinic') ? title : `${title} | Elite Dental Clinic Sirsa`;
  const fullCanonical = canonicalUrl ? (canonicalUrl.startsWith('http') ? canonicalUrl : `${BASE_URL}${canonicalUrl}`) : BASE_URL;

  // Base Clinic & Organization schema graph
  const defaultSchema = {
    "@context": "https://schema.org",
    "@graph": [
      {
        "@type": ["Dentist", "MedicalBusiness", "LocalBusiness"],
        "@id": `${BASE_URL}/#dentist`,
        "name": CLINIC_NAP.name,
        "legalName": CLINIC_NAP.legalName,
        "url": BASE_URL,
        "logo": `${BASE_URL}/images/logo.webp`,
        "image": `${BASE_URL}/images/hero-doctor.webp`,
        "telephone": CLINIC_NAP.phonePrimary,
        "email": CLINIC_NAP.email,
        "priceRange": CLINIC_NAP.priceRange,
        "address": {
          "@type": "PostalAddress",
          "streetAddress": CLINIC_NAP.streetAddress,
          "addressLocality": CLINIC_NAP.addressLocality,
          "addressRegion": CLINIC_NAP.addressRegion,
          "postalCode": CLINIC_NAP.postalCode,
          "addressCountry": CLINIC_NAP.addressCountry
        },
        "geo": {
          "@type": "GeoCoordinates",
          "latitude": CLINIC_NAP.latitude,
          "longitude": CLINIC_NAP.longitude
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
        "areaServed": [
          {
            "@type": "City",
            "name": "Sirsa"
          },
          {
            "@type": "AdministrativeArea",
            "name": "Haryana"
          }
        ],
        "employee": {
          "@type": "Person",
          "@id": `${BASE_URL}/#dr-nandini-bansal`,
          "name": CLINIC_NAP.doctorName,
          "jobTitle": CLINIC_NAP.doctorRole,
          "honorificPrefix": "Dr.",
          "alumniOf": "Dental Council of India",
          "knowsAbout": ["Root Canal Treatment", "Laser Dentistry", "Dental Implants", "Smile Makeover", "Clear Aligners"]
        }
      },
      {
        "@type": "WebSite",
        "@id": `${BASE_URL}/#website`,
        "url": BASE_URL,
        "name": "Elite Dental Clinic Sirsa",
        "publisher": {
          "@id": `${BASE_URL}/#dentist`
        }
      },
      ...(breadcrumbs && breadcrumbs.length > 0 ? [{
        "@type": "BreadcrumbList",
        "@id": `${fullCanonical}#breadcrumb`,
        "itemListElement": breadcrumbs.map((crumb, idx) => ({
          "@type": "ListItem",
          "position": idx + 1,
          "name": crumb.name,
          "item": crumb.url.startsWith('http') ? crumb.url : `${BASE_URL}${crumb.url}`
        }))
      }] : []),
      ...(schema ? (Array.isArray(schema) ? schema : [schema]) : [])
    ]
  };

  return (
    <Helmet>
      {/* Title & Meta Tags */}
      <title>{fullTitle}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={fullCanonical} />

      {/* Crawl Control */}
      <meta name="robots" content="index, follow, max-snippet:-1, max-image-preview:large, max-video-preview:-1" />

      {/* Geo Meta Tags for Sirsa, Haryana */}
      <meta name="geo.region" content="IN-HR" />
      <meta name="geo.placename" content="Sirsa" />
      <meta name="geo.position" content={`${CLINIC_NAP.latitude};${CLINIC_NAP.longitude}`} />
      <meta name="ICBM" content={`${CLINIC_NAP.latitude}, ${CLINIC_NAP.longitude}`} />

      {/* Open Graph / Facebook */}
      <meta property="og:type" content={ogType} />
      <meta property="og:site_name" content="Elite Dental Clinic Sirsa" />
      <meta property="og:title" content={fullTitle} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={fullCanonical} />
      <meta property="og:image" content={ogImage} />
      <meta property="og:locale" content="en_IN" />

      {/* Twitter Cards */}
      <meta name="twitter:card" content="summary_large_image" />
      <meta name="twitter:title" content={fullTitle} />
      <meta name="twitter:description" content={description} />
      <meta name="twitter:image" content={ogImage} />

      {/* JSON-LD Schema Graph */}
      <script type="application/ld+json">
        {JSON.stringify(defaultSchema)}
      </script>
    </Helmet>
  );
}
