import React from 'react';
import ServiceLandingPage from '../components/ServiceLandingPage';

export default function RootCanalPage() {
  return (
    <ServiceLandingPage
      title="Root Canal Treatment (RCT)"
      metaTitle="Root Canal Treatment in Sirsa | Painless Single-Sitting Laser RCT"
      metaDescription="Looking for root canal treatment in Sirsa? Elite Dental Clinic provides laser-assisted, virtually painless single-sitting RCT by Dr. Nandini Bansal. Save your natural tooth."
      canonicalUrl="/services/root-canal-treatment"
      breadcrumbs={[
        { name: "Home", url: "/" },
        { name: "Services", url: "/#services" },
        { name: "Root Canal Treatment", url: "/services/root-canal-treatment" }
      ]}
      heroBadge="Laser-Assisted Rotary Endodontics • Sirsa"
      h1="Painless Root Canal Treatment (RCT) in Sirsa"
      leadIntro="Save your natural infected tooth with advanced rotary endodontics and laser disinfection. Performed under strict PGI clinical protocols by Dr. Nandini Bansal at Elite Dental Clinic, Dabwali Road, Sirsa."
      quickFacts={[
        { label: "Procedure Duration", value: "30 to 45 minutes per sitting" },
        { label: "Sittings Required", value: "Single-sitting for most cases" },
        { label: "Anesthesia Used", value: "Targeted painless local anesthesia" },
        { label: "Technology", value: "Rotary endo motor & laser canal disinfection" },
        { label: "Consultation Fee", value: "₹200 (Inclusive of oral diagnosis)" },
        { label: "Tooth Longevity", value: "Decades to lifetime with proper crown" }
      ]}
      whoIsThisFor={[
        "Patients with throbbing or continuous tooth pain",
        "Teeth sensitive to hot and cold liquids",
        "Deep dental decay or cavities reaching the pulp",
        "Cracked or fractured teeth from trauma or biting",
        "Swelling or pimple-like bump on the gum line"
      ]}
      whatItSolves={[
        "Eliminates deep bacterial infection inside the tooth pulp",
        "Stops chronic toothaches without requiring tooth extraction",
        "Preserves natural jawbone structure and adjacent tooth alignment",
        "Prevents spread of infection to neighboring teeth and facial tissues"
      ]}
      symptomsList={[
        "Severe toothache when chewing",
        "Lingering sensitivity to hot tea/cold water",
        "Gum swelling or tender jaw area",
        "Darkened or discolored tooth",
        "Pain waking you up at night"
      ]}
      procedureSteps={[
        {
          title: "1. Digital X-Ray & Pulp Assessment",
          desc: "We perform a targeted digital radiograph to examine the exact root anatomy, depth of infection, and canal curvature."
        },
        {
          title: "2. Gentle Local Anesthesia",
          desc: "The tooth and surrounding gums are completely numbed with precision local anesthesia to ensure you feel zero pain during the procedure."
        },
        {
          title: "3. Rotary Canal Cleaning & Laser Disinfection",
          desc: "Using ultra-flexible nickel-titanium rotary files and laser irrigation, the infected nerve tissue is gently removed and canals are thoroughly sterilized."
        },
        {
          title: "4. Bio-Compatible Gutta-Percha Sealing",
          desc: "The cleaned root canals are hermetically sealed with biocompatible gutta-percha to prevent any future bacterial reinfection."
        },
        {
          title: "5. Core Buildup & Crown Placement",
          desc: "The tooth is restored with a composite foundation. A custom Zirconia or ceramic crown is recommended to protect the tooth from biting fractures."
        }
      ]}
      technologyUsed={[
        {
          title: "Endodontic Rotary Motor",
          benefit: "Eliminates the scraping sound of manual files, cuts procedure time in half, and cleans curved canals with microscopic accuracy."
        },
        {
          title: "Apex Locator Technology",
          benefit: "Digitally measures the precise root end to guarantee the infection is cleaned to the exact millimeter."
        },
        {
          title: "Dental Laser Disinfection",
          benefit: "Penetrates deep into lateral dental tubules to eradicate 99.8% of resistant bacteria, drastically reducing post-treatment soreness."
        },
        {
          title: "Hospital-Grade Autoclave",
          benefit: "Class-B vacuum sterilization for all instruments, following strict PGI and international infection control guidelines."
        }
      ]}
      timelineAndRecovery={{
        timeline: "Most uncomplicated root canals at Elite Dental Clinic are completed in a single 40-minute appointment. Severe or chronic infections may require a second brief medication dressing sitting.",
        aftercare: "Mild tenderness for 24-48 hours is normal and easily managed with prescribed mild analgesics. Avoid chewing hard foods on the treated side until the protective crown is cemented."
      }}
      treatmentAlternatives={[
        {
          name: "Tooth Extraction + Dental Implant",
          comparison: "If the tooth structure is completely shattered or unrestorable, extraction followed by an implant is the second-best alternative. However, preserving your natural tooth via RCT is always our clinical first priority."
        },
        {
          name: "Tooth Extraction + Dental Bridge",
          comparison: "Requires shaving down two adjacent healthy teeth to support a false tooth. RCT is significantly more conservative and preserves your surrounding natural dentition."
        }
      ]}
      faqs={[
        {
          q: "Is root canal treatment painful at Elite Dental Clinic?",
          a: "No. Modern root canal treatment is designed to relieve pain, not cause it. With advanced local anesthetics and rotary endodontics, the procedure feels similar to getting a standard filling."
        },
        {
          q: "How many visits does an RCT take in Sirsa?",
          a: "Over 85% of cases at our clinic are completed in a single sitting lasting approximately 35 to 45 minutes. If there is extensive abscess or periapical infection, Dr. Nandini may advise a second sitting for safe disinfection."
        },
        {
          q: "Is a dental crown mandatory after root canal?",
          a: "For back chewing teeth (molars and premolars), a crown is strongly recommended. After removing the infected nerve, the tooth becomes brittle; a high-strength Zirconia or ceramic crown prevents it from fracturing under chewing pressure."
        },
        {
          q: "What is the consultation charge for tooth pain in Sirsa?",
          a: "A comprehensive in-clinic consultation including physical diagnosis with Dr. Nandini Bansal is ₹200. Total treatment estimates depend on whether a single-sitting RCT and which crown option you select."
        }
      ]}
      relatedTreatments={[
        { title: "Dental Crowns & Bridges", url: "/services/dental-crowns-and-bridges" },
        { title: "Dental Implants", url: "/services/dental-implants" },
        { title: "Wisdom Tooth Treatment", url: "/services/wisdom-tooth-extraction" }
      ]}
    />
  );
}
